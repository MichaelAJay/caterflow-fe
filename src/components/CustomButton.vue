<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  }
});

const emit = defineEmits(['click']);

const clickHandler = () => {
  emit('click');
};

const buttonClasses = computed(() => {
  const baseClasses =
    'rounded-lg font-semibold text-white transition-colors duration-200 ease-in-out';
  const sizeClasses = 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base';
  let typeClasses = '';

  switch (props.type) {
    case 'primary':
      typeClasses = 'bg-caramel-500 hover:bg-caramel-600';
      // Additional considerations: focus:ring-caramel-300 focus:ring-2
      break;
    case 'secondary':
    default:
      typeClasses = 'bg-sage-500 hover:bg-sage-600';
    // Additional considerations: focus:ring-sage-300 focus:ring-2
  }

  return `${baseClasses} ${sizeClasses} ${typeClasses}`;
});
</script>


<template>
  <button :class="buttonClasses" @click="clickHandler">
    <slot></slot>
  </button>
</template>