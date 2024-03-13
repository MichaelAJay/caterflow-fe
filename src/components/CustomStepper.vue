<script setup lang="ts">
import { ref, type Component } from 'vue';
import ExpansionPanel from './ExpansionPanel.vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

export type Step = {
  name: string;
  description: string;
  component: Component;
  completed: boolean;
};

const props = defineProps({
  steps: Array as () => Step[],
  showDefaultControls: {
    type: Boolean,
    default: true
  }
});
const { steps } = props;

const activeStep = ref(0);

const handleToggle = (index: number) => {
  console.log('handleToggle', index)
  if (activeStep.value === index) {
    activeStep.value = -1;
  } else {
    activeStep.value = index;
  }
};

const nextStep = () => {
  if (steps && activeStep.value < steps.length - 1) {
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
        'mt-6': index === 0,
        'pb-10': steps && index !== steps.length - 1 && index !== activeStep,
        'pb-12': steps && index === activeStep && index !== steps.length - 1
      }"
    >
      <div class="inner-step flex items-center">
        <div class="stepper-icon flex items-center">
          <div v-if="step.completed" class="flex items-center justify-center h-6 w-6">
            <CheckCircleIcon class="h-5 w-5 text-green-500" />
          </div>
          <div v-else class="flex items-center justify-center h-6 w-6">
            {{ index + 1 }}
          </div>
        </div>
        <div class="step-content border border-caramel-500 flex-1">
          <ExpansionPanel
            :titleName="step.name"
            :titleValue="step.description"
            :isOpen="index === activeStep"
            @toggle="handleToggle(index)"
          >
            <component :is="step.component" @change-step="() => {}" />
          </ExpansionPanel>
          <div
            v-if="showDefaultControls && index === activeStep"
            class="button-section pt-2 flex justify-end items-center h-12"
          >
            button section
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
