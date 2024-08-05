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
    try {
      // In pessimistic update, we wait for the server to respond
      await $fetch(`/api/users/${user.user_uuid}`, {
        method: 'patch',
        body: {
          favorite_color: newValue,
        },
      });

      user.favorite_color = newValue;
      addToast({ title: 'Color has been modified' });
    } catch (error) {
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
