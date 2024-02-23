<script lang="ts">
import { resendEmailVerification } from '@/services/firestoreAuth'


export default {
  name: 'VerifyEmail',
  setup() {
    const handleVerifyClick = () => {
      console.log('Verify button clicked')
      // Handle verify click event here

      /**
       * Should refetch user
       * Should check if refetched user.email_verified is true
       * If it is, should route user to User Dashboard
       * If it is not, should give some sort of error message - "Hmm - something seems off. Try clicking "Resend Verification", and if you're still having problems, please contact us!"
       */
    }

    const handleResendClick = async () => {
      console.log('Resend button clicked')
      // Handle resend click event here
      await resendEmailVerification();
    }

    return {
      handleVerifyClick,
      handleResendClick
    }
  }
}
</script>

<template>
  <div class="verify-email">
    <p class="opening-text">
      It seems your email is not verified yet. Please verify your email to continue. Check your
      inbox for the verification email.
    </p>
    <button class="verify-button" @click="handleVerifyClick">I Verified</button>
    <button class="resend-button" @click="handleResendClick">Resend verification</button>
  </div>
</template>

<style scoped>
.verify-email {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
}

.opening-text {
  margin-bottom: 1em;
}

.verify-button,
.resend-button {
  margin-top: 1em;
}
</style>
