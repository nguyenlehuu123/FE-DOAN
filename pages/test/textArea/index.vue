<script setup>
import NguyenTextArea from "~/components/ui/NguyenTextArea.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-text-area
      :max-length="8"
      label="Test Area"
    ></nguyen-text-area>
  </v-card>
</template>

<style scoped lang="scss">
</style>
