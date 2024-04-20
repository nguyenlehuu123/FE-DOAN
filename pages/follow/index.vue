<script setup lang="ts">
import NguyenCategory from "~/components/ui/NguyenCategory.vue";
import followRepository from "~/repositories/master/followRepository";
import { DateHelper } from "~/common/helper";
import NguyenFooterPage from "~/components/ui/NguyenFooterPage.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";


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
  authorEntities: IAuthor[],
  chapterEntities: IChapterData[]
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
}

const storyFollow = ref<IStory[] | null>(null)

onMounted(() => {
  followRepository.getStoryFollowed()
    .then((response) => {
      storyFollow.value = response as IStory[]
    })
})
</script>
<template>
  <div class="d-flex ga-6 mt-8">
    <nguyen-category
      v-for="(storyItem, index) in storyFollow"
      :key="index"
      :src="storyItem.image"
      :title="storyItem.storyName"
      :posting-time="storyItem.updateTimestamp"
      :status="storyItem.status"
      :story-id="storyItem.storyId"
      chapter="99"
    >
    </nguyen-category>
  </div>
  <div>
    <nguyen-footer>
      <nguyen-footer-page></nguyen-footer-page>
    </nguyen-footer>
  </div>
</template>

<style scoped>

</style>
