<script lang="ts">
import { type PropType, defineComponent } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    closeModal: {
      type: Function as PropType<() => void>,
      required: false
    }
  }
});
</script>

<template>
  <div
    v-if="show"
    class="fixed z-10 inset-0 overflow-y-auto"
    area-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>
      <div
        class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mx-3 my-3"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
