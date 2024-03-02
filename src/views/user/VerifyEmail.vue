<script lang="ts">
import router from '@/router';
import { isUserEmailVerified, resendEmailVerification } from '@/services/firestoreAuth';

export default {
  name: 'VerifyEmail',
  setup() {
    const handleVerifyClick = async () => {
      const isVerified = await isUserEmailVerified();
      console.log('isVerified', isVerified);
      if (isVerified) {
        router.push({ name: 'Dashboard' });
      } else {
        // alert
        console.log('WRONG');
        return;
      }
    };

    const handleResendClick = async () => {
      await resendEmailVerification();
      // Modal - "Check your email and then click 'I verified'"
    };

    return {
      handleVerifyClick,
      handleResendClick
    };
  }
};
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
