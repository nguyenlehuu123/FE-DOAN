<script setup>

import NguyenCategory from "~/components/ui/NguyenCategory.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-category
      src="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/394031137_1337720656838436_5249154178189877248_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=OjYOf6pAWC4AX_rw2HF&_nc_ht=scontent.fhan19-1.fna&oh=00_AfClcHPJAvpP7K4HQMKI4j1BEYzLYcALByvnUwSoh3yD7w&oe=65D57D3B"
      title="Ôm khẩn tiểu mã giáp ..."
      posting-time="5 ngày trước"
      :status="2"
      chapter="99"
    ></nguyen-category>
  </v-card>
</template>

<style scoped lang="scss">
</style>
