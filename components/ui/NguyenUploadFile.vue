<script setup lang="ts">
import { UseFirebase } from "~/common/useFirebase";

const slots = useSlots()
defineOptions({
  inheritAttrs: false
})

interface Props {
  density?: null | 'default' | 'comfortable' | 'compact';
  formatFunction?: Function[]
  label?: string
  labelWidth?: number | string
  rules?: Function[] | null
  disabled?: boolean
  horizontal: boolean
  width: string | number
}

const props = withDefaults(defineProps<Props>(), {
  density: 'default',
  formatFunction: () => [],
  label: '',
  labelWidth: 150,
  rules: () => [],
  disabled: false,
  horizontal: false,
  width: 0
})

const fileInputModel = defineModel()
const emit = defineEmits<{
  (event: 'upload:file', urlFileUpload: string): void
}>()
const fileInputRef = ref()
const urlFileUpload = ref<string | null>(null)
const handleUploadFile = () => {
  fileInputRef.value.$el.querySelector('input').click()
  fileInputRef.value.validate()
}

const handleFileChange = async (value: Event) => {
  const target = value.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    if (!target.value) {
      handleRequiredError()
    } else {
      if (urlFileUpload.value !== null) {
        UseFirebase.handleDeleteFile(urlFileUpload.value)
        emit('upload:file', urlFileUpload.value)
      }
      urlFileUpload.value = await UseFirebase.handleUploadFile('file/chapter', target.files[0])
      clearRequiredError()
    }
  }
}

const handleRequiredError = () => {
  fileInputRef.value.$el.getElementsByClassName('v-field__outline')[0].style.border = '1px solid red'
  fileInputRef.value.$el.getElementsByClassName('v-field__outline__end')[0].style.border = 'none'
  fileInputRef.value.$el.getElementsByClassName('v-field__outline__start')[0].style.border = 'none'
  fileInputRef.value.$el.getElementsByClassName('v-input__details')[0].innerText = 'File is required'
  fileInputRef.value.$el.getElementsByClassName('v-input__details')[0].style.color = 'red'
}

const clearRequiredError = () => {
  fileInputRef.value.$el.getElementsByClassName('v-field__outline')[0].style.border = '1px solid #c5c5c5'
  fileInputRef.value.$el.getElementsByClassName('v-input__details')[0].innerText = ''
  fileInputRef.value.$el.getElementsByClassName('v-input__details')[0].style.color = 'black'
}

onMounted(() => {
  fileInputRef.value.$el.getElementsByClassName('mdi-close-circle')[0].addEventListener('click', () => {
    handleRequiredError()
    if (urlFileUpload.value !== null) {
      UseFirebase.handleDeleteFile(urlFileUpload.value)
    }
  })
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
    <div style="display: flex">
      <div :class="!width ? 'w-100' : ''" :style="`width: ${(width + '').replace('px', '')}px`"
           class="v-file-input--custom">
        <v-file-input
          v-model="fileInputModel"
          ref="fileInputRef"
          v-bind="$attrs"
          validate-on="blur"
          variant="outlined"
          :bg-color="props.disabled ? 'bg-disable' : ''"
          :disabled="props.disabled"
          :rules="props.rules"
          @change="handleFileChange"
        >
          <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </v-file-input>
      </div>
      <v-btn
        @click="handleUploadFile"
        prepend-icon="mdi-upload"
        flat
        style="background-color: #42A5F5; color: white; font-size: 12px; height: 40px"
      >
        Upload File
      </v-btn>
    </div>
  </div>
</template>
<style lang="scss">
.v-file-input--custom {
  .v-input {
    .v-input__prepend {
      display: none;
    }

    .v-field__field {
      display: flex;
      align-items: center;
    }

    .v-input__control {
      height: 40px;

      .v-field {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>