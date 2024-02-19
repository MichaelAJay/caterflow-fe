<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4">
    <header class="text-center py-8">
      <h1 class="text-4xl font-bold text-gray-800">Welcome to CaterFlow</h1>
      <p class="text-xl text-gray-600">Seamlessly integrate EZCater with Nutshell</p>
    </header>
    <div class="flex flex-col items-center space-y-4">
      <router-link to="/sign-up" class="btn-primary">Create Account</router-link>
      <router-link to="/login" class="btn-secondary">Log In</router-link>
    </div>
    <!-- Additional sections like features or testimonials could go here -->
  </div>
</template>

<style>
.btn-primary {
  @apply bg-blue-500 text-white py-2 px-4 rounded-lg;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-800 py-2 px-4 rounded-lg;
}
</style>
