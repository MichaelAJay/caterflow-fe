<script setup>
import { defineEmits } from 'vue';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

// Define props
const props = defineProps({
  isVisible: Boolean,
  checks: Object
});

// Define emits
const emit = defineEmits(['close']);

// Methods
const closeModal = () => {
  console.log('closeModal clicked');
  emit('close');
};
</script>

<template>
  <div v-if="isVisible" class="flex justify-center items-center">
    <div class="bg-white p-4 rounded-lg min-w-[350px] max-w-md">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold">Password Requirements</h2>
        <button @click.stop="closeModal" class="pl-4">
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
      <p class="pt-1">Must contain:</p>
      <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.minLength" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          At least 8 characters
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasNumber" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          A number
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasUpper" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          An uppercase letter
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasLower" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          A lowercase letter
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasSpecial" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          A special character (!@#$%^&*)
        </li>
      </ul>
      <div id="last-check" class="text-gray-700 pt-2 text-xs">
        <CheckCircleIcon v-if="checks.matches" class="h-5 w-5 inline-block text-green-500" />
        <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
        And must match "Confirm Password" value
      </div>
    </div>
  </div>
</template>

<style scoped>
ul li {
  @apply text-xs;
}
</style>
