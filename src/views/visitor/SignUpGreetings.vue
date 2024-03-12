<script setup lang="ts">
import { ref } from 'vue';

const steps = ref(['Create user account', 'Verify email', 'Add company name']);
const benefits = ref(['Set up key integrations', 'Sync your menus between integrations', 'Start saving time with CaterFlow!'])
</script>

<template>
  <div class="flex-1 flex flex-col items-center">
    <div
      class="flex-1 bg-white bg-opacity-90 rounded-xl shadow-lg p-8 border border-gray-200 max-w-md w-full flex flex-col"
    >
      <h1>We're glad you're here!</h1>
      <div>
        <p>Get started in a few easy steps:</p>
        <ul class="list-inside list-disc text-lg text-gray-700">
          <li v-for="(item, index) in steps" :key="index" class="mb-3">
            {{ item }}
          </li>
        </ul>
      </div>
      <div>
        <p>Once you do that, you'll be able to start:</p>
        <ul class="list-inside list-disc text-lg text-gray-700">
          <li v-for="(item, index) in benefits" :key="index" class="mb-3">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
