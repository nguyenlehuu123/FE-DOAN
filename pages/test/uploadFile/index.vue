<script setup>
import NguyenUploadFile from "~/components/ui/NguyenUploadFile.vue";
import validation from "~/common/validation.ts";

definePageMeta({
  layout: false
})
</script>

<template>
  <nguyen-upload-file
    label="Upload File"
    :label-width="150"
    :horizontal="true"
    :width="500"
    :rules="[
      validation.required
    ]"
  ></nguyen-upload-file>
</template>

<style scoped lang="scss">
</style>
