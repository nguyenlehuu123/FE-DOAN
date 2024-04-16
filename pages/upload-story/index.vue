<script setup lang="ts">
import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import NguyenDataTable from "~/components/ui/NguyenDataTable.vue";
import NguyenSelect from "~/components/ui/NguyenSelect.vue";
import validation from "~/common/validation";
import NguyenTextArea from "~/components/ui/NguyenTextArea.vue";
import NguyenUploadImage from "~/components/ui/NguyenUploadImage.vue";
import NguyenDatePicker from "~/components/ui/NguyenDatePicker.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";
import uploadStoryRepository from "~/repositories/master/uploadStoryRepository";
import mangaDetailRepository from "~/repositories/master/mangaDetailRepository";
import { useI18n } from "vue-i18n";
import { DateHelper } from "~/common/helper";
import { showDialogStore } from "~/stores/showDialogStore";
import { useChapterStore } from "~/stores/chapterStore";
import NguyenPopupRegisterChapter from "~/components/popup/NguyenPopupRegisterChapter.vue";

const headersFixed = [
  {
    key: 'no',
    title: 'No',
    align: 'center',
    sortable: true,
    width: '5%',
    fixed: true
  },
  {
    key: 'storyName',
    title: 'storyName',
    align: 'center',
    sortable: true,
    width: '25%',
    fixed: true
  },
  {
    key: 'authorName',
    title: 'Name Author',
    align: 'center',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'dateSubmitted',
    title: 'date submitted',
    align: 'center',
    sortable: true,
    width: '15%',
    fixed: true
  },
  {
    key: 'likeNumber',
    title: 'Like',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'followNumber',
    title: 'Follow',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'rating',
    title: 'Rating',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'edit',
    title: 'Edit',
    align: 'center',
    sortable: false,
    width: '5%',
    fixed: true
  },
]
const headersChapter = [
  {
    key: 'chapterNumber',
    title: 'Chapter',
    align: 'center',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'releaseDate',
    title: 'Release Date',
    align: 'center',
    sortable: true,
    width: '30%',
    fixed: true
  },
  {
    key: 'view',
    title: 'view chapter',
    align: 'center',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'statusKey',
    title: 'Status',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  },
  {
    key: 'edit',
    title: 'Edit',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  },
  {
    key: 'delete',
    title: 'Delete',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  }
]

interface IStory {
  createTimestamp: string;
  creator: string;
  deleteFlg: number;
  description: string;
  followNumber: number;
  image: string;
  releaseDate: string,
  likeNumber: number;
  status: number;
  storyName: string;
  storyId: number;
  updateTimestamp: string;
  updater: string;
  versionNo: number;
  authorEntities: IAuthor[],
  chapterEntities: IChapterData[],
  storyGenreEntity: IStoryGenreSelect
}

interface IAuthor {
  authorId: number;
  name: string;
  pseudonym: string;
  email: string;
  address: string;
  phone: string;
}

interface IChapterData {
  creator: string;
  createTimestamp: string;
  updater: string;
  updateTimestamp: string;
  versionNo: number;
  deleteFlg: number;
  chapterId: number;
  viewNumber: number;
  statusKey: number;
  urlFile: string,
  fileName: string,
  chapterNumber: number;
  releaseDate: string;
}


interface ISearchConditionGroup {
  storyName: string
  authorName: string
}

interface IStoryGenreSelect {
  storyGenreId: number
  storyGenreName: string
}

interface IStoryTable {
  "no"?: number,
  "storyId": number,
  "storyName": string,
  "authorName": string[] | string,
  "dateSubmitted": string,
  "likeNumber": number,
  "followNumber": number,
  "rating": number
}

interface IAuthorSelect {
  authorId: string,
  authorName: string
}

interface IStoryDetail extends IStoryInfo {
  authorIds?: number[],
  chaptersAdd: IChapterAdd[]
}

interface IChapterAdd {
  chapterNumber: number | null;
  statusKey: number | null;
  releaseDate: string;
  urlFile: string;
  fileName: string;
}

