<script setup>
import NguyenTextField from '~/components/ui/NguyenTextField.vue'
import validation from "~/common/validation.ts";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    flat
  >
    <nguyen-text-field
      append-inner-class="lf_icon_user"
      label="Test label"
      density="compact"
      text-field-width="200"
      :rules="[
                validation.required
            ]"
    ></nguyen-text-field>
  </v-card>
</template>

<style scoped lang="scss">
</style>
