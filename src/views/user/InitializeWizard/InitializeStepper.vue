<script setup lang="ts">
import { ref } from 'vue';
import VerifyEmailPrompt from './VerifyEmailPrompt.vue';
import InitializeOrganization from './InitializeOrganization.vue';
import AccountInitializedConfirmation from './AccountInitializedConfirmation.vue';
import CustomStepper, { type Step } from '@/components/CustomStepper.vue';

interface StepperRef {
  nextStep: () => void;
}

const steps = ref<Step[]>([
  {
    name: 'Verify Email',
    description: 'Verify your email',
    component: VerifyEmailPrompt,
    completed: false
  },
  {
    name: 'Add Organization',
    description: 'Add an organization',
    component: InitializeOrganization,
    completed: false
  },
  {
    name: 'Confirmation',
    description: 'You are done!',
    component: AccountInitializedConfirmation,
    completed: false
  }
]);

const stepper = ref<StepperRef | null>(null);

const goToNextStep = () => {
  if (stepper.value) {
    stepper.value.nextStep();
  }
};

const handleCompletion = () => {
  console.log('Initialize Stepper complete');
};
</script>

<template>
  <div id="initialize-stepper" class="px-4 w-full">
    <CustomStepper ref="stepper" :steps="steps" :showDefaultControls="false" />
  </div>
</template>
