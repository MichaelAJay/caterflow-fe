<script lang="ts">
export default {
  props: {
    message: String,
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isVisible(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.hideError()
        }, 5000)
      }
    }
  },
  mounted() {
    if (this.isVisible) {
      setTimeout(() => {
        this.hideError()
      }, 5000)
    }
  },
  methods: {
    hideError() {
      this.$emit('update:isVisible', false)
    }
  }
}
</script>

<template>
  <div v-if="isVisible" class="error-alert p-4 bg-red-500 text-white rounded-md mb-4">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
@keyframes ascend {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
}
.error-alert {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  z-index: 1000;
  animation: ascend 0.5s ease forwards 4.5s;
}
</style>
