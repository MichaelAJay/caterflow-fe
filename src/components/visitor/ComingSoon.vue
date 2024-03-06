<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  'EZCater/Nutshell integration',
  'Subscriptions',
  'Add Users',
  'Project management',
  'Order-based task management'
]);
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-4">Coming Soon</h1>
    <ul>
      <li v-for="(item, index) in items" :key="index" class="text-lg mb-2">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
