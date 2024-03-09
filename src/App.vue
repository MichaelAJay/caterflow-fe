<script setup lang="ts">
import { useRoute } from 'vue-router';
import Footer from './components/AppFooter.vue';
import { computed } from 'vue';
import { useScreenStore } from './stores/screen';

const screenStore = useScreenStore();
const handleResize = () => {
  screenStore.updateDimensions();
};
window.addEventListener('resize', handleResize);
// Initialize
handleResize();

const route = useRoute();
const showFooter = computed(() => !route.meta.hideFooter);
</script>

<template>
  <div id="app-container">
    <div id="content" class="bg-accents-100">
      <div id="router-view-container" class="flex-1 p-4 sm:p-8 md:p-0 flex flex-col items-center">
        <RouterView />
      </div>
    </div>
    <Footer v-if="showFooter" />
  </div>
</template>
./stores/screen
