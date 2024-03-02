<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { ensureInView } from '../../utility/functions/useEnsureVisible';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { getUser, login } from '@/services/firestoreAuth';
import type { User } from 'firebase/auth';
import router from '@/router';
import { apiLogin } from '@/services/apiService';
import { useUserStore } from '@/stores/user';
import  FinishOnboardingPrompt from '../user/FinishOnboardingPromptModal.vue';

export default {
  components: { EyeIcon, EyeSlashIcon, ErrorAlert, FinishOnboardingPrompt },
  setup() {
    const showFinishOnboardingPrompt = ref(false);

    onMounted(async () => {
      const user = getUser(false);
      if (user) {
        router.push({ name: 'Dashboard' });
      }
    });

    const form = ref({
      email: '',
      password: ''
    });

    const isInputValid = computed(() => {
      return form.value.email.trim() !== '' && form.value.password.trim() !== '';
    });

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

        // Handle known error
        if (failedLogin(user)) {
          showError.value = true;
          errorMessage.value = user.failed;
          return;
        }

        // This actually needs to change a bit. The flow now will inject a modal at this point if user.email_verified is false
        console.log('here be user', user);
        if (!user.emailVerified) {
          // Open "FinishOnboardingPrompt" modal
          console.log('Pop up large "Finish Onboarding Prompt" modal');
          showFinishOnboardingPrompt.value = true;
        } else {
          // @TODO uncomment this apiLogin call
          // const { hasAccount: doesUserHaveAccount } = await apiLogin();

          // In this section, make the apiLogin() request, set the state, then go to dashboard. We'll keep the modal feel for the "Create Account"
          const { hasAccount: doesUserHaveAccount } = await apiLogin();
          userStore.setIsOrgMember(doesUserHaveAccount);
          console.log('routing to Dashboard from Login')
          router.push({ name: 'Dashboard' });
        }

        // const { hasAccount: doesUserHaveAccount } = await apiLogin();
        // userStore.setIsOrgMember(doesUserHaveAccount);

        // This isn't right anymore
        // const routeName = user.emailVerified ? 'Dashboard' : 'Onboard Wizard';
        // router.push({ name: routeName });
      } catch (err: any) {
        console.error('submitForm catch', err.message);
        showError.value = true;
        errorMessage.value = err.message || 'An error occurred during account creation.';
      }

      function failedLogin(user: User | { failed: string }): user is { failed: string } {
        return (user as { failed: string }).failed !== undefined;
      }
    };

    const focusHandler = () => ensureInView('last-check');
    const closeModal = () => {
      showFinishOnboardingPrompt.value = false;
    }

    return {
      form,
      handleLogin,
      isInputValid,
      focusHandler,
      passwordVisible,
      togglePasswordVisibility,
      errorMessage,
      showFinishOnboardingPrompt,
      closeModal,
      showError
    };
  }
};
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
    <FinishOnboardingPrompt :show="showFinishOnboardingPrompt" :closeModal="closeModal" />
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
  </div>
</template>
