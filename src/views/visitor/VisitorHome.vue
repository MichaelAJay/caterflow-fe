<script setup lang="ts">
import router from '@/router';
import VisitorMenu from './VisitorMenu.vue';
import CustomButton from '@/components/CustomButton.vue';

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
        <CustomButton @click="goToSignUp" type="primary">Get Started</CustomButton>

        <CustomButton @click="goToLogin" type="secondary">Log In</CustomButton>
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
  </div>
</template>
