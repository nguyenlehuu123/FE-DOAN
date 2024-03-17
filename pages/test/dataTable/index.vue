<script setup>
import NguyenDataTable from "~/components/ui/NguyenDataTable.vue";

definePageMeta({
  layout: false
})

const headersFixed = [
  {
    key: 'chapter',
    title: 'Chapter',
    align: 'start',
    sortable: true,
    width: '30%',
    fixed: true
  },
  {
    key: 'status',
    title: 'Status',
    align: 'start',
    sortable: false,
    width: '20%',
    fixed: true
  },
  {
    key: 'view',
    title: 'View',
    align: 'start',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'dateSubmitted',
    title: 'DateSubmitted',
    align: 'start',
    sortable: true,
    width: '30%',
    fixed: true
  },
]
const items = [
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '20/10/2022',
  }
]

</script>

<template>
  <v-card
    class="mx-4"
    variant="text"
  >
    <nguyen-data-table
      :headers="headersFixed"
      :items="items"
      :height="400"
    >
      <template #item.view="{ item }">
        <div>
          <v-icon icon="mdi-eye-check-outline"></v-icon>
          <span class="mx-2">{{ item.view }}</span>
        </div>
      </template>
      <template #item.status="{ item }">
        <div>
          <v-icon v-if="item.status === 0" icon="mdi-lock-alert-outline"></v-icon>
          <v-icon v-else icon="mdi-lock-open-outline"></v-icon>
        </div>
      </template>
    </nguyen-data-table>
  </v-card>
</template>

<style scoped lang="scss">
</style>