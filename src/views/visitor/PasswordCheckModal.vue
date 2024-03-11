<script setup>
import { defineEmits } from 'vue';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

// Define props
const props = defineProps({
  isVisible: Boolean,
  checks: Object
});

// Define emits
const emits = defineEmits(['close']);

// Methods
const closeModal = () => {
  emits('close');
};
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
  >
    <div class="bg-white p-4 rounded-lg max-w-md">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">Password Requirements</h2>
        <button @click="closeModal" class="pl-4">
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
      <ul class="pt-1">
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.minLength" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          At least 8 characters
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasNumber" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains a number
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasUpper" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains an uppercase letter
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasLower" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains a lowercase letter
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasSpecial" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains a special character
        </li>
        <li id="last-check" class="text-gray-700">
          <CheckCircleIcon v-if="checks.matches" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Matches confirmation
        </li>
      </ul>
    </div>
  </div>
</template>
