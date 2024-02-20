<script lang="ts">
export default {
    props: {
        stepNames: Array<string>,
        currentStep: Number,
        isNavigable: Boolean
    },
    methods: {
        navigateToStep(step: Number) {
            if (this.isNavigable) {
                this.$emit('navigate', step);
            }
        }
    }
}
</script>

<template>
    <nav class="flex justify-center space-x-4 md:space-x-8 p-4">
        <div
            v-for="(stepName, index) in stepNames"
            :key="stepName"
            class="cursor-pointer"
            :class="{'text-blue-500': currentStep === index, 'text-gray-500': currentStep !== index}"
            @click="navigateToStep(index)"

        >{{ stepName }}</div>
    </nav>
</template>