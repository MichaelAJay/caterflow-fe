<script lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(async () => {
      console.log('Mounted VisitorUserSwitch')
      const authStore = useAuthStore()
      const user = authStore.user;
      let componentToPush = 'VisitorHome';
      if (user) {
        componentToPush = user.email_verified ? 'Dashboard' : 'Verify Email'
      }


      console.log('VisitorUserSwitch to', componentToPush)
      router.push({ name: componentToPush })
    })
  }
}
</script>