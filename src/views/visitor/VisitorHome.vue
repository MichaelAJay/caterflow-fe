<script setup lang="ts">
import VisitorMenu from './VisitorMenu.vue'
import { signup } from '@/services/auth0Service'

const goToSignUp = async () => {
  try {
    await signup('http://localhost:5173')
  } catch (err) {
    console.error('Error in VisitorHome.loginUser', err)
  }
}
</script>

<template>
  <div id="visitor-home-container">
    <nav class="flex justify-end items-center">
      <VisitorMenu :goToSignUp="goToSignUp" />
    </nav>

    <section class="text-center p-8">
      <h1 class="text-4xl font-bold">Simplify Your Catering Management</h1>
      <p class="text-xl mt-4">Integrate EZCater with Nutshell seamlessly</p>
      <button @click="goToSignUp" class="mt-8 bg-blue-500 text-white py-2 px-4 rounded-lg">
        Get Started
      </button>
    </section>

    <section class="p-4">
      <h2 class="text-2xl font-bold">Features</h2>
      <!-- Features list here -->
    </section>

    <section class="p-4">
      <h2 class="text-2xl font-bold">Testimonials</h2>
      <!-- Testimonials here -->
    </section>

    <footer class="p-4 bg-gray-200 mt-8">
      <!-- Footer content here -->
    </footer>
  </div>
</template>
