<script setup>
import NguyenAddChapterItem from "~/components/ui/NguyenAddChapterItem.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <div style="margin-left: 50px; margin-top: 50px">
    <nguyen-add-chapter-item
      :status="1"
      :width="800"
      :chapter-number="1"
      file-name="Cong chua va bay chu lun o trong rung.pdf"
    ></nguyen-add-chapter-item>
  </div>
</template>

<style scoped lang="scss">
</style>