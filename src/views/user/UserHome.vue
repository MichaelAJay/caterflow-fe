<script lang="ts">
import { isUserAssociatedWithAccount } from '@/services/apiService'
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(async () => {
      console.log('Mounted UserHome')

      // This should really be stored
      const doesUserHaveAccount = await isUserAssociatedWithAccount();
      if (!doesUserHaveAccount) {
        console.log('Pop up large "Create Account" modal')
      }
    })
  }
}
</script>

<template>
  <div>User Landing Page</div>
</template>
