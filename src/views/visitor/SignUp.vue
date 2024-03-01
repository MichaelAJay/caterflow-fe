<script lang="ts">
import { ref, watch } from 'vue';
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  HomeIcon
} from '@heroicons/vue/24/outline';
import { ensureInView } from '../../utility/functions/useEnsureVisible';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { signUpUser, updateUser } from '@/services/firestoreAuth';
import { passwordRules } from '@/views/visitor/utility/password-rules.const';
import router from '@/router';
import { apiLogin } from '@/services/apiService';

export default {
  components: { CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon, HomeIcon, ErrorAlert },
  setup() {
    const form = ref({
      name: '',
      email: '',
      password: '',
      'password-confirm': ''
    });

    const checks = ref({
      minLength: false,
      hasNumber: false,
      hasUpper: false,
      hasLower: false,
      hasSpecial: false,
      matches: false
    });

    watch(
      () => form.value.password,
      (newPassword) => {
        checks.value.minLength = newPassword.length >= passwordRules.minLength;
        checks.value.hasNumber = passwordRules.hasNumber.test(newPassword);
        checks.value.hasUpper = passwordRules.hasUpper.test(newPassword);
        checks.value.hasLower = passwordRules.hasLower.test(newPassword);
        checks.value.hasSpecial = passwordRules.hasSpecial.test(newPassword);
        checks.value.matches = newPassword === form.value['password-confirm'];
      }
    );

    watch(
      () => form.value['password-confirm'],
      (newConfirmPassword) => {
        checks.value.matches = newConfirmPassword === form.value.password;
      }
    );

    const passwordVisible = ref(false);
    const validPasswordError = ref('');
    const matchPasswordError = ref('');
    const showError = ref(false);
    const errorMessage = ref('');

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const handleSignUp = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { email, password, name } = { ...form.value };
      try {
        await signUpUser(email, password);
        await updateUser({ displayName: name });
        // await createUser()
        await apiLogin();

        router.push({ name: 'Onboard Wizard' });
      } catch (err: any) {
        showError.value = true;
        errorMessage.value = 'An error occurred during account creation.';
      }
    };

    const handleHome = () => {
      console.log('home clicked');
      router.push({ name: 'home' });
    };

    const focusHandler = () => ensureInView('last-check');

    return {
      form,
      handleSignUp,
      handleHome,
      validPasswordError,
      matchPasswordError,
      checks,
      focusHandler,
      passwordVisible,
      togglePasswordVisibility,
      errorMessage,
      showError
    };
  }
};
</script>

<template>
  <div id="signup-container" class="flex flex-col">
    <div class="flex flex-col items-center justify-center h-full bg-gray-100 rounded-xl">
      <div class="p-6 max-w-md w-full bg-white rounded-xl shadow-md">
        <div class="flex items-center">
          <button @click="handleHome" class="mr-2">
            <HomeIcon class="h-6 w-6 text-gray-500" />
          </button>
          <h1 class="title text-2xl font-bold mb-2">Welcome to CaterBot!</h1>
        </div>
        <p class="mb-4 text-gray-600">Try me out! Your first ten transfers are free!</p>
        <form @submit.prevent="handleSignUp" class="space-y-4">
          <div>
            <label for="owner" class="form-label">Name:</label>
            <input id="owner" v-model="form.name" type="text" required class="form-input" />
          </div>
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
          <div>
            <label for="password-confirm" class="form-label">Confirm Password:</label>
            <input
              id="password-confirm"
              v-model="form['password-confirm']"
              :type="passwordVisible ? 'text' : 'password'"
              required
              class="form-input"
              @focus="focusHandler"
            />
          </div>
          <button
            type="submit"
            :disabled="!Object.values(checks).every(Boolean)"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>
        <ul class="pt-1">
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
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
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
