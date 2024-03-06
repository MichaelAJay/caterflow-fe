<template>
  <footer class="bg-gray-800 text-white pt-2 pb-3 px-3 sm:py-4 sm:px-6">
    <div class="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
      <p>&copy; 2024 Caterflow. All rights reserved.</p>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
footer div nav ul li a {
  @apply hover:underline focus:outline-none focus:ring-caramel-500 focus:ring-opacity-50 py-2 text-sm sm:text-base;
}
</style>