interface IStoryInfo {
  storyName: string,
  releaseDate: string,
  description: string,
  image: string,
  storyGenreId: number | null,
}

const VIEW_MODE = 1
const ADD_MODE = 2
const EDIT_MODE = 3

const searchConditionForm = ref()
const formAddStoryRef = ref()
const searchConditionGroup = ref<ISearchConditionGroup>({
  storyName: '',
  authorName: ''
})
const i18n = useI18n()
const showDialogLocal = showDialogStore()
const chapterStore = useChapterStore()
const items = ref<IStoryTable[] | null>(null)
const authorSelect = ref<IAuthorSelect[] | null>(null)
const storyGenreSelect = ref<IStoryGenreSelect[] | null>(null)
const mode = ref(VIEW_MODE)
const authorIdModel = ref<number[]>([])
const chapterAddModel = ref<IChapterAdd[]>([...chapterStore.getChapterAddModel])
watch(() => chapterStore.getChapterAddModel, (value) => {
  chapterAddModel.value = value
})
const storyInfoModel = ref<IStoryInfo>({
  storyName: '',
  releaseDate: '',
  description: '',
  image: '',
  storyGenreId: null
})
const storyEdit = ref<number | null>(null)

const handleSearchStory = () => {
  const request = {
    storyName: searchConditionGroup.value.storyName,
    authorName: searchConditionGroup.value.authorName
  }
  const langCodes = {
    404: i18n.t('message.000010')
  }

  uploadStoryRepository.searchConditionStory(request, langCodes)
    .then((response: any) => {
      items.value = response as IStoryTable[]
      for (let i = 0; i < response.length; i++) {
        items.value[i].no = i + 1
        items.value[i].dateSubmitted = DateHelper.formatDateMMDDYYYY(response[i].dateSubmitted)
        items.value[i].authorName = response[i].authorName.join(', ')
      }
    })
}

const handleClickAddStory = () => {
  mode.value = ADD_MODE
  clearFormData()
  getAuthorSelectAndStoryGenreSelect()
}

const getAuthorSelectAndStoryGenreSelect = () => {
  Promise.all([
    uploadStoryRepository.getAllAuthorSelect(),
    uploadStoryRepository.getAllStoryGenre()
  ])
    .then((response) => {
      authorSelect.value = response[0] as IAuthorSelect[]
      storyGenreSelect.value = response[1] as IStoryGenreSelect[]
    })
}

const handleEditStory = (storyId: number) => {
  mode.value = EDIT_MODE
  storyEdit.value = storyId
  getAuthorSelectAndStoryGenreSelect()
  mangaDetailRepository.getMangaDetail(storyId)
    .then((response: unknown) => {
      const story = response as IStory;
      authorIdModel.value = story.authorEntities.map((author: IAuthor) => author.authorId)
      storyInfoModel.value = {
        storyName: story.storyName,
        releaseDate: DateHelper.formatDateMMDDYYYY(story.releaseDate),
        description: story.description,
        image: story.image,
        storyGenreId: story.storyGenreEntity.storyGenreId
      }
      chapterAddModel.value = story.chapterEntities.map((chapter: IChapterData) => {
        return {
          chapterNumber: chapter.chapterNumber,
          statusKey: chapter.statusKey,
          releaseDate: DateHelper.formatDateMMDDYYYY(chapter.releaseDate),
          urlFile: chapter.urlFile,
          fileName: chapter.fileName
        }
      })
      chapterStore.handleResetChapterModel()
      chapterStore.handleAddMultipleChapterModel(chapterAddModel.value)
    })
}

const handleAddChapter = () => {
  showDialogLocal.handleToggleShowDialogRegisterChapter()
}

const handleEditChapterItem = (index: number) => {
  showDialogLocal.handleToggleShowDialogRegisterChapter()
}

function buildRequestStory(): IStoryDetail {
  return {
    storyName: storyInfoModel.value.storyName,
    releaseDate: storyInfoModel.value.releaseDate,
    description: storyInfoModel.value.description,
    image: storyInfoModel.value.image,
    storyGenreId: storyInfoModel.value.storyGenreId,
    authorIds: authorIdModel.value,
    chaptersAdd: chapterAddModel.value
  }
}

