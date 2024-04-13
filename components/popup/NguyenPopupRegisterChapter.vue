<script setup lang="ts">
import { showDialogStore } from "~/stores/showDialogStore";
import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import validation from "~/common/validation";
import NguyenDatePicker from "~/components/ui/NguyenDatePicker.vue";
import NguyenSelect from "~/components/ui/NguyenSelect.vue";
import NguyenUploadFile from "~/components/ui/NguyenUploadFile.vue";
import NguyenAddChapterItem from "~/components/ui/NguyenAddChapterItem.vue";

const showDialog = showDialogStore()
const form = ref()
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

const chapterAddModel = ref<IChapterAdd[]>([])
const chapterAddItem = ref<IChapterAdd>({
  chapterNumber: null,
  statusKey: null,
  releaseDate: '',
  urlFile: '',
  fileName: ''
})

const handleClickCancel = () => {
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
  debugger
  const { valid } = await form.value.validate()
  if (!valid) {
    return
  }

  chapterAddModel.value.push(chapterAddItem.value)
  clearFormData()
}

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
      <v-card-title class="mx-auto" style="font-weight: bolder">Add Chapter</v-card-title>
      <div
        class="mx-auto"
        style="height: 340px; overflow-y: auto; overflow-x: hidden; padding: 0 40px;"
      >
        <nguyen-add-chapter-item
          v-for="(chapter, index) in chapterAddModel"
          :key="index"
          style="margin: 10px 0"
          :status="chapter.statusKey"
          :width="860"
          :chapter-number="chapter.chapterNumber"
          file-name="Cong chua va bay chu lun o trong rung.pdf"
        ></nguyen-add-chapter-item>
      </div>
      <v-form ref="form">
        <div>
          <div style="display: flex; justify-content: space-around">
            <nguyen-text-field
              v-model="chapterAddItem.chapterNumber"
              label="Chapter Number"
              density="compact"
              style="border-radius: 8px"
              :text-field-width="200"
              :rules="[
              (value) => validation.required(value, 'Chapter Number'),
              (value) => validation.isRealNumber(value, 'Chapter Number')
            ]"
            >
            </nguyen-text-field>
            <nguyen-date-picker
              v-model="chapterAddItem.releaseDate"
              label="Release Date"
              :label-width="150"
              :text-field-width="200"
              :date-picker-width="200"
              :rules="[
                 (value) => validation.required(value, 'Release Date')
              ]"
            >
            </nguyen-date-picker>
            <nguyen-select
              v-model="chapterAddItem.statusKey"
              width="200px"
              label-select="Trạng thái"
              label="chọn trạng thái"
              item-title="statusName"
              item-value="statusKey"
              :items="itemsStatus"
              :rules="[
                  (value) => validation.required(value, 'Trạng thái')
              ]"
            >
            </nguyen-select>
          </div>
          <div style="display: flex; justify-content: center">
            <nguyen-upload-file
              v-model="chapterAddItem.urlFile"
              @upload:file="chapterAddItem.urlFile = $event"
              label="File Chapter"
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
              class="bg-light-green-accent-3"
              @click="handleClickAddChapter"
            >
              Add Chapter
            </v-btn>
          </div>
        </div>
        <div style="display: flex; justify-content: center; padding-top: 40px; padding-bottom: 20px">
          <v-card-actions>
            <v-btn
              variant="elevated"
              class="bg-blue-darken-1"
            >
              ADD
            </v-btn>
            <v-btn
              variant="elevated"
              class="bg-red-darken-2"
              @click="handleClickCancel"
            >
              Huỷ
            </v-btn>
          </v-card-actions>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>