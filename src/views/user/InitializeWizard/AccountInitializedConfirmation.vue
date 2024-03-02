<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const handleGoToIntegrations = () => {
      router.push({ name: 'Integration Home' });
    };

    const handleGoToDashboard = () => {
      router.push({ name: 'Dashboard' });
    };

    return {
      handleGoToIntegrations,
      handleGoToDashboard
    };
  }
});
</script>
<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-4">Thanks for setting up your business with us.</h1>
    <p class="mb-4">
      If you're ready, go ahead and set up your first integration. Or just look around on the
      dashboard.
    </p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
      @click="handleGoToIntegrations"
    >
      Integrations
    </button>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      @click="handleGoToDashboard"
    >
      Dashboard
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 640px; /* Tailwind's sm breakpoint */
}
</style>
