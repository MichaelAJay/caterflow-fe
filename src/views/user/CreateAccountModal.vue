<script lang="ts">
import { defineComponent } from 'vue';
import LargeModal from '@/components/LargeModal.vue';
import router from '@/router';

export default defineComponent({
  components: { LargeModal },
  props: {
    show: Boolean,
    closeModal: Function
  },
  setup(props) {
    const handleButtonClick = () => {
      console.log('Create Account Button clicked');
      router.push({ name: 'Create Account' });
      if (props.closeModal) {
        props.closeModal();
      }
    };

    return { handleButtonClick };
  }
});
</script>

<template>
  <LargeModal :show="show">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <h3 class="text-lg text-center leading-6 font-medium text-gray-900" id="modal-title">
        Create Account
      </h3>
      <p class="mt-2 text-gray-500">
        It looks like you aren't linked to a business account. The next step is to create one. If
        you're supposed to belong to an existing account, talk to the account administrator. If you
        think you should already be linked to an account, contact us!
      </p>
      <div class="flex justify-center">
        <button
          @click="handleButtonClick"
          class="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </div>
    </div>
  </LargeModal>
</template>
