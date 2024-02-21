<script lang="ts">
import Wizard from '@/components/WizardContainer.vue'
import CreateUser from './CreateUser.vue'
import CreateAccount from './CreateAccount.vue'

export default {
  components: {
    Wizard
  },
  data() {
    return {
      steps: [
        {
          name: 'Create User',
          component: CreateUser,
          events: {
            complete: () => {
              console.log('sign up wizard step 1 complete')
              this.goToNextStep()
            }
          }
        },
        {
            name: 'Create Account',
            component: CreateAccount,
            events: {
                complete: () => {
                    console.log('sign up wizard step 2 complete')
                    this.handleCompletion()
                }
            }
        }
      ]
    }
  },
  methods: {
    goToNextStep() {
      const wizardContainer = this.$refs['sign-up-wizard'] as typeof Wizard
      console.log('in sign up wizard goToNextStep', wizardContainer)
      wizardContainer.nextStep()
    },
    handleCompletion() {
      console.log('Sign Up Wizard complete')
    }
  }
}
</script>

<template>
  <div>
    <Wizard ref="sign-up-wizard" :steps="steps" :allowStepperNavigation="false" />
  </div>
</template>
