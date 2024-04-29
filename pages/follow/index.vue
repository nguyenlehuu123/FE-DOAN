<script setup lang="ts">
import NguyenCategory from "~/components/ui/NguyenCategory.vue";
import followRepository from "~/repositories/master/followRepository";
import { DateHelper } from "~/common/helper";
import NguyenFooterPage from "~/components/ui/NguyenFooterPage.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";

interface IReadHistoryStoryDTO {
  storyId: number;
  storyName: string;
  status: number;
  image: string;
  updateTimestamp: string;
  totalChapter: number;
}


const storyFollow = ref<IReadHistoryStoryDTO[] | null>(null)

onMounted(() => {
  followRepository.getStoryFollowed()
    .then((response) => {
      storyFollow.value = response as IReadHistoryStoryDTO[]
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
      :chapter="storyItem.totalChapter"
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
