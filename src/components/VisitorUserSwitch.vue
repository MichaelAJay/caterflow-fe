<script lang="ts">
import router from '@/router'
import { getUser } from '@/services/firestoreAuth'
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(async () => {
      const user = getUser(false)
      let componentToPush = 'VisitorHome'
      if (user) {
        componentToPush = user.emailVerified ? 'Dashboard' : 'Verify Email'
      }
      router.push({ name: componentToPush })
    })
  }
}
</script>
