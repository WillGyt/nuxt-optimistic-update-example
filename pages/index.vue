<script setup lang="ts">
definePageMeta({
  colorMode: 'light',
});

const { data } = useFetch('/api/users', { dedupe: 'defer', key: 'users' });

const columns = [
  {
    label: 'First name',
    key: 'first_name',
  },
  {
    label: 'Last name',
    key: 'last_name',
  },
  { label: 'Favorite Color', key: 'favorite_color' },
];
</script>

<template>
  <div class="p-10 flex justify-around">
    <UCard class="bg-red-50">
      Pessimistic
      <UTable
        :columns="columns"
        :rows="data ?? []"
      >
        <template #favorite_color-data="{ row }">
          <PessimisticColorDisplayEdit :user="row" />
        </template>
      </UTable>
    </UCard>
    <UCard class="bg-green-50">
      Optimistic
      <UTable
        :columns="columns"
        :rows="data ?? []"
      >
        <template #favorite_color-data="{ row }">
          <OptimisticColorDisplayEdit :user="row" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
