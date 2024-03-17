<script setup lang="ts">
import NguyenCategory from "~/components/ui/NguyenCategory.vue";
import homeRepository from "~/repositories/master/homeRepository";
import { showDialogStore } from "~/stores/showDialogStore";
import { DateHelper } from "~/common/helper";

interface IStory {
  createTimestamp: string;
  creator: string;
  deleteFlg: number;
  description: string;
  followNumber: number;
  image: string;
  likeNumber: number;
  status: number;
  storyName: string;
  story_id: number;
  updateTimestamp: string;
  updater: string;
  versionNo: number;
}

interface IStoryNewUpdate {
  total: number,
  storyEntities: IStory[]
}

const useShow = showDialogStore()
const page = ref<number>(1)
const slideGroupItem = ref<IStory[] | null>(null)
const storyNewUpdate = ref<IStoryNewUpdate | null>(null)
const totalPaging = ref<number>(0)
const getStoryNewUpdate = ref<IStory[] | null>(null)

const pagingRequest = {
  pageNum: page.value,
  pageSize: 21,
}

onMounted(() => {
  Promise.all([
    homeRepository.getStoryHot(),
    homeRepository.getStoryNewUpdate(pagingRequest, {})
  ])
    .then((response) => {
      slideGroupItem.value = response[0] as IStory[]
      storyNewUpdate.value = response[1] as IStoryNewUpdate
      totalPaging.value = Math.ceil(storyNewUpdate.value.total / pagingRequest.pageSize)
      getStoryNewUpdate.value = storyNewUpdate.value.storyEntities
    })
})

const handleDateAge = (date: Date) => {
  return DateHelper.numberDayAge(date)
}

watch(page, () => {
  pagingRequest.pageNum = page.value
  homeRepository.getStoryNewUpdate(pagingRequest, {})
    .then((response) => {
      storyNewUpdate.value = response as IStoryNewUpdate
      totalPaging.value = Math.ceil(storyNewUpdate.value.total / pagingRequest.pageSize)
      getStoryNewUpdate.value = storyNewUpdate.value.storyEntities
    })
})

</script>
<template>
  <div style="max-width: 1500px; margin: auto; margin-top: -60px;">
    <v-carousel
      show-arrows="hover"
      :interval="3000"
      cycle
      style="height: 400px; border-radius: 6px; margin-bottom: 50px">
      <v-carousel-item
        src="https://tiki.vn/blog/wp-content/uploads/2023/08/thumb-22.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://t3.ftcdn.net/jpg/04/49/19/08/360_F_449190831_i2whvIQdDIGtuIVWT6QfenWwmRApVJ5l.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://img.jagranjosh.com/images/2023/September/1492023/strong-anime.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>
    <div>
      <div style="color: #C62828; font-size: 20px; font-weight: 600; margin-bottom: 20px">
        <v-icon icon="mdi-star-circle"></v-icon>
        <span style="margin-left: 14px">{{ $t('page.home.goodStory') }}</span>
      </div>
      <v-sheet
        class="mx-auto"
        elevation="1"
        max-width="1500"
      >
        <v-slide-group
          class="pa-4"
          selected-class="bg-success"
          mandatory
          show-arrows
        >
          <v-slide-group-item
            v-for="(slide, index) in slideGroupItem"
            :key="index"
            v-slot="{ isSelected, toggle, selectedClass }"
            class="mx-6"
          >
            <nguyen-category
              :src="slide.image"
              :title="slide.storyName"
              :posting-time="handleDateAge(slide.updateTimestamp) == 0 ? $t('page.home.storyCard.newUpdate') : handleDateAge(slide.updateTimestamp).toString() + $t('page.home.storyCard.dayAgo')"
              :status="slide.status"
              chapter="99"
              class="ma-4"
            >
            </nguyen-category>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
    <div>
      <div style="color: #1976D2; font-size: 20px; font-weight: 600; margin-bottom: 20px; margin-top: 50px">
        <v-icon icon="mdi-star-circle"></v-icon>
        <span style="margin-left: 14px">{{ $t('page.home.updateStory') }}</span>
      </div>
      <div class="d-flex flex-wrap justify-start ga-10">
        <nguyen-category
          v-for="(storyNew, index) in getStoryNewUpdate"
          chapter="99"
          :src="storyNew.image"
          :title="storyNew.storyName"
          :posting-time="handleDateAge(storyNew.updateTimestamp) == 0 ? $t('page.home.storyCard.newUpdate') : handleDateAge(storyNew.updateTimestamp).toString() + $t('page.home.storyCard.dayAgo')"
          :status="storyNew.status"
          :key="index"
        >
        </nguyen-category>
      </div>
    </div>
  </div>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="totalPaging"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<style scoped>

</style>