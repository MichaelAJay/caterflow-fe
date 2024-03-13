<script setup lang="ts">
import {  ref, type PropType, onMounted, watch } from 'vue';

export type ActionConfig = {
  buttonDisplayName: string;
  onClick: () => void;
}

const props = defineProps({
  titleName: String,
  titleValue: String,
  actions: Array as PropType<ActionConfig[]>,
  isOpen: Boolean,
});

const emit = defineEmits(['toggle'])
const toggleOpen = () => {
  console.log('toggleOpen')
  emit('toggle')
};

watch(() => props.isOpen, (newIsOpen: boolean) => {
  if (titleBarRef.value) {
    maxHeight.value = newIsOpen ? "1000px" : `${titleBarRef.value.clientHeight}px`
  }
})

const titleBarRef = ref<HTMLElement | null>(null);
const maxHeight = ref("0px")
onMounted(() => {
  if (titleBarRef.value) {
    const titleBarHeight = titleBarRef.value.clientHeight;
    console.log('title bar height', titleBarHeight)
    maxHeight.value = `${titleBarHeight}px`
  }
})
</script>

<template>
  <div class="expansion-panel-container" :style="{ maxHeight: maxHeight }">
    <!-- Title Bar -->
    <div
    ref="titleBarRef"
      @click="toggleOpen"
      class="flex items-center justify-between py-3 cursor-pointer"
      :class="{ 'bg-gray-100': isOpen, 'bg-white': !isOpen }"
      :aria-expanded="isOpen"
    >
      <div class="flex items-center space-x-4">
        <span class="pl-6">{{ titleName }}</span>
        <span>{{ titleValue }}</span>
      </div>
      <span class="icon">
        <span v-if="isOpen">-</span>
        <span v-else>+</span>
      </span>
    </div>
    <!-- Content and actions -->
    <div v-show="isOpen" class="p-4">
      <slot></slot>
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
.expansion-panel-container {
  overflow: hidden;
  transition: max-height 0.3s ease;
}
</style>
