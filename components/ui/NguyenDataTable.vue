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
  maxHeight: string | number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  headers: () => [],
  items: () => [],
  width: 0,
  height: 150,
  maxHeight: 300
})
</script>

<template>
  <div
    class="border-table"
  >
    <v-data-table-virtual
      v-bind="$attrs"
      :headers="headers"
      :loading="props.loading"
      :items="props.items"
      :sticky="true"
      :style="`${maxHeight ? `max-height: ${maxHeight}px;` : ''}`"
      fixed-header
      item-value="name"
      class="css-table-column data-table"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>
      <template #bottom>
      </template>
      <template #no-data>
        <div class="d-flex justify-center">
          <span>No data table</span>
        </div>
      </template>
    </v-data-table-virtual>
  </div>

</template>
<style lang="scss">
.border-table {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  min-height: 100px;
  cursor: pointer;

  table {
    thead th {
      background-color: #E0E0E0 !important;
    }
  }
}

.css-table-column table {
  border-collapse: collapse !important; /* Collapses the table borders */
}

.css-table-column th,
.css-table-column td {
  border: 1px solid #BDBDBD !important; /* Adds a border to each cell */
  text-align: left; /* Aligns text to the left */
  padding: 8px; /* Adds padding inside each cell */
}
</style>