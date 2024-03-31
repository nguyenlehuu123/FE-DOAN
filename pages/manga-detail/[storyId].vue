<script setup lang="ts">
import NguyenDataTable from "~/components/ui/NguyenDataTable.vue";
import NguyenTextFieldComment from "~/components/ui/NguyenTextFieldComment.vue";
import NguyenComment from "~/components/ui/NguyenComment.vue";
import { useI18n } from "vue-i18n";
import mangaDetailRepository from "~/repositories/master/mangaDetailRepository";
import { DateHelper } from "~/common/helper";
import followRepository from "~/repositories/master/followRepository";
import { userStore } from "~/stores/useStore";
import { dialogHttpStore } from "~/stores/dialogHttpStore";
import { onMounted, reactive } from "vue";
import { connect, disconnect, subscribe } from "~/services/websocket";

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

interface Items {
  chapterId: string,
  statusKey: number,
  viewNumber: number,
  updateTimestamp: string
}

interface ICommentResponse {
  commentId: string | number;
  message: string;
  timeComment: string;
  likeComment: number | string;
  dislikeComment: number | string;
  emailUserComment: string;
  avatar: string;
}

interface IGetCommentResponse extends ICommentResponse {
  commentResponses: ICommentResponse[]
}


const breadcrumbs = [
  {
    title: 'Trang chủ',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: ' Trục Phong Nguyệt, Dư Quân Hỉ',
    disabled: false,
    href: 'breadcrumbs_link_1',
  }
]

const i18n = useI18n()
const headersFixed = [
  {
    key: 'chapterId',
    title: i18n.t('page.mangaDetail.chapter'),
    align: 'start',
    sortable: true,
    width: '30%',
    fixed: true
  },
  {
    key: 'statusKey',
    title: i18n.t('page.mangaDetail.status'),
    align: 'start',
    sortable: false,
    width: '20%',
    fixed: true
  },
  {
    key: 'viewNumber',
    title: i18n.t('page.mangaDetail.view'),
    align: 'start',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'updateTimestamp',
    title: i18n.t('page.mangaDetail.dateSubmitted'),
    align: 'start',
    sortable: true,
    width: '30%',
    fixed: true
  },
]

const { storyId } = useRoute().params
const detailManga = ref<IStory>()
const chapterData = ref<IChapterData[] | null>(null)
const items = ref<Items[] | undefined>()
const storyFollowed = ref<IStory[] | null>(null)
const isFollow = ref<boolean>(false)
const userStoreLocal = userStore()
const dialogHttpStoreLocal = dialogHttpStore()
const getCommentResponses = reactive<IGetCommentResponse[]>([])
const messages = reactive<ICommentResponse[]>([]);
const showCommentChildren: Record<number, boolean> = reactive({})

onMounted(() => {
  Promise.all([
    mangaDetailRepository.getMangaDetail(storyId),
    mangaDetailRepository.getAllCommentMana(storyId)
  ])
    .then((response) => {
      detailManga.value = response[0] as IStory
      chapterData.value = detailManga.value.chapterEntities as IChapterData[]
      getCommentResponses.push(...response[1] as IGetCommentResponse[])
    })
    .catch((error) => {
      // TODO
    })

  userStoreLocal.getAuthorization ? followRepository.getStoryFollowed()
    .then((response) => {
      storyFollowed.value = response as IStory[]
    }) : ''
})

watch(chapterData, () => {
  if (chapterData.value) {
    items.value = chapterData.value.map((cha: IChapterData) => {
      return {
        chapterId: "Chapter " + cha.chapterId.toString(),
        statusKey: cha.statusKey,
        viewNumber: cha.viewNumber,
        updateTimestamp: DateHelper.formatDateMMDDYYYY(cha.updateTimestamp)
      }
    })
  }
})

watch(storyFollowed, () => {
  if (storyFollowed.value) {
    isFollow.value = storyFollowed.value.some((storyItem) => storyItem.storyId.toString() === storyId as string)
  }
})

function handleListNameAuthor(authors: IAuthor[]) {
  return authors?.map((author) => author.pseudonym).join(', ')
}

function handleFollowStory() {
  if (userStoreLocal.getAuthorization) {
    followRepository.followStory({ storyId: storyId as string }, {})
      .then((response) => {
        isFollow.value = true
        // TODO
      })
      .catch((error) => {
        // TODO
      })
  } else {
    dialogHttpStoreLocal.setContent(i18n.t('message.000009'))
    dialogHttpStoreLocal.setShow(true)
  }
}

function handleUnfollowStory() {
  followRepository.unfollowStory({ storyId: storyId as string }, {})
    .then(response => {
      isFollow.value = false
    })
    .catch(error => {
    })
}

function toggleCommentChildren(commentId: number) {
  showCommentChildren[commentId] = !showCommentChildren[commentId]
}

// web socket
const fetchMessage = () => {
  subscribe("/topic/story/" + storyId + "/comment", message => {
    messages.push(JSON.parse(message.body))
    console.log("messages", messages)
  })
}

onMounted(() => {
  connect().then(fetchMessage)
})

