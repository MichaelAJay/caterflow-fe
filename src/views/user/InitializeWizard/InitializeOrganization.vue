<script lang="ts">
import { createAccount } from '@/services/apiService'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup(_, { emit }) {
    const businessName = ref('')

    const handleCreateOrganization = async () => {
      console.log('User clicked the Create Organization button.')
      try {
        await createAccount(businessName.value)
        emit('complete')
      } catch (err) {
        console.error('Error creating account', err)
      }
    }

    return {
      handleCreateOrganization
    }
  }
})
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-4">Looks like you're the first one here!</h1>
    <p class="mb-4">Tell us a little about your organization</p>
    <form @submit.prevent="handleCreateOrganization">
      <label for="businessName" class="block text-sm font-medium text-gray-700"
        >Business Name</label
      >
      <input
        id="businessName"
        name="businessName"
        type="text"
        required
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="submit"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Organization
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 640px; /* Tailwind's sm breakpoint */
}
</style>
