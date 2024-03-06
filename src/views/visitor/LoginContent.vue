<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import FinishOnboardingPrompt from '../user/FinishOnboardingPromptModal.vue';
import { EyeIcon, EyeSlashIcon, HomeIcon } from '@heroicons/vue/24/outline';
import { getUser, login } from '@/services/firestoreAuth';
import router from '@/router';
import type { User } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
import { apiLogin } from '@/services/apiService';

defineExpose({ EyeIcon, EyeSlashIcon, ErrorAlert, FinishOnboardingPrompt });

// Initialize store
const userStore = useUserStore();

// Refs & computed properties
const showFinishOnboardingPrompt = ref(false);
const form = ref({ email: '', password: '' });
const passwordVisible = ref(false);
const showError = ref(false);
const errorMessage = ref('');

const isInputValid = computed(
  () => form.value.email.trim() !== '' && form.value.password.trim() !== ''
);

// Functions
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
  const { email, password } = { ...form.value };

  try {
    const user = await login(email, password);

    if (failedLogin(user)) {
      showError.value = true;
      errorMessage.value = user.failed;
      return;
    }

    if (!user.emailVerified) {
      showFinishOnboardingPrompt.value = true;
    } else {
      const { hasAccount: doesUserHaveAccount } = await apiLogin();
      userStore.setIsOrgMember(doesUserHaveAccount);
      console.log('routing to Dashboard from Login');
      router.push({ name: 'Dashboard' });
    }
  } catch (err: any) {
    showError.value = true;
    errorMessage.value = err.message || 'An error occurred during account creation.';
  }
};

const handleSignUp = () => {
  router.push({ name: 'Sign Up' });
};

const handleForgotPassword = () => {
  console.log('forgot password clicked');
};

const handleHomeClick = () => {
  router.push({ name: 'home' });
};

function failedLogin(user: User | { failed: string }): user is { failed: string } {
  return (user as { failed: string }).failed !== undefined;
}

// Lifecycle hooks
onMounted(async () => {
  const user = getUser(false);
  if (user) {
    router.push({ name: 'Dashboard' });
  }
});
</script>

<template>
  <div id="existing-login" class="flex flex-col items-center">
    <div class="absolute top-0 right-0 pt-3 pr-3">
      <button @click="handleHomeClick" class="text-caramel-500 hover:text-caramel-600">
        <HomeIcon class="h-8 w-8 text-accents-500" />
      </button>
    </div>


    <div class="p-5 sm:p-6 max-w-md w-full bg-white rounded-xl shadow-md">
      <form @submit.prevent="handleLogin" class="login-form space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input id="email" v-model="form.email" type="email" required />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
          <div class="relative mt-1">
            <input
              id="password"
              v-model="form.password"
              :type="passwordVisible ? 'text' : 'password'"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              tabindex="-1"
            >
              <EyeIcon v-if="!passwordVisible" class="h-5 w-5" />
              <EyeSlashIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
        <div>
          <button
            id="login-button"
            type="submit"
            :disabled="!isInputValid"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-caramel-600 hover:bg-caramel-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log In
          </button>
        </div>
        <div class="flex justify-center">
          <button @click="handleSignUp" class="text-sage-500 hover:text-sage-600 cursor-pointer">
            Don't have an account? Sign Up
          </button>
        </div>
        <div class="text-center my-2">
          <a
            @click="handleForgotPassword"
            class="text-sm text-sage-500 hover:text-sage-600 cursor-pointer"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@media (max-height: 668px) {
  div form {
    @apply space-y-3;
  }
}

@media (min-height: 700px) {
  #login-button {
    @apply text-base;
  }
  .login-form {
    @apply space-y-4;
  }
  .login-form input {
    @apply text-lg py-1;
  }
  .login-form label {
    @apply text-lg pt-1 pb-2;
  }
}
@media (min-height: 750px) {
  #login-button {
    @apply text-lg mt-8;
  }
  .login-form input {
    @apply text-xl py-2;
  }
  .login-form label {
    @apply text-xl;
  }
  .login-form button {
    @apply py-1 text-lg;
  }
  a {
    @apply text-base;
  }
}
@media (min-height: 850px) {
  .login-container {
    padding-top: 3vh;
    padding-bottom: 3vh;
  }
  #login-button {
    @apply py-3 text-xl;
  }
  h2 {
    @apply text-3xl pb-3;
  }
}
</style>
