<script lang="ts">
import { defineComponent } from 'vue';
import LargeModal from '@/components/LargeModal.vue';
import router from '@/router';

export default defineComponent({
    components: {LargeModal},
    props: {
        show: Boolean,
        closeModal: Function
    },
    setup(props) {
        const handleButtonClick = () => {
            console.log('Create Account Button clicked')
            router.push({ name: 'Create Account' });
            if (props.closeModal) {
                props.closeModal()
            }
        }

        return { handleButtonClick }
    }
})
</script>

<template>
    <LargeModal :show="show">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg text-center leading-6 font-medium text-gray-900" id="modal-title">Create Account</h3>
            <p class="mt-2 text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div class="flex justify-center">
          <button @click="handleButtonClick" class="text-center mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Create Account
          </button>
      </div>
        </div>
    </LargeModal>
</template>