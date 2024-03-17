<script setup>
import NguyenComment from "~/components/ui/NguyenComment.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-comment
      account-name="@nguyenle"
      text-comment="em vẫn muốn được anh lì xì"
      srg-avatar="https://i1-vnexpress.vnecdn.net/2020/11/19/lamborghini-huracan-sto-7012-1605777839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=_LK7qvQPtHWLoFWTspAb9Q"
      :like-num="1"
      :dislike-num="0"
      :day-ago="1"
      :role-heart="true"
    ></nguyen-comment>
  </v-card>
</template>

<style scoped lang="scss">
</style>
