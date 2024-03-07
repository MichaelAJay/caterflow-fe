<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import FinishOnboardingPrompt from '../user/FinishOnboardingPromptModal.vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { useScreenStore } from '@/stores/screen';
import { getUser } from '@/services/firestoreAuth';
import router from '@/router';
import ComingSoon from '@/components/visitor/ComingSoon.vue';
import LoginContent from './LoginContent.vue';
import truckLogo from '../../assets/CF_logo_vector.svg';

defineExpose({ EyeIcon, EyeSlashIcon, ErrorAlert, FinishOnboardingPrompt });

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
  <div id="login-container" class="flex flex-1 flex-col items-center justify-center p-4">
    <div id="logo-container" class="flex items-center justify-center py-8 lg:py-20">
      <img
        :src="truckLogo"
        alt="Logo: A catering truck with a chef's hat on top of it"
        class="h-28 lg:h-36"
      />
    </div>
    <h2 class="mb-2 text-2xl font-light text-accents-500">Welcome Back!</h2>
    <div
      id="login-sections"
      class="flex flex-1 w-full min-h-full flex-col items-center justify-center lg:flex-row lg:items-stretch lg:justify-around space-y-4 lg:space-y-0 lg:space-x-4"
      :class="{'space-x-8 lg:space-x-12': showSplitContent}"
    >
      <div v-if="showSplitContent" class="w-full lg:w-1/2">
        <ComingSoon />
      </div>

      <LoginContent :class="{'w-full lg:w-1/2': showSplitContent}" />

      <FinishOnboardingPrompt :show="showFinishOnboardingPrompt" :closeModal="closeModal" />
      <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
    </div>
  </div>
</template>

<!-- <style scoped>
#logo-container {
  @apply py-3
}
#logo-container img {
  @apply h-28
}
@media (min-height: 610px) {
  #logo-container {
    @apply pt-4 pb-3;
  }
}
@media (min-height: 650px) {
  #login-sections {
    @apply py-3
  }
}
@media (min-height: 685px) {
  #logo-container {
    @apply pt-6 pb-5;
  }
  #login-sections {
    @apply py-4
  }
}
@media (min-height: 725px) {
  #login-sections {
    @apply py-5
  }
}
@media (min-height: 800px) {
  #logo-container {
    @apply pt-20;
  }
  #login-sections {
    @apply py-8
  }
}
@media (min-height: 850px) {
  .login-container {
    padding-top: 3vh;
    padding-bottom: 3vh;
  }
  #login-sections {
    @apply py-12
  }
}
@media (min-height: 900px) {
  #logo-container img {
    @apply h-36
  }
}
</style> -->
@/stores/screen
