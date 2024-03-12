<script setup lang="ts">
import { ref, type PropType } from 'vue';

export type ActionConfig = {
  buttonDisplayName: string;
  onClick: () => void;
}

const props = defineProps({
  titleName: String,
  titleValue: String,
  actions: Array as PropType<ActionConfig[]>
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
    <!-- Content and actions -->
    <div v-show="isOpen" class="p-4">
      <slot></slot> <!-- Default sltot for content -->
      <div v-if="actions && actions.length" class="flex justify-end space-x-2 py-4 pr-2">
        <button
        v-for="action in actions"
        :key="action.buttonDisplayName"
        @click="action.onClick"
        class="material-button"
        >
        {{ action.buttonDisplayName }}  
      </button>
      </div>
    </div>
  </div>
</template>

<style>
.material-button {
  @apply py-2 px-4
}
</style>
