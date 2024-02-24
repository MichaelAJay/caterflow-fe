<script lang="ts">
import { computed, ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { ensureInView } from '../../utility/functions/useEnsureVisible'
import ErrorAlert from '@/components/ErrorAlert.vue'
import { login } from '@/services/firestoreAuth'
import type { User } from 'firebase/auth'
import router from '@/router'
import { apiHealthCheck } from '@/services/apiService'

export default {
  components: { EyeIcon, EyeSlashIcon, ErrorAlert },
  setup() {
    const form = ref({
      email: '',
      password: ''
    })

    const isInputValid = computed(() => {
      return form.value.email.trim() !== '' && form.value.password.trim() !== ''
    })

    const passwordVisible = ref(false)
    const showError = ref(false)
    const errorMessage = ref('')

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value
    }

    const handleLogin = async () => {
      const { email, password } = { ...form.value }
      try {
        const user = await login(email, password)

        // Handle known error
        if (failedLogin(user)) {
          showError.value = true
          errorMessage.value = user.failed
          return
        }

        console.log(user)
        const apiHealthy = await apiHealthCheck()
        console.log('api is healthy', apiHealthy)

        const routeName = user.emailVerified ? 'Dashboard' : 'Verify Email'
        router.push({ name: routeName })
      } catch (err: any) {
        console.error('submitForm catch', err.message)
        showError.value = true
        errorMessage.value = err.message || 'An error occurred during account creation.'
      }

      function failedLogin(user: User | { failed: string }): user is { failed: string } {
        return (user as { failed: string }).failed !== undefined
      }
    }

    const focusHandler = () => ensureInView('last-check')

    return {
      form,
      handleLogin,
      isInputValid,
      focusHandler,
      passwordVisible,
      togglePasswordVisibility,
      errorMessage,
      showError
    }
  }
}
</script>

<template>
  <div id="signup-container" class="flex flex-col">
    <div class="flex flex-col items-center justify-center h-full bg-gray-100 rounded-xl">
      <div class="p-6 max-w-md w-full bg-white rounded-xl shadow-md">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="form-label">Email:</label>
            <input id="email" v-model="form.email" type="email" required class="form-input" />
          </div>
          <div>
            <label for="password" class="form-label">Password:</label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="passwordVisible ? 'text' : 'password'"
                required
                class="form-input"
                @focus="focusHandler"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 px-2 py-1"
                tabindex="-1"
              >
                <EyeIcon v-if="!passwordVisible" class="h-5 w-5 text-gray-500" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            :disabled="!isInputValid"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
  </div>
</template>
