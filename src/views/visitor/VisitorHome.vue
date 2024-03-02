<script setup lang="ts">
import router from '@/router';
import VisitorMenu from './VisitorMenu.vue';

const goToSignUp = async () => {
  try {
    router.push({ name: 'Sign Up' });
  } catch (err) {
    console.error('Error in VisitorHome.signupuser', err);
  }
};

const goToLogin = async () => {
  try {
    router.push({ name: 'Login' });
  } catch (err) {
    console.error('Error in VisitorHome.loginUser', err);
  }
};
</script>

<template>
  <div id="visitor-home-container">
    <nav class="flex justify-end items-center">
      <VisitorMenu :goToSignUp="goToSignUp" :goToLogin="goToLogin" />
    </nav>

    <section class="text-center p-8">
      <h1 class="text-4xl font-bold">Simplify Your Catering Management</h1>
      <p class="text-xl mt-4">Integrate EZCater with Nutshell seamlessly</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <button @click="goToSignUp" class="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Get Started
        </button>
        <button @click="goToLogin" class="bg-green-500 text-white py-2 px-4 rounded-lg">
          Log In
        </button>
      </div>
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