function clearFormData() {
  storyInfoModel.value = {
    storyName: '',
    releaseDate: '',
    description: '',
    image: '',
    storyGenreId: null
  }
  authorIdModel.value = []
  chapterAddModel.value = []
  chapterStore.handleResetChapterModel()
  formAddStoryRef.value.reset()
}

const handleRegistStory = () => {
  let request = buildRequestStory()
  if (mode.value === ADD_MODE) {
    const langCodes = {
      404: i18n.t('message.000011', ['Thể loại']),
      405: i18n.t('message.000011', ['Tác giả']),
    }
    uploadStoryRepository.uploadStory(request, langCodes)
      .then(response => {
        clearFormData()
      })
  } else if (mode.value === EDIT_MODE) {
    uploadStoryRepository.updateStory(storyEdit.value as number, request)
      .then(response => {
        clearFormData()
      })
  }
}


</script>
<template>
  <nguyen-popup-register-chapter></nguyen-popup-register-chapter>
  <div style="margin-bottom: 50px">
    <div class="my-2">
      <v-icon icon="mdi-magnify"></v-icon>
      <span>Search truyện</span>
    </div>
    <v-divider class="mb-6"></v-divider>
    <div>
      <v-form
        ref="searchConditionForm"
      >
        <nguyen-text-field
          v-model.trim="searchConditionGroup.storyName"
          label="Tên truyện"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
        ></nguyen-text-field>
        <nguyen-text-field
          v-model.trim="searchConditionGroup.authorName"
          label="Tên tác giả"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
        ></nguyen-text-field>
        <div class="d-flex justify-center mb-12 mt-6">
          <v-btn
            style="background-color: #43A047; width: 140px"
            @click="handleSearchStory"
          >
            Search
          </v-btn>
        </div>
      </v-form>
      <nguyen-data-table
        :headers="headersFixed"
        :height="400"
        :items="items ?? []"
      >
        <template #item.rating="{ item }">
          <div style="display: flex; justify-content: center; align-items: center">
            <v-rating
              :model-value="item?.rating"
              :disabled="true"
              color="#F9A825"
              class="v-rating-collapse--size"
              half-increments
            ></v-rating>
          </div>
        </template>
        <template #item.edit="{ item }">
          <div
            style="cursor: pointer; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 1px"
            class="edit-story-icon"
            @click="() => handleEditStory(item?.storyId)"
          >
            <v-icon icon="mdi-pencil"></v-icon>
          </div>
        </template>
      </nguyen-data-table>
      <div class="d-flex justify-end mt-8 mb-8">
        <v-btn
          class="bg-light-blue-lighten-1"
          @click="handleClickAddStory"
        >
          Add story
        </v-btn>
      </div>
      <v-divider class="mb-6"></v-divider>

      <!--      add story-->
      <div>
        <v-form
          ref="formAddStoryRef"
        >
          <div style="display: flex">
            <div>
              <nguyen-select
                v-model="authorIdModel"
                label-select="Tên tác giả"
                density="compact"
                width="500px"
                item-title="authorName"
                item-value="authorId"
                :disabled="mode == VIEW_MODE"
                :items="authorSelect ?? []"
                :multiple="true"
                :text-field-width="500"
                :horizontal="true"
                :rules="[
                  (value) => validation.required(value, 'Tên tác giả')
                ]"
              ></nguyen-select>
              <nguyen-text-field
                v-model.trim="storyInfoModel.storyName"
                label="Tên truyện"
                density="compact"
                width="36"
                :disabled="mode == VIEW_MODE"
                :text-field-width="500"
                :horizontal="true"
                :rules="[
                  (value) => validation.required(value, 'Tên truyện')
                ]"
              ></nguyen-text-field>
              <nguyen-date-picker
                v-model.trim="storyInfoModel.releaseDate"
                label="Release Date"
                horizontal
                :disabled="mode == VIEW_MODE"
                :label-width="150"
                :text-field-width="500"
                :date-picker-width="500"
                :rules="[
                 (value) => validation.required(value, 'Release Date')
                ]"
              >
              </nguyen-date-picker>
              <nguyen-select
                v-model="storyInfoModel.storyGenreId"
                label-select="Thể loại"
                density="compact"
                width="500px"
                item-title="storyGenreName"
                item-value="storyGenreId"
                :disabled="mode == VIEW_MODE"
                :items="storyGenreSelect ?? []"
                :text-field-width="500"
                :horizontal="true"
                :rules="[
                  (value) => validation.required(value, 'Thể loại')
                ]"
              ></nguyen-select>
            </div>
            <div style="margin-left: 200px">
              <nguyen-upload-image
                @upload-image="storyInfoModel.image = $event"
                width-image="150"
                height-image="180"
                :url-image="storyInfoModel.image"
                :disabled="mode == VIEW_MODE"
              ></nguyen-upload-image>
            </div>
          </div>
          <nguyen-text-area
            v-model.trim="storyInfoModel.description"
            label="Mô tả truyện"
            :disabled="mode == VIEW_MODE"
            :rows="4"
            :max-length="2000"
            :rules="[
            (value) => validation.required(value, 'Mô tả truyện'),
            (value) => validation.lengthMax(value, 2000, 'Mô tả truyện'),
            (value) => validation.lengthMin(value, 100, 'Mô tả truyện')
          ]"
          >
          </nguyen-text-area>
        </v-form>
        <div style="margin-top: 30px">
          <div style="display: flex; justify-content: right; margin-bottom: 10px">
            <v-btn
              variant="elevated"
              class="bg-light-green-accent-3"
              :disabled="mode == VIEW_MODE"
              @click="handleAddChapter"
            >
              Add Chapter
            </v-btn>
          </div>
          <div>
            <nguyen-data-table
              :headers="headersChapter"
              :items="chapterAddModel"
            >
              <template #item.statusKey="{ item }">
                <div>
                  <v-icon v-if="item?.statusKey === 1" icon="mdi-lock-alert-outline"></v-icon>
                  <v-icon v-else icon="mdi-lock-open-outline"></v-icon>
                </div>
              </template>
              <template #item.edit="{ item, index }">
                <div
                  style="cursor: pointer; display: flex; justify-content: center; align-items: center; border-radius: 1px"
                  @click="() => handleEditChapterItem(index)"
                >
                  <v-icon icon="mdi-pencil" color="#42A5F5" style="cursor: pointer"></v-icon>
                </div>
              </template>
              <template #item.delete="{ item }">
                <div
                  style="cursor: pointer; display: flex; justify-content: center; align-items: center; border-radius: 1px">
                  <v-icon icon="mdi-delete" color="#E53935" style="cursor: pointer"></v-icon>
                </div>
              </template>
            </nguyen-data-table>
          </div>
        </div>
      </div>
    </div>
    <nguyen-footer class="w-100 d-flex justify-center align-center"
                   style="background-color: rgba(0, 0, 0, 0.3); height: 50px; position: fixed; bottom: 0; z-index: 200; left: 0;">
      <div class="d-flex align-center justify-center flex-row">
        <v-btn
          :disabled="mode === VIEW_MODE"
          height="36"
          width="140"
          color="error"
          variant="flat"
          class="mx-1"
        >
          <template #prepend>
            <v-icon :color="'white'">
              mdi-close-circle
            </v-icon>
          </template>
          <span class="text-white">CANCEL</span>
        </v-btn>
        <v-btn
          :disabled="mode === VIEW_MODE"
          height="36"
          width="140"
          color="success"
          variant="flat"
          class="mx-1"
          @click="handleRegistStory"
        >
          <template #prepend>
            <v-icon :color="'white'">
              mdi-check-circle
            </v-icon>
          </template>
          <span class="text-white">REGIST</span>
        </v-btn>
      </div>
    </nguyen-footer>
  </div>
</template>

<style>
.edit-story-icon:hover {
  background-color: #81C784;
}

.v-rating-collapse--size label {
  width: 22px;
}
</style>