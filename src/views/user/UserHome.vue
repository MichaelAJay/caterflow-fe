<script lang="ts">
import { onMounted, ref } from 'vue';
import CreateAccountModal from './CreateAccountModal.vue';
import { useUserStore } from '@/stores/user';
import { apiLogin } from '@/services/apiService';
import { getUser } from '@/services/firestoreAuth';

export default {
  setup() {
    const showModal = ref(false);
    const isLoading = ref(true);
    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(async () => {
      const user = getUser(true)
      const userStore = useUserStore();
      try {
        let doesUserHaveAccount = userStore.isOrgMember;

        console.log('Mounted UserHome, isOrgMember', doesUserHaveAccount);
        if (user && user.emailVerified && !doesUserHaveAccount) {
          console.log('does not have org');
          // Recheck (to handle refresh on Dashboard)
          doesUserHaveAccount = (await apiLogin()).hasAccount;
          if (doesUserHaveAccount) {
            userStore.setIsOrgMember(true);
          } else {
            console.log('Pop up large "Create Account" modal');
            showModal.value = true;
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    });
    return { showModal, closeModal, isLoading };
  },
  components: { CreateAccountModal }
};
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>User Landing Page</div>
  <CreateAccountModal :show="showModal" :closeModal="closeModal" />
</template>
