<script setup lang="ts">
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
import SignUpContent from './SignUpContent.vue';
import truckLogo from '../../assets/CF_logo_vector.svg';

defineExpose({ CheckCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon, ErrorAlert });

// Refs
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

const passwordVisible = ref(false);
const validPasswordError = ref('');
const matchPasswordError = ref('');
const showError = ref(false);
const errorMessage = ref('');

// Watches
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

// Functions
const handleHomeClick = () => {
  router.push({ name: 'home' });
};

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleSignUp = async () => {
  const { email, password, name } = { ...form.value };
  try {
    await signUpUser(email, password);
    await updateUser({ displayName: name });
    await apiLogin();
    router.push({ name: 'Onboard Wizard' });
  } catch (err: any) {
    showError.value = true;
    errorMessage.value = 'An error occurred during account creation.';
  }
};

const focusHandler = () => ensureInView('last-check');
</script>

<template>
  <div
    id="signup-container"
    class="flex flex-1 flex-col items-center justify-around p-4 max-w-5xl w-full lg:px-0"
  >
    <div class="absolute top-0 right-0 pt-3 pr-3">
      <button @click="handleHomeClick" class="text-caramel-500 hover:text-caramel-600">
        <HomeIcon class="h-8 w-8" />
      </button>
    </div>
    <div id="logo-container" class="w-full py-4 lg:py-20">
      <div class="w-full flex items-center justify-center">
        <img
          id="logo-img"
          :src="truckLogo"
          alt="Logo: A catering truck with a chef's hat on top of it"
        />
      </div>
    </div>
    <h2 class="text-2xl md:text-4xl font-light text-accents-500">Welcome to CaterFlow!</h2>
    <div
      id="signup-sections"
      class="flex w-full min-h-full flex-col items-center justify-center lg:flex-row lg:items-stretch lg:justify-around space-y-4 lg:space-y-0"
    >
      <SignUpContent />
    </div>
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
  </div>
</template>

<style scope>
#logo-container {
  @apply py-3;
}
#logo-img {
  @apply h-28;
}
</style>
