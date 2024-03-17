<script setup>
import NguyenTextFieldComment from "~/components/ui/NguyenTextFieldComment.vue";

definePageMeta({
  layout: false
})
</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-text-field-comment
      density="compact"
      placeholder="Viết bình luận ..."
      src-image="https://scontent.fhan19-1.fna.fbcdn.net/v/t39.30808-6/394031137_1337720656838436_5249154178189877248_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=OjYOf6pAWC4AX-wO3kW&_nc_ht=scontent.fhan19-1.fna&oh=00_AfB14QpybC5gRmXcFpWC3Dt3F5rORA-5gDNDTwq7Rfxnyw&oe=65D7777B"
      alt="Linh Nhi"
    ></nguyen-text-field-comment>
  </v-card>
</template>

<style scoped lang="scss">
</style>