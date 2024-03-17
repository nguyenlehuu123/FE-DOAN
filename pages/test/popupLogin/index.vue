<script setup>
import NguyenLike from "~/components/ui/NguyenLike.vue";
import NguyenPopupLogin from "~/components/popup/NguyenPopupLogin.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-popup-login></nguyen-popup-login>
  </v-card>
</template>

<style scoped lang="scss">
</style>
