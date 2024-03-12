<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  titleName: String,
  titleValue: String
});

const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <!-- Title Bar -->
    <div
      @click="toggleOpen"
      class="flex items-center justify-between px-6 py-3 cursor-pointer"
      :class="{ 'bg-gray-100': isOpen, 'bg-white': !isOpen }"
      :aria-expanded="isOpen"
    >
      <div class="flex items-center space-x-4">
        <span>{{ titleName }}</span>
        <span>{{ titleValue }}</span>
      </div>
      <span class="icon">
        <span v-if="isOpen">-</span>
        <span v-else>+</span>
      </span>
    </div>
    <!-- Content -->
    <div v-show="isOpen" class="p-4">
      <slot></slot>
    </div>
  </div>
</template>
