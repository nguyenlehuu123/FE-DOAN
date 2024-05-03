<script setup lang="ts">
import { showDialogStore } from "~/stores/showDialogStore";
import { useChapterStore } from "~/stores/chapterStore";
import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import validation from "~/common/validation";
import NguyenDatePicker from "~/components/ui/NguyenDatePicker.vue";
import NguyenSelect from "~/components/ui/NguyenSelect.vue";
import NguyenUploadFile from "~/components/ui/NguyenUploadFile.vue";
import NguyenAddChapterItem from "~/components/ui/NguyenAddChapterItem.vue";
import { useI18n } from "vue-i18n";
import { dialogConfirmStore } from "~/stores/dialogConfirmStore";
import { computed } from "#imports";
import { useDraftingStore } from "~/stores/draftingStore";

const ADD_MODE = 1
const EDIT_MODE = 2

const i18n = useI18n()
const showDialog = showDialogStore()
const chapterStore = useChapterStore()
const dialogConfirm = dialogConfirmStore()
const draftingStore = useDraftingStore()
const form = ref()
const addChapterItemHandleRef = ref()
const mode = ref<number>(ADD_MODE)
const indexChapterItem = ref<number>(-1)
const itemsStatus = [{
  statusKey: 1,
  statusName: 'Khoá'
},
  {
    statusKey: 2,
    statusName: 'Mở khoá'
  }]

interface IChapterAdd {
  chapterNumber: number | null;
  statusKey: number | null;
  releaseDate: string;
  urlFile: string;
  fileName: string;
}

const chapterAddModel = ref<IChapterAdd[]>(chapterStore.getChapterAddModel)
watch(() => chapterStore.getChapterAddModel, (value) => {
  chapterAddModel.value = value
}, { deep: true })
const chapterAddItem = ref<IChapterAdd>({
  chapterNumber: null,
  statusKey: null,
  releaseDate: '',
  urlFile: '',
  fileName: ''
})

const drafting = computed(
  {
    get() {
      return draftingStore.getDrafting
    },
    set(value: boolean) {
      draftingStore.updateDrafting(value)
    }
  }
)
const handleClickCancel = () => {
  if (drafting.value) {
    dialogConfirm.setConfirmResolve(handleCancel)
    dialogConfirm.setContentMessage(i18n.t('message.000013'))
    dialogConfirm.setShow(true)
  } else {
    handleCancel()
  }
}

const handleCancel = () => {
  clearFormData()
  chapterAddModel.value = []
  showDialog.handleToggleShowDialogRegisterChapter()
}

const clearFormData = () => {
  chapterAddItem.value = {
    chapterNumber: null,
    statusKey: null,
    releaseDate: '',
    urlFile: '',
    fileName: ''
  }
  form.value.reset()
}

const handleClickAddChapter = async () => {
  const { valid } = await form.value.validate()
  if (!valid) {
    return
  }
  if (mode.value === ADD_MODE) {
    chapterAddModel.value = [...chapterAddModel.value, chapterAddItem.value]
  } else {
    chapterAddModel.value[indexChapterItem.value] = chapterAddItem.value
    mode.value = ADD_MODE
  }
  drafting.value = true
  clearFormData()
}

const handleEmittedUploadFile = (payload: {
  urlFileUpload: string | null
  fileName: string
}) => {
  chapterAddItem.value.urlFile = payload.urlFileUpload as string
  chapterAddItem.value.fileName = payload.fileName
  drafting.value = true
}

const handleClickApply = () => {
  chapterStore.handleResetChapterModel()
  chapterStore.handleAddMultipleChapterModel(chapterAddModel.value)
  showDialog.handleToggleShowDialogRegisterChapter()
}

const handleEditChapterItem = (index: number) => {
  mode.value = EDIT_MODE
  indexChapterItem.value = index
  chapterAddItem.value = chapterAddModel.value[index]
}

const handleDeleteChapterItem = (index: number) => {
  chapterAddModel.value.splice(index, 1)
}

const handleChangeStatusChapterItem = (payload: {
  index: number
  status: number
}) => {
  chapterAddModel.value[payload.index].statusKey = payload.status
}

defineExpose({
  handleEditChapterItem
})

</script>

