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
  <div
    id="login-container"
    class="flex-1 min-h-full px-4 py-1 sm:py-0 flex"
    :class="{
      'flex-col items-center justify-center': !showSplitContent,
      'flex-row items-stretch space-x-4': showSplitContent
    }"
  >
    <div v-if="showSplitContent" class="w-1/2">
      <ComingSoon />
    </div>

    <LoginContent :class="{ 'w-1/2': showSplitContent }" />

    <FinishOnboardingPrompt :show="showFinishOnboardingPrompt" :closeModal="closeModal" />
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
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
