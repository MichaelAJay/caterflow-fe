<script lang="ts">
import { isUserAssociatedWithAccount } from '@/services/apiService'
import { onMounted, ref } from 'vue'
import CreateAccountModal from './CreateAccountModal.vue';

export default {
    setup() {
        const showModal = ref(false);
        const closeModal = () => {
          showModal.value = false;
        }

        onMounted(async () => {
            console.log('Mounted UserHome');
            // This should really be stored
            const doesUserHaveAccount = await isUserAssociatedWithAccount();
            if (!doesUserHaveAccount) {
                console.log('Pop up large "Create Account" modal');
                showModal.value = true;
            }
        });
        return { showModal, closeModal };
    },
    components: { CreateAccountModal }
}
</script>

<template>
  <div>User Landing Page</div>
  <CreateAccountModal :show="showModal" :closeModal="closeModal" />
</template>