onBeforeUnmount(() => {
  disconnect()
})
</script>

<template>
  <div class="mx-auto w-66">
    <v-breadcrumbs :items="breadcrumbs" class="mt-n12" style="font-size: 14px; font-weight: 600">
      <template #divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <div class="d-flex">
      <div>
        <v-img
          width="192"
          height="250"
          cover
          loding
          :src="detailManga && detailManga.image">
        </v-img>
      </div>
      <div style="margin-left: 50px">
        <h2>{{ detailManga && detailManga.storyName }}</h2>
        <div class="d-flex align-center mt-4">
          <v-icon icon="mdi-account-star" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.author') }}</p>
          <p>{{ detailManga && handleListNameAuthor(detailManga.authorEntities) }}</p>
        </div>
        <div class="d-flex align-center mt-4">
          <v-icon icon="mdi-wifi" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.status') }}</p>
          <p>Đang Cập Nhật</p>
        </div>
        <div class="d-flex align-center mt-4">
          <v-icon icon="mdi-thumb-up" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.likes') }}</p>
          <p>{{ detailManga && detailManga.likeNumber }}</p>
        </div>
        <div class="d-flex align-center mt-4">
          <v-icon icon="mdi-heart" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.flow') }}</p>
          <p>{{ detailManga && detailManga.followNumber }}</p>
        </div>
        <div class="d-flex align-center mt-4">
          <v-icon icon="mdi-eye-arrow-left" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.view') }}</p>
          <p>34539354</p>
        </div>
        <div class="d-flex ga-6 mt-10">
          <v-btn class="bg-green-lighten-1" prepend-icon="mdi-notebook">
            {{ $t('page.mangaDetail.readBeginning') }}
          </v-btn>
          <v-btn v-if="!isFollow" class="bg-red-accent-2" prepend-icon="mdi-heart" @click="handleFollowStory()">
            {{ $t('page.mangaDetail.flow') }}
          </v-btn>
          <v-btn v-if="isFollow" class="bg-red-accent-2" prepend-icon="mdi-close" @click="handleUnfollowStory()">
            {{ $t('page.mangaDetail.unfollow') }}
          </v-btn>
          <v-btn class="bg-light-blue-accent-3" prepend-icon="mdi-thumb-up">{{ $t('page.mangaDetail.likes') }}</v-btn>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex align-center ga-6" style="color: #FF8F00">
        <v-icon icon="mdi-information-slab-circle"></v-icon>
        <h2>{{ $t('page.mangaDetail.introduce') }}</h2>
      </div>
      <div>
        {{ detailManga && detailManga.description }}
      </div>
    </div>
    <div class="mt-8" v-if="items">
      <nguyen-data-table
        :headers="headersFixed"
        :items="items"
        :height="400"
      >
        <template #item.viewNumber="{ item }">
          <div>
            <v-icon icon="mdi-eye-check-outline"></v-icon>
            <span class="mx-2">{{ item?.viewNumber }}</span>
          </div>
        </template>
        <template #item.statusKey="{ item }">
          <div>
            <v-icon v-if="item?.statusKey === 0" icon="mdi-lock-alert-outline"></v-icon>
            <v-icon v-else icon="mdi-lock-open-outline"></v-icon>
          </div>
        </template>
      </nguyen-data-table>
    </div>
    <div>
      <div class="d-flex align-center mt-8" style="color: #FF8F00">
        <v-icon icon="mdi-comment"></v-icon>
        <h3 style="margin-left: 20px">{{ $t('page.mangaDetail.comment') }}</h3>
      </div>
      <nguyen-text-field-comment
        :placeholder="$t('page.mangaDetail.writeComment')"
        :src-image="userStoreLocal.userInfo.avatar"
        :story-id="storyId"
        style="margin-top: 20px"
        density="compact"
        alt="Linh Nhi"
      ></nguyen-text-field-comment>
      <div v-for="comment in getCommentResponses" :key="comment.commentId">
        <nguyen-comment
          flat
          :account-name="comment.emailUserComment"
          :text-comment="comment.message"
          :srg-avatar="comment.avatar"
          :like-num="comment.likeComment"
          :dislike-num="comment.dislikeComment"
          :day-ago="comment.timeComment"
          :role-heart="true"
          :story-id="storyId"
          :comment-id="comment.commentId"
          :total-comment-children="comment.commentResponses.length"
          @handle-show-comment-children="args => toggleCommentChildren(comment.commentId)"
        >
        </nguyen-comment>
        <div
          v-if="showCommentChildren[comment.commentId] && comment.commentResponses && comment.commentResponses.length"
          v-for="feedback in comment.commentResponses"
          :key="feedback.commentId"
          style="margin-left: 52px"
        >
          <nguyen-comment
            flat
            :account-name="feedback.emailUserComment"
            :text-comment="feedback.message"
            :srg-avatar="feedback.avatar"
            :like-num="feedback.likeComment"
            :dislike-num="feedback.dislikeComment"
            :day-ago="feedback.timeComment"
            :role-heart="true"
            :story-id="storyId"
            :comment-id="feedback.commentId"
          >
          </nguyen-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>