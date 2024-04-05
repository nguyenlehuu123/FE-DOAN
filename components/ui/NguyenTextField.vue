<script setup lang="ts">
const slots = useSlots()
defineOptions({
  inheritAttrs: false
})

const model = defineModel()

const emit = defineEmits([
  'change'
])

type ValidationResult = string | boolean
type ValidationRule$1 =
  ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

interface Props {
  appendInnerClass?: string | null
  density?: null | 'default' | 'comfortable' | 'compact';
  formatFunction?: Function[]
  maxLength?: number | null
  label?: string
  labelWidth?: number | string
  labelClass?: string | null
  rules?: readonly ValidationRule$1[]
  disabled?: boolean
  textFieldWidth?: string | number | null
  horizontal: boolean
}

const props = withDefaults(defineProps<Props>(), {
  appendInnerClass: null,
  density: 'default',
  formatFunction: () => [],
  maxLength: null,
  label: '',
  labelWidth: 150,
  labelClass: null,
  rules: () => [],
  disabled: false,
  textFieldWidth: null,
  horizontal: false
})

const textFieldWidth = computed(() => {
  if (props.density === 'comfortable') {
    return null
  }
  if (props.textFieldWidth) {
    return (props.textFieldWidth + '').replace('px', '')
  }
  let textFieldWidth = null
  if (props.maxLength) {
    textFieldWidth = (props.maxLength * 9) + 20 + 16
    if (!!slots['append-inner'] || !!slots['prepend-inner']) {
      textFieldWidth += 24
    }
  }
  return textFieldWidth
})

const format = (event: Event) => {
  let temp = model.value
  props.formatFunction?.forEach((format) => {
    temp = format(temp)
  })
  model.value = temp
  emit('change', event)
}
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
    <div :style="`width: ${textFieldWidth}px`" class="py-0 d-flex align-center"
         :class="!textFieldWidth ? 'flex-1-0' : ''">
      <v-text-field
        v-model="model"
        v-bind="$attrs"
        validate-on="blur"
        variant="outlined"
        :density="props.density"
        :bg-color="props.disabled ? 'bg-disable' : ''"
        :disabled="props.disabled"
        :maxlength="props.maxLength"
        :rules="props.rules"
        @change="format"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
