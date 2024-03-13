<script setup lang="ts">
import { ref, watch, onMounted, nextTick, defineProps, defineEmits } from 'vue';

export type ActionConfig = {
  buttonDisplayName: string;
  onClick: () => void;
};

const props = defineProps({
  titleName: String,
  titleValue: String,
  actions: Array as PropType<ActionConfig[]>,
  isOpen: Boolean,
});

const emit = defineEmits(['toggle']);
const titleBarRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const maxHeight = ref("");

// Dynamically adjust max-height for smoother transition
watch(() => props.isOpen, async (isOpen) => {
  await nextTick(); // Wait for DOM updates
  if (isOpen) {
    // Calculate content height if open
    if (contentRef.value && titleBarRef.value) {
      maxHeight.value = `${contentRef.value.scrollHeight + titleBarRef.value.clientHeight}px`;
    }
  } else {
    // Revert to title bar height if closed
    maxHeight.value = `${titleBarRef.value?.clientHeight}px`;
  }
});

onMounted(() => {
  if (titleBarRef.value) {
    // Set initial max-height to title bar height
    maxHeight.value = `${titleBarRef.value.clientHeight}px`;
  }
});

const toggleOpen = () => {
  emit('toggle');
};
</script>

<template>
  <div class="expansion-panel-container" :style="{ maxHeight: maxHeight, transition: 'max-height 0.3s ease' }">
    <!-- Title Bar -->
    <div ref="titleBarRef" @click="toggleOpen" class="flex items-center justify-between py-3 cursor-pointer" :class="{ 'bg-gray-100': isOpen, 'bg-white': !isOpen }" :aria-expanded="isOpen.toString()">
      <div class="flex items-center space-x-4">
        <span class="pl-6">{{ titleName }}</span>
        <span>{{ titleValue }}</span>
      </div>
      <span class="icon pr-6">
        <span v-if="isOpen">-</span>
        <span v-else>+</span>
      </span>
    </div>
    <!-- Content and actions -->
    <div ref="contentRef" class="p-4">
      <slot></slot>
      <div v-if="actions && actions.length" class="flex justify-end space-x-2 py-4 pr-2">
        <button v-for="action in actions" :key="action.buttonDisplayName" @click.stop="action.onClick" class="material-button">
          {{ action.buttonDisplayName }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.material-button {
  @apply py-2 px-4; /* Adjust this line if you're not using Tailwind CSS */
}
.expansion-panel-container {
  overflow: hidden;
}
</style>
