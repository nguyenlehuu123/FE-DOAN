<script setup lang="ts">

import { definePageMeta } from '#imports'
import NguyenSelect from "~/components/ui/NguyenSelect.vue";
import validation from "~/common/validation";

definePageMeta({
  layout: false
})

const input = ref(null)
const items = [
  {
    text: 'Item 1',
    key: 'item1'
  },
  {
    text: 'Item 2',
    key: 'item2'
  },
  {
    text: 'Item 3',
    key: 'item3'
  },
  {
    text: 'Item 4',
    key: 'item4'
  },
  {
    text: 'Item 5',
    key: 'item5'
  },
  {
    text: 'Item 6',
    key: 'item6'
  },
  {
    text: 'Item 7',
    key: 'item7'
  },
  {
    text: 'Item 7',
    key: 'item7'
  }
]
</script>

<template>
  <v-card
    class="justify-center py-4 px-4"
    :flat="true"
  >
    <nguyen-select
      v-model="input"
      width="500px"
      label-select="Tên tác giả"
      horizontal
      label="chọn thể loại"
      item-title="text"
      item-value="key"
      :multiple="true"
      :items="items"
      :rules="[
        validation.required
      ]"
    />
  </v-card>
</template>

<style scoped>

</style>
