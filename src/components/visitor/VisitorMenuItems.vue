<script setup>
defineProps({
  goToSignUp: Function,
  goToLogin: Function
});
</script>

<template>
  <div class="flex flex-col md:flex-row md:space-x-4">
    <a href="#features" class="menu-item">Features</a>
    <a href="#pricing" class="menu-item">Pricing</a>
    <div class="flex flex-col gap-2 md:flex-row md:gap-4">
      <a @click="goToSignUp" class="menu-item action">Get Started</a>
      <a @click="goToLogin" class="menu-item action">Login</a>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  @apply block p-2 hover:bg-gray-700 text-white text-lg md:hover:bg-transparent md:p-0 md:text-caramel-500 md:text-center;
}
.action {
  @apply bg-caramel-500 rounded text-white min-w-[120px] md:min-w-[140px] md:mt-1 md:mb-1;
}
</style>