<template>
  <v-dialog
    :model-value="showDialog.isShowDialogRegisterChapter"
    :width="1000"
    :height="700"
    position="fixed"
    top="50%"
    left="50%"
    style="z-index: 200"
    @click:outside="showDialog.handleToggleShowDialogRegisterChapter"
    @keydown.esc="showDialog.handleToggleShowDialogRegisterChapter"
  >
    <v-card
      flat
      height="100%"
    >
      <v-card-title class="mx-auto" style="font-weight: bolder">
        {{ $t('page.uploadStory.popupRegisChapter.addChapter') }}
      </v-card-title>
      <div
        class="mx-auto"
        style="height: 340px; overflow-y: auto; overflow-x: hidden; padding: 0 40px;"
      >
        <nguyen-add-chapter-item
          ref="addChapterItemHandleRef"
          @edit-chapter-item="handleEditChapterItem"
          @delete-chapter-item="handleDeleteChapterItem"
          @status-chapter-item="handleChangeStatusChapterItem"
          v-for="(chapter, index) in chapterAddModel"
          :key="index"
          :index="index"
          style="margin: 10px 0"
          :status="chapter.statusKey"
          :width="860"
          :chapter-number="chapter.chapterNumber"
          :file-name="chapter.fileName"
        ></nguyen-add-chapter-item>
      </div>
      <v-form ref="form">
        <div>
          <div style="display: flex; justify-content: space-around">
            <nguyen-text-field
              v-model="chapterAddItem.chapterNumber"
              density="compact"
              style="border-radius: 8px"
              :label="$t('page.uploadStory.popupRegisChapter.chapterNumber')"
              :text-field-width="200"
              :rules="[
              (value) => validation.required(value, $t('page.uploadStory.popupRegisChapter.chapterNumber')),
              (value) => validation.isRealNumber(value, $t('page.uploadStory.popupRegisChapter.chapterNumber'))
            ]"
              @input="drafting = true"
            >
            </nguyen-text-field>
            <nguyen-date-picker
              v-model="chapterAddItem.releaseDate"
              :label="$t('page.uploadStory.popupRegisChapter.releaseDate')"
              :label-width="150"
              :text-field-width="200"
              :date-picker-width="200"
              :rules="[
                 (value) => validation.required(value, $t('page.uploadStory.popupRegisChapter.releaseDate'))
              ]"
              @input="drafting = true"
            >
            </nguyen-date-picker>
            <nguyen-select
              v-model="chapterAddItem.statusKey"
              width="200px"
              item-title="statusName"
              item-value="statusKey"
              :label-select="$t('page.uploadStory.popupRegisChapter.status')"
              :label="$t('page.uploadStory.popupRegisChapter.selectStatus')"
              :items="itemsStatus"
              :rules="[
                  (value) => validation.required(value, $t('page.uploadStory.popupRegisChapter.status'))
              ]"
              @update:menu="drafting = true"
              @input="drafting = true"
            >
            </nguyen-select>
          </div>
          <div style="display: flex; justify-content: center">
            <nguyen-upload-file
              @upload-file="handleEmittedUploadFile"
              :label="$t('page.uploadStory.popupRegisChapter.fileChapter')"
              :label-width="150"
              :horizontal="true"
              :width="580"
              :rules="[
                (value) => validation.required(value, 'File Chapter')
              ]"
            >
            </nguyen-upload-file>
          </div>
          <div style="display: flex; justify-content: right; margin-right: 64px">
            <v-btn
              variant="elevated"
              class="bg-light-green-accent-3 mt-8"
              @click="handleClickAddChapter"
            >
              {{ $t('page.uploadStory.popupRegisChapter.addChapter') }}
            </v-btn>
          </div>
        </div>
        <div style="display: flex; justify-content: center; padding-top: 40px; padding-bottom: 20px">
          <v-card-actions>
            <v-btn
              variant="elevated"
              class="bg-blue-darken-1"
              @click="handleClickApply"
            >
              {{ $t('page.uploadStory.popupRegisChapter.apply') }}
            </v-btn>
            <v-btn
              variant="elevated"
              class="bg-red-darken-2"
              @click="handleClickCancel"
            >
              {{ $t('page.uploadStory.popupRegisChapter.cancel') }}
            </v-btn>
          </v-card-actions>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>