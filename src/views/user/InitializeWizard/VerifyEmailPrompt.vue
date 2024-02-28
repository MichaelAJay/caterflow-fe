<script lang="ts">
import { isUserEmailVerified } from '@/services/firestoreAuth'
import { defineComponent } from 'vue'

export default defineComponent({
  setup(_, { emit }) {
    const handleVerificationConfirmed = async () => {
      console.log('User clicked the verification button.')

      if (await isUserEmailVerified()) {
        emit('complete')
      } else {
        console.error('WEE-OOO WEE-OOO')
        // Create alert modal
      }
    }

    return {
      handleVerificationConfirmed
    }
  }
})
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
  </div>
</template>

<style scoped>
.container {
  max-width: 640px; /* Tailwind's sm breakpoint */
}
</style>
