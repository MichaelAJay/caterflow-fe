<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import FinishOnboardingPrompt from '../user/FinishOnboardingPromptModal.vue';
import { HomeIcon } from '@heroicons/vue/24/outline';
import { useScreenStore } from '@/stores/screen';
import { getUser } from '@/services/firestoreAuth';
import router from '@/router';
import ComingSoon from '@/components/visitor/ComingSoon.vue';
import LoginContent from './LoginContent.vue';
import truckLogo from '../../assets/CF_logo_vector.svg';

defineExpose({ ErrorAlert, FinishOnboardingPrompt });

// Initialize stores
const screenStore = useScreenStore();

// Refs & computed properties
const showFinishOnboardingPrompt = ref(false);
const showError = ref(false);
const errorMessage = ref('');

const showSplitContent = computed<boolean>(
  () => screenStore.orientation === 'landscape' && screenStore.isTabletOrLarger
);

// Functions
const handleHomeClick = () => {
  router.push({ name: 'home' });
};

const closeModal = () => {
  showFinishOnboardingPrompt.value = false;
};

// Lifecycle hooks
onMounted(async () => {
  const user = getUser(false);
  if (user) {
    router.push({ name: 'Dashboard' });
  }
});
</script>

<template>
  <div id="login-container" class="flex flex-1 flex-col items-center justify-around p-4 max-w-5xl w-full lg:px-0">
    <div class="absolute top-0 right-0 pt-3 pr-3">
      <button @click="handleHomeClick" class="text-caramel-500 hover:text-caramel-600">
        <HomeIcon class="h-8 w-8" />
      </button>
    </div>
    <div id="logo-container" class="w-full py-4 lg:py-20">
      <div class="w-full flex items-center justify-center">
        <img id="logo-img"
          :src="truckLogo"
          alt="Logo: A catering truck with a chef's hat on top of it"

        />
      </div>
    </div>
    <h2 class="text-2xl md:text-4xl font-light text-accents-500">Welcome Back!</h2>
    <div
      id="login-sections"
      class="flex w-full min-h-full flex-col items-center justify-center lg:flex-row lg:items-stretch lg:justify-around space-y-4 lg:space-y-0"
    >
      <div v-if="showSplitContent" class="flex-1 flex flex-col w-full lg:w-1/2">
        <ComingSoon />
      </div>

      <LoginContent class="w-full" :class="{ 'lg:w-1/2': showSplitContent }" />

      <FinishOnboardingPrompt :show="showFinishOnboardingPrompt" :closeModal="closeModal" />
      <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
    </div>
  </div>
</template>

<style scoped>
#logo-container {
  @apply py-3; /* Base vertical padding */
}
#logo-img {
  @apply h-28; /* Base logo size */
}

/* Adjustments for larger screens' vertical spacing */
@media (min-height: 800px) {
  #login-container {
    @apply py-7;
  }
  #logo-container {
    @apply py-7;
  }
  #login-sections {
    @apply py-7;
  }
}

@media (min-height: 900px) {
  #login-container {
    @apply py-8;
  }
  #logo-container {
    @apply py-8;
  }
  #login-sections {
    @apply py-8;
  }
  #logo-img {
    @apply h-36;
  }
}
@media (min-height: 1000px) {
  #logo-img {
    @apply h-44;
  }
}
</style>
@/stores/screen
