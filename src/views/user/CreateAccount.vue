<script lang="ts">
import { computed, ref } from 'vue'
import ErrorAlert from '@/components/ErrorAlert.vue'
import { createAccount } from '@/services/apiService'
import AccountCreatedModal from './AccountCreatedModal.vue'

export default {
  components: { ErrorAlert, AccountCreatedModal },
  setup() {
    const showModal = ref(false)
    const closeModal = () => {
      showModal.value = false
    }

    const form = ref({
      name: ''
    })

    const showError = ref(false)
    const errorMessage = ref('')

    const checks = computed(() => ({
      nameNotEmpty: form.value.name.trim() !== ''
    }))

    const handleCreateAccount = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      try {
        const requestBody = { ...form.value }
        await createAccount(requestBody.name)
        console.log('account created')
        showModal.value = true
      } catch (err: any) {
        console.error('submitForm catch', err.message)
        showError.value = true
        errorMessage.value = err.message || 'An error occurred during account creation.'
      }
    }

    return {
      showModal,
      closeModal,
      form,
      handleCreateAccount,
      errorMessage,
      showError,
      checks
    }
  }
}
</script>

<template>
  <div id="signup-container" class="flex flex-col">
    <div class="flex flex-col items-center justify-center h-full bg-gray-100 rounded-xl">
      <div class="p-6 max-w-md w-full bg-white rounded-xl shadow-md">
        <h1 class="title text-2xl font-bold mb-2">Welcome to CaterBot!</h1>
        <p class="mb-4 text-gray-600">Try me out! Your first ten transfers are free!</p>
        <form @submit.prevent="handleCreateAccount" class="space-y-4">
          <div>
            <label for="name" class="form-label">Business Name:</label>
            <input id="name" v-model="form.name" type="text" required class="form-input" />
          </div>
          <button
            type="submit"
            :disabled="!Object.values(checks).every(Boolean)"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
    <AccountCreatedModal :show="showModal" :closeModal="closeModal" />
  </div>
</template>

<style scope>
@media (max-width: 388px) {
  .title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    letter-spacing: -0.02em;
  }
}
</style>
