<script setup>

import NguyenDatePicker from "~/components/ui/NguyenDatePicker.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <nguyen-date-picker
    label="Test DatePicker"
    :label-width="120"
  ></nguyen-date-picker>
</template>

<style scoped lang="scss">
</style>
