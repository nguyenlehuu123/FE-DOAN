<script setup lang="ts">
import { sendMessage } from "~/services/websocket";
import { userStore } from "~/stores/useStore";
import { dialogHttpStore } from "~/stores/dialogHttpStore";
import { useI18n } from "vue-i18n";

const slots = useSlots()
defineOptions({
  inheritAttrs: false
})
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
  storyId: number | string
  parentCommentId: number | null
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
  storyId: '',
  parentCommentId: null
})
const emit = defineEmits(['showInputComment'])
const inputModel = ref(null)
const userStoreLocal = userStore()
const dialogHttpLocal = dialogHttpStore()
const i18n = useI18n()

//handle event
const handleFocusComment = () => {
  if (!userStoreLocal.authorization) {
    dialogHttpLocal.setTitle("ERROR")
    dialogHttpLocal.setContent(i18n.t('message.000008'))
    dialogHttpLocal.setShow(true)
  }
}

// web socket
const handleSendMessage = () => {
  sendMessage('/app/story/' + props.storyId + "/comment", {
    message: inputModel.value,
    token: userStoreLocal.authorization,
    commentId: props.parentCommentId
  })
  inputModel.value = null
}
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
          @update:focused="handleFocusComment"
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
            {{ $t('page.mangaDetail.cancel') }}
          </v-btn>
          <v-btn
            variant="tonal"
            class="rounded-pill"
            @click="handleSendMessage"
          >
            {{ $t('page.mangaDetail.comment') }}
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
