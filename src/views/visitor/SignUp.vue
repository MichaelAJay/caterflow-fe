<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const form = ref({
      name: '',
      owner: '',
      email: '',
      password: ''
    })

    const submitForm = () => {
      const requestBody = { ...form.value }
      console.log(requestBody)
      // Here you can make your API request
    }

    return { form, submitForm }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="form.name" type="text" required />
    </div>
    <div>
      <label for="owner">Owner:</label>
      <input id="owner" v-model="form.owner" type="text" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="form.email" type="email" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="form.password" type="password" required />
    </div>
    <button type="submit">Sign Up</button>
  </form>
</template>
