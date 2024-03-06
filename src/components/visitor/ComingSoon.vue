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
  <div class="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 border border-gray-200 max-w-md w-full">
    <h1 class="text-3xl font-bold mb-6 text-center text-caramel-600">Coming Soon</h1>
    <ul class="list-inside list-disc text-lg text-gray-700">
      <li v-for="(item, index) in items" :key="index" class="mb-3">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* You can add a custom font that suggests a menu-like appearance */
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

h1 {
  font-family: 'Great Vibes', cursive;
}

/* Optionally, add some more thematic decorations */
ul {
  padding-left: 1rem;
}

li::marker {
  color: #c86b3c; /* A color that matches your brand or suggests food/cuisine */
}
</style>