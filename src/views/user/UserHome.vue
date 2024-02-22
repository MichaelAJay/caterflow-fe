<script lang="ts">
import { onMounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('Mounted UserHome')
    })
  }
}
</script>

<template>
  <div>User Landing Page</div>
</template>
