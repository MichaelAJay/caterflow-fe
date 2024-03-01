<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Stepper from '@/components/MyStepper.vue';

export default defineComponent({
  components: { Stepper },
  props: {
    allowBackwards: {
      type: Boolean,
      default: true
    },
    allowStepperNavigation: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array as () => Array<{
        name: string;
        component: any;
        events?: Record<string, Function>;
        props?: Record<string, any>;
      }>,
      required: true
    }
  },
  setup(props, { emit }) {
    const currentStep = ref(0);

    const nextStep = () => {
      if (currentStep.value < props.steps.length - 1) {
        console.log('wiz container next step if');
        currentStep.value++;
        emit('next-step');
      } else {
        console.log('wiz container next step else');
        emit('last-step');
      }
    };

    const prevStep = () => {
      if (props.allowBackwards && currentStep.value > 0) {
        currentStep.value--;
      }
    };

    const handleStepperNavigation = (stepIndex: number) => {
      if (props.allowStepperNavigation) {
        currentStep.value = stepIndex;
      }
    };

    return {
      currentStep,
      nextStep,
      prevStep,
      handleStepperNavigation,
      currentStepComponent: computed(() => props.steps[currentStep.value].component),
      isLastStep: computed(() => currentStep.value === props.steps.length - 1)
    };
  }
});
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <Stepper
      :steps="steps"
      :currentStep="currentStep"
      :isNavigable="allowStepperNavigation"
      @navigate="handleStepperNavigation"
    />
    <div class="flex-1">
      <component
        :is="currentStepComponent"
        v-bind="steps[currentStep].props"
        v-on="steps[currentStep].events"
        @next="nextStep"
        @prev="prevStep"
      />
    </div>
  </div>
</template>
