<script lang="ts">
import { defineComponent } from 'vue';
import LargeModal from '@/components/LargeModal.vue';
import router from '@/router';

export default defineComponent({
  components: { LargeModal },
  props: {
    show: Boolean,
    closeModal: Function
  },
  setup(props) {
    const handleFinishOnboardingClick = () => {
      console.log('Finish Onboarding Button clicked');
      router.push({ name: 'Onboard Wizard' });
      if (props.closeModal) {
        props.closeModal();
      }
    };

    const handleDashboardClick = () => {
      console.log('Dashboard Button clicked');
      router.push({ name: 'Dashboard' });
      if (props.closeModal) {
        props.closeModal();
      }
    };

    return { handleFinishOnboardingClick, handleDashboardClick };
  }
});
</script>

<template>
  <LargeModal :show="show">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <h3 class="text-lg text-center leading-6 font-medium text-gray-900" id="modal-title">
        Welcome Back!
      </h3>
      <p class="mt-2 text-gray-500">
        It looks like you still need to verify your email and add your organization. Click on
        "Finish Onboarding" to do that now, or "Dashboard" if you just want to go to your dashboard.
        But you'll need to finish onboarding before using the application.
      </p>
      <div class="flex justify-center space-x-4">
        <button
          @click="handleFinishOnboardingClick"
          class="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Finish Onboarding
        </button>
        <button
          @click="handleDashboardClick"
          class="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Dashboard
        </button>
      </div>
    </div>
  </LargeModal>
</template>
