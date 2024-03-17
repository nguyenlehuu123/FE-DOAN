<script setup>
import NguyenLike from "~/components/ui/NguyenLike.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-like
      icon="mdi-thumb-up"
      :like-num="1"
      :liked="true"
    ></nguyen-like>
  </v-card>
</template>

<style scoped lang="scss">
</style>
