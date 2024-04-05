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

  <div
    class="border-table"
    v-if="props.items.length > 0"
  >
    <v-data-table-virtual
      v-bind="$attrs"
      :headers="headers"
      :height="props.height"
      :loading="props.loading"
      :items="props.items"
      :sticky="true"
      fixed-header
      item-value="name"
      class="css-table-column"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
      <template #bottom>
      </template>
      <template #no-data></template>
    </v-data-table-virtual>
  </div>
  <div v-else
       style="width: 100%; height: 25px; background-color: rgb(142, 142, 142, 0.2); border: none"
  >

  </div>

</template>
<style lang="scss">
.border-table {
  border: black 1px solid;
  border-radius: 4px;
}

.css-table-column table {
  border-collapse: collapse !important; /* Collapses the table borders */

}

.css-table-column th,
.css-table-column td {
  border: 1px solid #ddd !important; /* Adds a border to each cell */
  text-align: left; /* Aligns text to the left */
  padding: 8px; /* Adds padding inside each cell */
}
</style>