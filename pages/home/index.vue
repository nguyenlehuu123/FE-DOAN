<script setup lang="ts">
import NguyenCategory from "~/components/ui/NguyenCategory.vue";
import homeRepository from "~/repositories/master/homeRepository";
import { showDialogStore } from "~/stores/showDialogStore";
import { DateHelper } from "~/common/helper";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";
import NguyenFooterPage from "~/components/ui/NguyenFooterPage.vue";

interface IReadHistoryStoryDTO {
  storyId: number;
  storyName: string;
  status: number;
  image: string;
  updateTimestamp: string;
  totalChapter: number;
}

interface IReadHistoryStoryResponse {
  total: number;
  storyEntityDTOS: IReadHistoryStoryDTO[];
}

const useShow = showDialogStore()
const page = ref<number>(1)
const slideGroupItem = ref<IReadHistoryStoryDTO[] | null>(null)
const storyNewUpdate = ref<IReadHistoryStoryResponse | null>(null)
const totalPaging = ref<number>(0)
const getStoryNewUpdate = ref<IReadHistoryStoryDTO[] | null>(null)

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
      slideGroupItem.value = response[0] as IReadHistoryStoryDTO[]
      storyNewUpdate.value = response[1] as IReadHistoryStoryResponse
      totalPaging.value = Math.ceil(storyNewUpdate.value.total / pagingRequest.pageSize)
      getStoryNewUpdate.value = storyNewUpdate.value.storyEntityDTOS
    })
})

watch(page, () => {
  pagingRequest.pageNum = page.value
  homeRepository.getStoryNewUpdate(pagingRequest, {})
    .then((response) => {
      storyNewUpdate.value = response as IReadHistoryStoryResponse
      totalPaging.value = Math.ceil(storyNewUpdate.value.total / pagingRequest.pageSize)
      getStoryNewUpdate.value = storyNewUpdate.value.storyEntityDTOS
    })
})

</script>
<template>
  <div>
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
          >
            <nguyen-category
              :src="slide.image"
              :title="slide.storyName"
              :posting-time="slide.updateTimestamp"
              :status="slide.status"
              :story-id="slide.storyId"
              :chapter="slide.totalChapter"
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
          :chapter="storyNew.totalChapter"
          :src="storyNew.image"
          :title="storyNew.storyName"
          :posting-time="storyNew.updateTimestamp"
          :status="storyNew.status"
          :key="index"
          :story-id="storyNew.storyId"
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
  <div>
    <nguyen-footer>
      <nguyen-footer-page></nguyen-footer-page>
    </nguyen-footer>
  </div>
</template>

<style scoped>
</style>
