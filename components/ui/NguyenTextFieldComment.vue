<script setup lang="ts">
const slots = useSlots()
defineOptions({
  inheritAttrs: false
})

const inputModel = defineModel()
const emit = defineEmits(['showInputComment'])

type ValidationResult = string | boolean
type ValidationRule$1 =
  ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

interface Props {
  density?: null | 'default' | 'comfortable' | 'compact'
  formatFunction?: Function[]
  rules?: readonly ValidationRule$1[]
  disabled?: boolean
  textFieldWidth?: string | number | null
  srcImage: string
  alt: string
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  density: 'default',
  formatFunction: () => [],
  rules: () => [],
  disabled: false,
  textFieldWidth: null,
  srcImage: '',
  alt: '',
  placeholder: '',
})

</script>

<template>
  <div class="d-flex align-center ga-4">
    <div>
      <v-avatar>
        <v-img
          :src="props.srcImage"
          :alt="props.alt"
        ></v-img>
      </v-avatar>
    </div>
    <div class="d-flex flex-column flex-1-0 ga-0">
      <div class="mb-n1">
        <v-text-field
          v-model="inputModel"
          v-bind="$attrs"
          validate-on="blur"
          rounded="0"
          :density="props.density"
          :rules="props.rules"
          :placeholder="props.placeholder"
        >
        </v-text-field>
      </div>
      <div class="d-flex justify-space-between">
        <div>
          <v-icon icon="mdi-emoticon-excited-outline"></v-icon>
        </div>
        <div class="ga-2 mt-n1">
          <v-btn
            variant="plain"
            class="rounded-pill"
            @click="$emit('showInputComment', false)"
          >
            Hủy
          </v-btn>
          <v-btn
            variant="tonal"
            class="rounded-pill"
          >
            Bình luận
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-icon:hover {
  cursor: pointer;
}
</style>
