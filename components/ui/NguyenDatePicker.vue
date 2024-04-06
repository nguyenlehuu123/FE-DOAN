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
  disabled: boolean
  horizontal: boolean
  datePickerWidth: string | number | null
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  labelWidth: 150,
  rules: () => [],
  formatFunction: () => [],
  fieldName: '',
  class: '',
  disabled: false,
  horizontal: false,
  datePickerWidth: 500
})

const datePicker = defineModel()
</script>

<template>
  <div class="py-0" :style="`${props.horizontal ? 'display: flex; align-items: start;' : ''}`">
    <div
      v-if="props.label !== ''"
      class="py-1"
      :style="`width: ${(props.labelWidth + '').replace('px', '')}px; ${(props.labelWidth + '').replace('px', '')}px`"
    >
      <span>
        {{ props.label }}
        <v-icon v-if="horizontal && props.rules.toString().includes('required')" icon="mdi-hexagram"
                style="font-size: 12px; color: #EF5350"></v-icon>
      </span>
    </div>
    <div :style="`width: ${datePickerWidth}px`" class="py-0 d-flex align-center"
         :class="!datePickerWidth ? 'flex-1-0' : ''">
      <vue-date-picker
        v-model="datePicker"
        v-bind="$attrs"
        validate-on="blur"
        type="date"
        text-input
        :rules="props.rules"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </vue-date-picker>
    </div>
  </div>
</template>

<style scoped></style>