<script setup lang="ts">
import truckLogo from '../assets/CF_logo_vector.svg';

const props = defineProps({
  imgClass: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="flex justify-center items-center">
    <img
      :src="truckLogo"
      alt="Logo: A catering truck with a chef's hat on top of it"
      :class="imgClass"
    />
  </div>
</template>
