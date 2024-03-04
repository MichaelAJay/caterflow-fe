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
  <div class="bg-transparent md:bg-gray-800"> <!-- This container will wrap everything -->
    <div class="md:sticky md:top-0 md:z-50"> <!-- This makes the bar sticky at the top for medium screens and up -->
      <nav class="text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <!-- Hamburger Icon -->
          <div class="w-full flex justify-end md:hidden">            
            <button @click="toggleMenu" class="bg-gray-800">
              <Bars3Icon class="h-6 w-6" v-if="!isMenuOpen" />
              <XMarkIcon class="h-6 w-6" v-else />
            </button>
          </div>
          <!-- Desktop Menu Items -->
          <div id="desktop-container" class="hidden md:flex space-x-4 w-full justify-end items-center">
            <VisitorMenuItems :goToSignUp="goToSignUp" :goToLogin="goToLogin" />
          </div>
        </div>
        <!-- Mobile Menu Items, they should be in the same nav container but will show/hide based on the menu state -->
        <div :class="isMenuOpen ? 'block p-2 bg-sage-200 shadow-lg rounded-lg' : 'hidden'" class="md:hidden">
          <VisitorMenuItems :goToSignUp="goToSignUp" :goToLogin="goToLogin" />
        </div>
      </nav>
    </div>
  </div>
</template>

