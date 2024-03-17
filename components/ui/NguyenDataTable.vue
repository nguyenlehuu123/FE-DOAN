<script setup lang="ts">
const slots = useSlots()
defineOptions({
  inheritAttrs: false
})

interface Props {
  loading: boolean
  headers: Object
  items: Object[]
  width: string | number
  height: string | number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  headers: () => [],
  items: () => [],
  width: 0,
  height: 0
})
</script>

<template>
  <div>
    <div style="color: #FF8F00" class="ga-2 d-flex align-center my-2">
      <v-icon icon="mdi-database-search"></v-icon>
      <span>{{ $t('page.mangaDetail.chapterList') }}</span>
    </div>
    <div class="border-table">
      <v-data-table-virtual
        v-bind="$attrs"
        :headers="headers"
        :height="props.height"
        :loading="props.loading"
        :items="props.items"
        :sticky="true"
        item-value="name"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </v-data-table-virtual>
    </div>
  </div>
</template>
<style scoped>
.border-table {
  border: black 1px solid;
  border-radius: 4px;
}
</style>