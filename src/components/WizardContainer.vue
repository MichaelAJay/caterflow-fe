<script lang="ts">
import Stepper from '@/components/MyStepper.vue'

export default {
    components: { Stepper },
    props: {
        allowBackwards: {
            type: Boolean,
            default: true,
        },
        allowStepperNavigation: {
            type: Boolean,
            default: false,
        },
        steps: {
            type: Array<{name: string, component: any}>,
            required: true
        }
    },
    data() {
        return {
            currentStep: 0,
        }
    },
    computed: {
        currentStepComponent() {
            return this.steps[this.currentStep].component
        }
    },
    methods: {
        nextStep() {
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
            }
        },
        prevStep() {
            if (this.allowBackwards && this.currentStep > 0) {
                this.currentStep--;
            }
        },
        handleStepperNavigation(stepIndex: number) {
            if (this.allowStepperNavigation) {
                this.currentStep = stepIndex;
            }
        }
    }
}
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
            <component :is="currentStepComponent" @next="nextStep" @prev="prevStep" />
        </div>
    </div>
</template>