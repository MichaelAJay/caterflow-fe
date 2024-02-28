<script lang="ts">
import WizardContainer from '@/components/WizardContainer.vue'
import { ref, defineComponent } from 'vue'
import VerifyEmailPrompt from './VerifyEmailPrompt.vue'
import InitializeOrganization from './InitializeOrganization.vue'
import AccountInitializedConfirmation from './AccountInitializedConfirmation.vue'

interface WizardContainerRef {
  nextStep: () => void
}

export default defineComponent({
  components: { WizardContainer },
  setup() {
    const steps = ref([
      {
        name: 'Verify Email',
        component: VerifyEmailPrompt,
        events: {
          complete: () => {
            console.log('initialization wizard step 1 complete')
            goToNextStep()
          }
        }
      },
      {
        name: 'Add Organization',
        component: InitializeOrganization,
        events: {
          complete: () => {
            console.log('initialization wizard step 2 complete')
            goToNextStep()
          }
        }
      },
      {
        name: 'Confirmation',
        component: AccountInitializedConfirmation,
        events: {
          complete: () => {
            console.log('initialization wizard complete')
            handleCompletion()
          }
        }
      }
    ])
    const wizardContainer = ref<WizardContainerRef | null>(null)

    const goToNextStep = () => {
      if (wizardContainer.value) {
        wizardContainer.value.nextStep()
      }
    }

    const handleCompletion = () => {
      console.log('Initialize Wizard complete')
    }

    return {
      steps,
      goToNextStep,
      handleCompletion,
      wizardContainer
    }
  }
})
</script>

<template>
  <div>
    <WizardContainer ref="wizardContainer" :steps="steps" :allowStepperNavigation="false" />
  </div>
</template>
