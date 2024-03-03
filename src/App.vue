<script setup lang="ts">
import { useRoute } from 'vue-router';
import Footer from './components/AppFooter.vue';
import { computed } from 'vue';

const route = useRoute();
const showFooter = computed(() => !route.meta.hideFooter);
</script>

<template>
  <div id="app-container">
    <div id="content">
      <div id="router-view-container" class="p-4 sm:p-8 md:p-12 lg:p-16">
        <RouterView />
      </div>
    </div>
    <Footer v-if="showFooter" />
  </div>
</template>
