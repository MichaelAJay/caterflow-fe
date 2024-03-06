<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import FinishOnboardingPrompt from '../user/FinishOnboardingPromptModal.vue';
import { EyeIcon, EyeSlashIcon, HomeIcon } from '@heroicons/vue/24/outline';
import { useScreenStore } from '@/stores/screen';
import { getUser } from '@/services/firestoreAuth';
import router from '@/router';
import ComingSoon from '@/components/visitor/ComingSoon.vue';
import LoginContent from './LoginContent.vue';
import LogoContainer from '@/components/LogoContainer.vue';

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
  <div id="login-container" class="flex-1 flex flex-col justify-center items-center">
    <LogoContainer class="py-5" imgClass="h-28" />
    <h2 class="text-2xl text-accents-500 font-light mb-2">Welcome Back!</h2>
    <div
      id="login-sections"
      class="flex-1 min-h-full px-4 py-1 sm:py-0 flex"
      :class="{
        'flex-col items-center justify-center': !showSplitContent,
        'w-full flex-row items-stretch justify-around': showSplitContent
      }"
    >
      <div v-if="showSplitContent" class="w-1/2">
        <!-- <div v-if="showSplitContent"> -->
        <ComingSoon />
      </div>

      <LoginContent :class="{ 'w-1/2': showSplitContent }" />
      <!-- <LoginContent /> -->

      <FinishOnboardingPrompt :show="showFinishOnboardingPrompt" :closeModal="closeModal" />
      <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
    </div>
  </div>
</template>

<style scoped>
@media (min-height: 850px) {
  .login-container {
    padding-top: 3vh;
    padding-bottom: 3vh;
  }
}
</style>
@/stores/screen
