<script setup lang="ts">
import { useRoute } from 'vue-router';
import Footer from './components/AppFooter.vue';
import { computed } from 'vue';
import { useOrientationStore } from './stores/orientation';

const orientationStore = useOrientationStore();
window.addEventListener('resize', () => {
  orientationStore.updateOrientation();
});
// Initialize orientation
orientationStore.updateOrientation();

const route = useRoute();
const showFooter = computed(() => !route.meta.hideFooter);
</script>

<template>
  <div id="app-container">
    <div id="content" class="bg-accents-100">
      <div id="router-view-container" class="flex-1 p-4 sm:p-8 md:p-0 flex flex-col">
        <RouterView />
      </div>
    </div>
    <Footer v-if="showFooter" />
  </div>
</template>
