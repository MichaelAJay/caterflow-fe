<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { ensureInView } from '../../utility/functions/useEnsureVisible';
import ErrorAlert from '@/components/ErrorAlert.vue';
import { signUpUser, updateUser } from '@/services/firestoreAuth';
import { passwordRules } from '@/views/visitor/utility/password-rules.const';
import router from '@/router';
import { apiLogin } from '@/services/apiService';
import PasswordCheckModal from './PasswordCheckModal.vue';

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
const isPasswordModalVisible = ref(false);

const isPasswordValid = computed(() => Object.values(checks).every(Boolean));

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

const handleClickSubmit = () => {
  console.log('handleClickSubmit');
  if (!isPasswordValid.value) {
    isPasswordModalVisible.value = true;
  }
};

const handleHover = () => {
  console.log('on hover');
  if (!isPasswordValid.value) {
    isPasswordModalVisible.value = true;
  }
};

const closePasswordModal = () => {
  isPasswordModalVisible.value = false;
};

const focusHandler = () => ensureInView('last-check');
</script>

<template>
  <div id="signup-content" class="flex-1 flex flex-col items-center">
    <div class="flex-1 p-5 sm:p-6 max-w-md w-full bg-white rounded-xl shadow-md flex flex-col">
      <form @submit.prevent="handleSignUp" class="space-y-3 sm:space-y-4 md:space-y-6">
        <div>
          <label for="owner" class="form-label">Name:</label>
          <input
            id="owner"
            v-model="form.name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label for="email" class="form-label">Email:</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label for="password" class="form-label">Password:</label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="passwordVisible ? 'text' : 'password'"
              required
              class="w-full px-3 py-2 border rounded-md"
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
            class="w-full px-3 py-2 border rounded-md"
            @focus="focusHandler"
          />
        </div>
        <div @click="handleClickSubmit" @mouseover="handleHover">
          <button
            type="submit"
            :disabled="!isPasswordValid"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-caramel-600 hover:bg-caramel-700 disabled:opacity-25 disabled:cursor-not-allowed"
            :class="{ 'pointer-events-none': !isPasswordValid }"
            @mouseover="handleHover"
            @mouseleave="closePasswordModal"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    <PasswordCheckModal
      :isVisible="isPasswordModalVisible"
      @close="closePasswordModal"
      :checks="checks"
    />
    <ErrorAlert :message="errorMessage" v-model:isVisible="showError" />
  </div>
</template>

<style scoped>
@media (min-height: 805px) {
  form {
    @apply space-y-4;
  }
  form label {
    @apply text-lg mb-1;
  }
  form button {
    @apply text-lg;
  }
  form a {
    @apply text-base;
  }
}
@media (min-height: 900px) {
  form {
    @apply space-y-6;
  }
}
</style>
