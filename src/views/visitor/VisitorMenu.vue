<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

defineProps({
  goToSignUp: {
    type: Function as unknown as () => (payload: MouseEvent) => void,
    required: true
  }
})
</script>

<template>
  <div>
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-end items-center">
        <div>
          <!-- Hamburger Icon -->
          <button @click="toggleMenu">
            <Bars3Icon class="h-6 w-6" />
          </button>
        </div>
        <div class="hidden md:flex space-x-4">
          <!-- Desktop Menu Items -->
          <a href="#features" class="hover:underline">Features</a>
          <a href="#pricing" class="hover:underline">Pricing</a>
          <a @click="goToSignUp" class="bg-blue-500 px-4 py-2 rounded">Get Started</a>
        </div>
      </div>
      <div :class="{ hidden: !isMenuOpen }" class="md:hidden">
        <!-- Mobile Menu Items -->
        <a href="#features" class="block p-2 hover:bg-gray-700">Features</a>
        <a href="#pricing" class="block p-2 hover:bg-gray-700">Pricing</a>
        <a @click="goToSignUp" class="block p-2 text-center bg-blue-500 mt-2 rounded"
          >Get Started</a
        >
      </div>
    </nav>
  </div>
</template>
