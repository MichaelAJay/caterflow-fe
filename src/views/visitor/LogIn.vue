<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { EyeIcon, EyeSlashIcon, HomeIcon } from '@heroicons/vue/24/outline';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { getUser, login } from '@/services/firestoreAuth';
import type { User } from 'firebase/auth';
import router from '@/router';
import { apiLogin } from '@/services/apiService';
import { useUserStore } from '@/stores/user';
import FinishOnboardingPrompt from '../user/FinishOnboardingPromptModal.vue';

defineExpose({ EyeIcon, EyeSlashIcon, ErrorAlert, FinishOnboardingPrompt });

const showFinishOnboardingPrompt = ref(false);

onMounted(async () => {
  const user = getUser(false);
  if (user) {
    router.push({ name: 'Dashboard' });
  }
});

const form = ref({
  email: '',
  password: '',
});

const isInputValid = computed(() => form.value.email.trim() !== '' && form.value.password.trim() !== '');

const passwordVisible = ref(false);
const showError = ref(false);
const errorMessage = ref('');

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
  const userStore = useUserStore();
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
  router.push({name: "Sign Up"})
}

const handleHomeClick = () => {
  router.push({name: "home"})
}

function failedLogin(user: User | { failed: string }): user is { failed: string } {
  return (user as { failed: string }).failed !== undefined;
}

const closeModal = () => {
  showFinishOnboardingPrompt.value = false;
};
</script>

<template>
    <div id="signup-container" class="flex flex-col justify-center items-center bg-gray-100 px-4">
    <div class="p-6 max-w-md w-full bg-white rounded-xl shadow-md">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="text-right">
          <button @click="handleHomeClick" class="text-caramel-500 hover:text-caramel-600">
            <HomeIcon class="h-6 w-6 text-gray-500" />
          </button>
        </div>
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
            type="submit"
            :disabled="!isInputValid"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-caramel-600 hover:bg-caramel-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Log In
          </button>
        </div>
        <div class="flex justify-center">
          <button
            @click="handleSignUp" 
            class="text-sage-500 hover:text-sage-600"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </form>
    </div>
    <FinishOnboardingPrompt :show="showFinishOnboardingPrompt" :closeModal="closeModal" />
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
  </div>
</template>
