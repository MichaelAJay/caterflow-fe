<script setup lang="ts">
import { ref } from 'vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import VisitorMenuItems from '@/components/visitor/VisitorMenuItems.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

defineProps({
  goToSignUp: {
    type: Function as unknown as () => (payload: MouseEvent) => void,
    required: true
  },
  goToLogin: {
    type: Function as unknown as () => (payload: MouseEvent) => void,
    required: true
  }
});
</script>

<template>
  <div>
    <nav class="relative text-white p-4 bg-gray-800 rounded-xl">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Hamburger Icon -->
        <button @click="toggleMenu" class="md:hidden">
          <Bars3Icon class="h-6 w-6" v-if="!isMenuOpen" />
          <XMarkIcon class="h-6 w-6" v-else />
        </button>
        <div class="hidden md:flex space-x-4">
          <!-- Desktop Menu Items -->
          <VisitorMenuItems :goToSignUp="goToSignUp" :goToLogin="goToLogin" />
        </div>
      </div>
      <div
        :class="
          isMenuOpen ? 'absolute right-0 mt-6 p-1 w-48 bg-sage-200 shadow-lg rounded-lg' : 'hidden'
        "
        class="md:hidden z-10"
      >
        <!-- Mobile Menu Items -->
        <VisitorMenuItems :goToSignUp="goToSignUp" :goToLogin="goToLogin" />
      </div>
    </nav>
  </div>
</template>
