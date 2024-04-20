<script setup lang="ts">
import NguyenCategory from "~/components/ui/NguyenCategory.vue";
import NguyenFooterPage from "~/components/ui/NguyenFooterPage.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";
</script>
<template>
  <div>
    <nguyen-category
      src="https://autopro8.mediacdn.vn/2018/12/27/aventador-lamborghini-liberty-vn-2-1545885685345311699204.jpg"
      title="Ôm khẩn tiểu mã giáp ..."
      posting-time="5 ngày trước"
      :status="2"
      chapter="99"
    >
    </nguyen-category>
  </div>
  <div>
    <nguyen-footer>
      <nguyen-footer-page></nguyen-footer-page>
    </nguyen-footer>
  </div>
</template>

<style scoped>

</style>
