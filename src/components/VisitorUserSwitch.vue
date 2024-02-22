<script lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(async () => {
      const authStore = useAuthStore()
      const componentToPush = authStore.bearerToken ? 'Dashboard' : 'CreateAccount'
      console.log('VisitorUserSwitch to', componentToPush)
      router.push({ name: componentToPush })
    })
  }
}
</script>
