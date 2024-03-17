<script setup lang="ts">

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

defineOptions({
  inheritAttrs: false
})

interface Props {
  label: string
  labelWidth: string | number
  rules: Function[] | null
  formatFunction: Function[] | null
  fieldName: string
  class: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelWidth: 0,
  rules: () => [],
  formatFunction: () => [],
  fieldName: '',
  class: ''
})

const datePicker = defineModel()

</script>

<template>
  <div class="d-flex flex-row py-0">
    <div
      v-if="label !== ''"
      class="py-0 d-flex align-start"
      :style="`width: ${(props.labelWidth + '').replace('px', '')}px; max-width: ${(props.labelWidth + '').replace('px', '')}px`"
    >
      <span>{{ label }}</span>
    </div>
    <div>
      <vue-date-picker
        v-model="datePicker"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </vue-date-picker>
    </div>
  </div>
</template>

<style scoped></style>