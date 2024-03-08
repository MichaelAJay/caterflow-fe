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
  <div class="flex-1 flex flex-col items-center">
    <div
      class="flex-1 bg-white bg-opacity-90 rounded-xl shadow-lg p-8 border border-gray-200 max-w-md w-full flex flex-col justify-center"
    >
      <h1 class="text-3xl font-bold mb-6 text-center text-caramel-600">Serving Soon</h1>
      <ul class="list-inside list-disc text-lg text-gray-700">
        <li v-for="(item, index) in items" :key="index" class="mb-3">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

h1 {
  font-family: 'Great Vibes', cursive;
}

ul {
  padding-left: 1rem;
}

li::marker {
  color: #c86b3c;
}
</style>
