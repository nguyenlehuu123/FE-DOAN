<script setup>

import NguyenDatePicker from "~/components/ui/NguyenDatePicker.vue";
import validation from "~/common/validation.ts";

definePageMeta({
  layout: false
})
</script>

<template>
  <nguyen-date-picker
    label="Test DatePicker"
    :label-width="150"
    :horizontal="true"
    :rules="[
      validation.required
    ]"
  ></nguyen-date-picker>
</template>

<style scoped lang="scss">
</style>
