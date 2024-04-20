<script setup lang="ts">
import homeRepository from "~/repositories/master/homeRepository";
import NguyenCategory from "~/components/ui/NguyenCategory.vue";


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
  storyId: number;
  updateTimestamp: string;
  updater: string;
  versionNo: number;
  storyGenreEntity: IStoryGenre
}

interface IStoryGenre {
  storyGenreId: number,
  storyGenreName: string,
  description: string,
}

interface IStoryPage {
  total: number,
  storyEntities: IStory[]
}


const { storyGenreId } = useRoute().params
const totalPaging = ref<number>(0)
const page = ref<number>(1)
const storyPage = ref<IStory[]>([] as IStory[])
const storyGenre = ref<IStoryGenre>({
  storyGenreId: -1,
  storyGenreName: '',
  description: '',
})
const pagingRequest = {
  pageNum: page.value,
  pageSize: 21,
}

onMounted(() => {
  homeRepository.getStoryGenre({ storyGenreId: Number(storyGenreId) }, pagingRequest, {})
    .then((response: unknown) => {
      storyPage.value = (response as IStoryPage).storyEntities
      totalPaging.value = Math.ceil((response as IStoryPage).total / pagingRequest.pageSize)
      storyGenre.value = storyPage.value[0].storyGenreEntity
    })
})
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; gap: 20px; color: #4FC3F7">
      <v-icon icon="mdi-flag-variant"></v-icon>
      <span style="font-size: 24px">Truyện {{ storyGenre.storyGenreName }}</span>
    </div>
    <div style="margin-top: 20px">
      <v-card>
        <v-card-text>
          {{ storyGenre.description }}
        </v-card-text>
      </v-card>
    </div>
    <div style="margin-top: 60px">
      <div class="d-flex flex-wrap justify-start ga-10">
        <nguyen-category
          v-for="(storyGenre, index) in storyPage"
          chapter="99"
          :src="storyGenre.image"
          :title="storyGenre.storyName"
          :posting-time="storyGenre.updateTimestamp"
          :status="storyGenre.status"
          :key="index"
          :story-id="storyGenre.storyId"
        >
        </nguyen-category>
      </div>
    </div>
    <div>
      <v-pagination
        v-model="page"
        :length="totalPaging"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>

</style>
