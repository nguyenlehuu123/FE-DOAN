<script setup lang="ts">
import NguyenCategory from "~/components/ui/NguyenCategory.vue";
import NguyenFooterPage from "~/components/ui/NguyenFooterPage.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";
import readHistoryRepository from "~/repositories/master/readHistoryRepository";

interface IReadHistoryStoryDTO {
  storyId: number;
  storyName: string;
  status: number;
  image: string;
  totalChapter: number;
  readAt: string;
}

interface IReadHistoryStoryResponse {
  total: number;
  readHistoryStoryDTOs: IReadHistoryStoryDTO[];
}

const readHistoryStoryResponse = ref<IReadHistoryStoryResponse | null>(null);
const page = ref<number>(1)
const totalPaging = ref<number>(0)

const pagingRequest = {
  pageNum: page.value,
  pageSize: 21,
}

onMounted(() => {

  readHistoryRepository.getReadHistory()
    .then(response => {
      readHistoryStoryResponse.value = response as IReadHistoryStoryResponse;
      totalPaging.value = Math.ceil(readHistoryStoryResponse.value.total / pagingRequest.pageSize)
    })
});

watch(page, () => {
  pagingRequest.pageNum = page.value
  readHistoryRepository.getReadHistory(pagingRequest)
    .then((response) => {
      readHistoryStoryResponse.value = response as IReadHistoryStoryResponse;
      totalPaging.value = Math.ceil(readHistoryStoryResponse.value.total / pagingRequest.pageSize)
    })
})

</script>
<template>
  <div>
    <div class="d-flex flex-wrap justify-start ga-10">
      <nguyen-category
        v-for="(item, index) in readHistoryStoryResponse?.readHistoryStoryDTOs"
        :key="index"
        :src="item.image"
        :title="item.storyName"
        :posting-time="item.readAt"
        :status="item.status"
        :chapter="item.totalChapter"
        :story-id="item.storyId"
      >
      </nguyen-category>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="totalPaging"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
  <div>
    <nguyen-footer>
      <nguyen-footer-page></nguyen-footer-page>
    </nguyen-footer>
  </div>
</template>

<style scoped>

</style>
