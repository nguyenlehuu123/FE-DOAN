<script setup lang="ts">

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import NguyenTextField from "~/components/ui/NguyenTextField.vue";

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

const inputModel = defineModel()
const dateTextField = ref()
const datePicker = ref()
const calendarOpen = ref<boolean>(false)

const emit = defineEmits([
  'date-update'
])

const selectDateHandle = (date: Date) => {
  dateTextField.value.textFieldRef.validate()
  emit('date-update', date)
}

// check format date dd/MM/yyyy or ddMMyyyy
const formatDateRule = function (value: string | null) {
  if (value === null || value === '' || !value) {
    return true
  }

  // Rule 1: Check input format
  const hasSlash = value && value.includes('/')
  const hasValidFormat = hasSlash
    ? /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(value)
    : /^\d{8}$/.test(value)

  if (!hasValidFormat) {
    return props.fieldName + ' please enter the date pattern in ddMMyyyy format 1.'
  }

  return true
}

// validate date invalid
const validDateRule = function (value: string | null) {
  if (value === null || value === '' || !value) {
    return true
  }

  const hasSlash = value && value.includes('/')
  const [day, month, year] = hasSlash
    ? value.split('/').map(Number)
    : [Number(value.slice(0, 2)), Number(value.slice(2, 4)), Number(value.slice(4, 8))]

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
  const daysInMonth = [0, 31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month]) {
    return props.fieldName + 'please enter the date pattern in ddMMyyyy format 2.'
  }
  return true
}

// format date to dd/MM/yyyy
const formatDate = function (value: string | null) {
  if (!value || formatDateRule(value) !== true || validDateRule(value) !== true) {
    return value
  }
  const hasSlash = value && value.includes('/')
  const [day, month, year] = hasSlash
    ? value.split('/').map(Number)
    : [Number(value.slice(0, 2)), Number(value.slice(2, 4)), Number(value.slice(4, 8))]
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

const resetValidation = () => {
  dateTextField.value.textFieldRef.resetValidation()

}
const validate = () => {
  dateTextField.value.textFieldRef.validate()
}

defineExpose({
  dateTextField,
  resetValidation,
  validate
})
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
    <div :style="`width: ${datePickerWidth}px`"
         class="py-0 d-flex align-center"
         :class="!datePickerWidth ? 'flex-1-0' : ''"
    >
      <nguyen-text-field
        ref="dateTextField"
        v-bind="$attrs"
        v-model.trim="inputModel"
        max-length="10"
        validate-on="submit"
        :disabled="props.disabled"
        :rules="calendarOpen ? [] : [
          (value) => formatDateRule(value),
          (value) => validDateRule(value),
          ...props.rules
        ]"
        :format-function="
        [
            formatDate,
            ...props.formatFunction
        ]"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
        <template #append-inner>
          <vue-date-picker
            ref="datePicker"
            v-model="inputModel"
            type="date"
            text-input
            model-type="dd/MM/yyyy"
            keep-action-row
            :auto-apply="true"
            :teleport="true"
            :enable-time-picker="false"
            :config="{keepActionRow: true}"
            @date-update="selectDateHandle"
            @open="calendarOpen = true"
            @closed="calendarOpen = false"
          >
          </vue-date-picker>
        </template>
      </nguyen-text-field>
    </div>
  </div>
</template>

<style lang="scss">
.v-input__control {
  .v-field--appended .v-field__field {
    height: 40px;
    display: flex;
    align-items: center;
  }
}

.v-field__append-inner {

  .dp__input_icon_pad {
    height: 20px;
    width: 30px;
    border: none;
  }

  .dp__input_wrap {
    margin-left: 10px;
  }
}
</style>