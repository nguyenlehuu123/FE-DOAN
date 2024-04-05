<script setup lang="ts">
import validation from "~/common/validation";

defineOptions({
  inheritAttrs: false
})

const inputValue = defineModel()

interface Props {
  maxLength: string | number | null,
  rows?: string | number,
  label?: string,
  labelWidth?: string | number,
  width?: string | number,
  rules?: Function[] | null,
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: null,
  rows: 2,
  label: '',
  labelWidth: 0,
  width: 0,
  rules: () => [],
  disabled: false
})

</script>

<template>
  <div class="d-flex flex-column">
    <div v-if="label !== ''" class="py-2 text-body-1">
      <span
        :style="`width: ${(props.labelWidth + '').replace('px', '')}px; min-width: ${(props.labelWidth + '').replace('px', '')}px`">{{
          label
        }}</span>
    </div>
    <div :class="!width ? 'w-100' : ''" :style="`width: ${(width + '').replace('px', '')}px`">
      <v-textarea
        v-model="inputValue"
        validate-on="blur"
        v-bind="$attrs"
        variant="outlined"
        rounded="0"
        :disabled="props.disabled"
        :rows="props.rows"
        :maxlength="props.maxLength"
        :rules="props.maxLength ? [
          ...props.rules,
          (value) => validation.lengthMax(value, props.maxLength, props.label)
        ] : props.rules"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </v-textarea>
    </div>
    <div v-if="props.maxLength && inputValue !== null && inputValue" class="py-0 px-0 mt-n5 text-overline">
      {{ inputValue.length }} / {{ props.maxLength }} ký tự
    </div>
  </div>
</template>

<style>

</style>