<script lang="ts">
import { ref, watch } from 'vue'
import { CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { ensureInView } from '../../utility/functions/useEnsureVisible'

export default {
  components: { CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon },
  setup() {
    const form = ref({
      name: '',
      owner: '',
      email: '',
      password: '',
      'password-confirm': ''
    })

    const checks = ref({
      minLength: false,
      hasNumber: false,
      hasUpper: false,
      hasLower: false,
      hasSpecial: false,
      matches: false
    })

    watch(() => form.value.password, (newPassword) => {
      checks.value.minLength = newPassword.length >= passwordRules.minLength
      checks.value.hasNumber = passwordRules.hasNumber.test(newPassword)
      checks.value.hasUpper = passwordRules.hasUpper.test(newPassword)
      checks.value.hasLower = passwordRules.hasLower.test(newPassword)
      checks.value.hasSpecial = passwordRules.hasSpecial.test(newPassword)
      checks.value.matches = newPassword === form.value['password-confirm']
    })

    watch(() => form.value['password-confirm'], (newConfirmPassword) => {
      checks.value.matches = newConfirmPassword === form.value.password
    })

    const passwordVisible = ref(false)
    const validPasswordError = ref('')
    const matchPasswordError = ref('')

    const passwordRules = {
      minLength: 8,
      hasNumber: /\d/,
      hasUpper: /[A-Z]/,
      hasLower: /[a-z]/,
      hasSpecial: /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
    }

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value
    }

    const submitForm = () => {
      const requestBody = { ...form.value }
      console.log(requestBody)
      // Here you can make your API request
    }

    const focusHandler = () => ensureInView('last-check')

    return { form, submitForm, validPasswordError, matchPasswordError, checks, focusHandler, passwordVisible, togglePasswordVisibility }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-2">
    <div class="p-6 max-w-md w-full bg-white rounded-xl shadow-md">
      <h1 class="title text-2xl font-bold mb-2">Welcome to CaterBot!</h1>
      <p class="mb-4 text-gray-600">Try me out! Your first ten transfers are free!</p>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="name" class="form-label">Business Name:</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="form-input"
          />
        </div>
        <div>
          <label for="owner" class="form-label">Your Name:</label>
          <input id="owner" v-model="form.owner" type="text" required class="form-input" />
        </div>
        <div>
          <label for="email" class="form-label">Email:</label>
          <input id="email" v-model="form.email" type="email" required class="form-input"/>
        </div>
        <div>
          <label for="password" class="form-label">Password:</label>
          <input id="password" v-model="form.password" type="password" required class="form-input" @focus="focusHandler" />
        </div>
        <div>
          <label for="password-confirm" class="form-label">Confirm Password:</label>
          <input id="password-confirm" v-model="form['password-confirm']" type="password" required class="form-input" @focus="focusHandler" />
        </div>
        <button type="submit" :disabled="!Object.values(checks).every(Boolean)" class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Sign Up</button>
      </form>
      <ul>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.minLength" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          At least 8 characters
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasNumber" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains a number
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasUpper" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains an uppercase letter
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasLower" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains a lowercase letter
        </li>
        <li class="text-gray-700">
          <CheckCircleIcon v-if="checks.hasSpecial" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Contains a special character 
        </li>
        <li id="last-check" class="text-gray-700">
          <CheckCircleIcon v-if="checks.matches" class="h-5 w-5 inline-block text-green-500" />
          <XCircleIcon v-else class="h-5 w-5 inline-block text-red-500" />
          Matches confirmation
        </li>
      </ul>
    </div>
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