<script lang="ts">
import { verifyEmail } from '@/services/apiService';
import { isUserEmailVerified, resendEmailVerification } from '@/services/firestoreAuth';
import { defineComponent } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const handleVerificationConfirmed = async () => {
      console.log('User clicked the verification button.');

      if (await isUserEmailVerified()) {
        await verifyEmail();
        emit('complete');
      } else {
        console.error(
          'User claims they have verified their account, but that is not what the provider says'
        );
        // Create alert modal
      }
    };

    const handleResendEmailClick = async () => {
      // Handle case where the user clicks Resend but they're verified.

      console.log('User clicked the resend email button.');
      // await resendEmailVerification();
    };

    return {
      handleVerificationConfirmed,
      handleResendEmailClick
    };
  }
});
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-4">Hello!</h1>
    <p class="mb-4">
      You should have received an "email verification" email. Please click the link in the email to
      verify your account.
    </p>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="handleVerificationConfirmed"
    >
      I Verified
    </button>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="handleResendEmailClick"
    >
      Resend Email
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 640px; /* Tailwind's sm breakpoint */
}
</style>
