<script setup lang="ts">
import type { Tables } from '~/database.types';
import { colors } from '~/utils/colors';

const { user } = defineProps<{ user: Tables<'users'> }>();

const { add: addToast } = useToast();

const selected = computed({
  get() {
    return user.favorite_color;
  },
  async set(newValue) {
    // We capture the current value before changing it
    // If we need to revert it back
    const oldValue = user.favorite_color;
    try {
      // In optimistic update we change the UI first
      user.favorite_color = newValue;

      // We then call the server
      await $fetch(`/api/users/${user.user_uuid}`, {
        method: 'patch',
        body: {
          favorite_color: newValue,
        },
      });

      // If successful we don't notify the user of success
    } catch (error) {
      // If there is an error in the server, we revert back
      user.favorite_color = oldValue;

      // We notify the user
      addToast({
        title: 'An error occured, the color has not been modified',
        color: 'red',
      });
    }
  },
});
</script>

<template>
  <USelectMenu
    :options="colors"
    :uiMenu="{ width: 'w-auto min-w-[150px]' }"
    searchable
    v-model="selected"
  >
    <UBadge
      variant="soft"
      color="gray"
    >
      {{ user.favorite_color }}
    </UBadge>
  </USelectMenu>
</template>
