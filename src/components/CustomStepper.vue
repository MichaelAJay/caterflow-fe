<script setup lang="ts">
import { ref } from 'vue';
import ExpansionPanel from './ExpansionPanel.vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

const steps = ref([{ fieldName: 'Step 1', fieldValue: 'Description', completed: false }]);

const activeStep = ref(0);

const handleToggle = (index: number) => {
  if (activeStep.value !== index) {
    activeStep.value = index;
  }
};

const nextStep = () => {
  if (activeStep.value < steps.value.length - 1) {
    activeStep.value++;
  }
  // Handle moving out of the stepper independently
};
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step"
      :class="{
        'pt-2': index !== 0,
        'pb-2': true, // Not so sure about any of these.
        'mt-6': index === 0,
        'mt-10': index !== steps.length - 1 && index !== activeStep,
        'mt-12': index === activeStep
      }"
    >
      <div class="flex items-center">
        <div v-if="step.completed" class="flex items-center justify-center h-6 w-6">
          <CheckCircleIcon class="h-5 w-5 text-green-500" />
        </div>
        <div v-else class="flex items-center justify-center h-6 w-6">
          {{ index + 1 }}
        </div>
      </div>
      <ExpansionPanel
        :titleName="step.fieldName"
        :titleValue="step.fieldValue"
        :isOpen="index === activeStep"
        @toggle="handleToggle(index)"
      >
        Step specific content goes here
      </ExpansionPanel>
      <div
        v-if="index === activeStep"
        class="button-section mt-2 flex justify-end items-center h-12"
      >
        button section
      </div>
    </div>
  </div>
</template>
