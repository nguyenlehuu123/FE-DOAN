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
import NguyenFooterPage from "~/components/ui/NguyenFooterPage.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";

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
  urlFile: string;
  fileName: string;
  chapterNumber: number;
  releaseDate: string;
}

interface Items {
  chapterNumber: string,
  statusKey: number,
  viewNumber: number,
  releaseDate: string,
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
  subCommentId?: number | null;
}

interface IRatingOverviewResponse {
  averageRating: number;
  totalRating: number;
  totalFiveStar: number;
  totalFourStar: number;
  totalThreeStar: number;
  totalTwoStar: number;
  totalOneStar: number;
  percentFiveStar: number;
  percentFourStar: number;
  percentThreeStar: number;
  percentTwoStar: number;
  percentOneStar: number;
}

interface IGetCommentResponse extends ICommentResponse {
  commentResponses: ICommentResponse[]
}

const i18n = useI18n()
const headersFixed = [
  {
    key: 'chapterNumber',
    title: i18n.t('page.mangaDetail.chapter'),
    align: 'center',
    sortable: true,
    width: '15%',
    fixed: true
  },
  {
    key: 'statusKey',
    title: i18n.t('page.mangaDetail.status'),
    align: 'center',
    sortable: false,
    width: '15%',
    fixed: true
  },
  {
    key: 'viewNumber',
    title: i18n.t('page.mangaDetail.view'),
    align: 'center',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'releaseDate',
    title: i18n.t('page.mangaDetail.releaseDate'),
    align: 'center',
    sortable: true,
    width: '25%',
    fixed: true
  },
  {
    key: 'updateTimestamp',
    title: i18n.t('page.mangaDetail.dateSubmitted'),
    align: 'center',
    sortable: true,
    width: '25%',
    fixed: true
  },
]

const { storyId } = useRoute().params
const detailManga = ref<IStory>()
const chapterData = ref<IChapterData[] | null>(null)
const items = ref<Items[] | undefined>()
const storyFollowed = ref<IStory[] | null>(null)
const isFollow = ref<boolean>(false)
const isLike = ref<boolean>(false)
const tab = ref<number>(1)
const rating = ref<number>(0)
const userStoreLocal = userStore()
const dialogHttpStoreLocal = dialogHttpStore()
const getCommentResponses = reactive<IGetCommentResponse[]>([])
const showCommentChildren: Record<number, boolean> = reactive({})
const overviewRating = ref<IRatingOverviewResponse | null>(null)

const breadcrumbs = [
  {
    title: 'Trang chủ',
    disabled: false,
    href: '/home',
  },
  {
    title: detailManga.value?.storyName,
    disabled: false,
  }
]

onMounted(() => {
  Promise.all([
    mangaDetailRepository.getMangaDetail(storyId),
    mangaDetailRepository.getAllCommentMana(storyId),
  ])
    .then((response) => {
      detailManga.value = response[0] as IStory
      chapterData.value = detailManga.value.chapterEntities as IChapterData[]
      getCommentResponses.push(...response[1] as IGetCommentResponse[])
    })
    .catch((error) => {
      // TODO
    })

  handleReact()
})

watch(() => userStoreLocal.getAuthorization, () => {
  handleReact()
})

const handleReact = () => {
  if (userStoreLocal.getAuthorization) {
    Promise.all([
      followRepository.getStoryFollowed(),
      mangaDetailRepository.isLikeMaga(storyId),
      mangaDetailRepository.isRatingManga(storyId)
    ])
      .then((response) => {
        storyFollowed.value = response[0] as IStory[]
        isLike.value = response[1] as boolean
        rating.value = response[2] as number
      })
  }
}

watch(chapterData, () => {
  if (chapterData.value) {
    items.value = chapterData.value.map((cha: IChapterData) => {
      return {
        chapterNumber: "Chapter " + cha.chapterNumber.toString(),
        statusKey: cha.statusKey,
        viewNumber: cha.viewNumber,
        releaseDate: DateHelper.formatDateMMDDYYYY(cha.releaseDate),
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

const handleLikeStory = () => {
  if (userStoreLocal.getAuthorization) {
    mangaDetailRepository.likeMaga(storyId, {})
      .then(response => {
        isLike.value = true
        detailManga.value?.likeNumber && detailManga.value.likeNumber++
      })
      .catch(error => {
        // TODO
      })
  } else {
    dialogHttpStoreLocal.setContent(i18n.t('message.000009'))
    dialogHttpStoreLocal.setShow(true)
  }
}

const handleDisLikeStory = () => {
  mangaDetailRepository.disLikeMaga(storyId, {})
    .then(response => {
      isLike.value = false
      detailManga.value?.likeNumber && detailManga.value.likeNumber--
    })
    .catch(error => {
      // TODO
    })
}

function handleSeeGenreStory(index: number) {
  if (chapterData.value) {
    if (chapterData.value[index].statusKey === 1) {
      dialogHttpStoreLocal.setContent(i18n.t('message.000012'))
      dialogHttpStoreLocal.setShow(true)
    } else {
      const url = chapterData.value[index].urlFile;
      window.open(url, '_blank');
    }
  }
}

const handleRatingManga = (value: number) => {
  if (userStoreLocal.getAuthorization) {
    rating.value = value
    mangaDetailRepository.ratingManga(storyId, { rating: value })
      .then(response => {
        // TODO
      })
      .catch(error => {
        // TODO
      })
  } else {
    dialogHttpStoreLocal.setContent(i18n.t('message.000009'))
    dialogHttpStoreLocal.setShow(true)
  }
}

const handleShowRatingOverview = () => {
  mangaDetailRepository.overViewRatingManga(storyId)
    .then(response => {
      overviewRating.value = response as IRatingOverviewResponse
    })
    .catch(error => {
      // TODO
    })
}

function toggleCommentChildren(commentId: number) {
  showCommentChildren[commentId] = !showCommentChildren[commentId]
}

// web socket
const fetchMessage = () => {
  subscribe("/topic/story/" + storyId + "/comment", message => {
    const messageResponse: ICommentResponse = JSON.parse(message.body)
    if (messageResponse.subCommentId === null) {
      getCommentResponses.push(messageResponse as IGetCommentResponse)
    } else {
      for (let i = 0; i < getCommentResponses.length; i++) {
        if (getCommentResponses[i].commentId === messageResponse.subCommentId) {
          getCommentResponses[i].commentResponses.push(messageResponse)
        }
      }
    }
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
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-account-star" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.author') }}</p>
          <p>{{ detailManga && handleListNameAuthor(detailManga.authorEntities) }}</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-wifi" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.status') }}</p>
          <p>Đang Cập Nhật</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-update" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.releaseDate') }}</p>
          <p>{{ detailManga && DateHelper.formatDateMMDDYYYY(detailManga.releaseDate) }}</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-thumb-up" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.likes') }}</p>
          <p>{{ detailManga && detailManga.likeNumber }}</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-heart" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.flow') }}</p>
          <p>{{ detailManga && detailManga.followNumber }}</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-eye-arrow-left" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.view') }}</p>
          <p>34539354</p>
        </div>
        <div class="d-flex ga-6 mt-10">
          <v-btn
            v-if="!isFollow"
            class="bg-red-accent-2"
            style="width: 172px"
            prepend-icon="mdi-heart"
            @click="handleFollowStory()"
          >
            {{ $t('page.mangaDetail.flow') }}
          </v-btn>
          <v-btn
            v-if="isFollow"
            class="bg-red-accent-2"
            style="width: 172px"
            prepend-icon="mdi-close"
            @click="handleUnfollowStory()"
          >
            {{ $t('page.mangaDetail.unfollow') }}
          </v-btn>
          <v-btn
            v-if="!isLike"
            class="bg-light-blue-accent-3"
            style="width: 172px" prepend-icon="mdi-thumb-up"
            @click="handleLikeStory()"
          >
            {{ $t('page.mangaDetail.likes') }}
          </v-btn>
          <v-btn
            v-if="isLike"
            class="bg-light-blue-accent-3"
            style="width: 172px"
            prepend-icon="mdi-thumb-down"
            @click="handleDisLikeStory()"
          >
            {{ $t('page.mangaDetail.unlikes') }}
          </v-btn>
        </div>
        <div style="display: flex; align-items: center; margin-top: 20px">
          <div>
            <span style="font-size: 20px; font-weight: 600; color: #FF8F00">Danh gia</span>
          </div>
          <v-rating
            :v-model="rating"
            :model-value="rating"
            color="yellow-darken-3"
            half-increments
            size="x-large"
            @update:modelValue="(value) => handleRatingManga(value)"
          ></v-rating>
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
        @see-genre-story="handleSeeGenreStory"
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
            <v-icon v-if="item?.statusKey === 1" icon="mdi-lock-alert-outline"></v-icon>
            <v-icon v-else icon="mdi-lock-open-outline"></v-icon>
          </div>
        </template>
      </nguyen-data-table>
    </div>
    <div>
      <v-tabs
        v-model="tab"
        align-tabs="start"
        color="deep-purple-accent-4"
        style="display: flex; justify-content: center; margin-top: 20px; margin-bottom: 20px;"
      >
        <v-tab :value="1">
          <div class="d-flex align-center" style="color: #FF8F00">
            <v-icon icon="mdi-comment"></v-icon>
            <h3 style="margin-left: 20px">{{ $t('page.mangaDetail.comment') }}</h3>
          </div>
        </v-tab>
        <v-tab
          :value="2"
          @click="handleShowRatingOverview"
        >
          <div class="d-flex align-center" style="color: #FF8F00">
            <v-icon icon="mdi-star"></v-icon>
            <h3 style="margin-left: 20px">Rating</h3>
          </div>
        </v-tab>
      </v-tabs>
      <v-window
        v-model="tab"
      >
        <v-window-item
          :value="1"
        >
          <div>
            <nguyen-text-field-comment
              :placeholder="$t('page.mangaDetail.writeComment')"
              :src-image="userStoreLocal.userInfo.avatar"
              :story-id="storyId"
              style="margin-top: 20px"
              density="compact"
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
                :parent-comment-id="comment.commentId"
                :total-comment-children="comment.commentResponses?.length"
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
                  :parent-comment-id="comment.commentId"
                >
                </nguyen-comment>
              </div>
            </div>
          </div>
        </v-window-item>
        <v-window-item
          :value="2"
        >
          <v-card
            class="d-flex flex-column mx-auto py-8"
            flat
          >
            <div class="d-flex justify-center mt-auto text-h5 ">
              Rating overview
            </div>

            <div class="d-flex align-center flex-column my-auto">
              <div class="text-h2 mt-5">
                {{ overviewRating && overviewRating.averageRating }}
                <span class="text-h6 ml-n3">/5</span>
              </div>

              <v-rating
                :model-value="overviewRating && overviewRating.averageRating"
                color="yellow-darken-3"
                half-increments
                disabled="true"
              ></v-rating>
              <div class="px-3">{{ overviewRating && overviewRating.totalRating }} ratings</div>
            </div>

            <v-list
              bg-color="transparent"
              class="d-flex flex-column-reverse"
              density="compact"
            >
              <v-list-item v-for="(rating,i) in 5" :key="i">
                <v-progress-linear
                  :model-value="overviewRating && overviewRating['percent' + rating + 'Star']"
                  class="mx-n5"
                  color="yellow-darken-3"
                  height="20"
                  rounded
                ></v-progress-linear>

                <template v-slot:prepend>
                  <span>{{ rating }}</span>
                  <v-icon class="mx-3" icon="mdi-star"></v-icon>
                </template>

                <template v-slot:append>
                  <div class="rating-values">
                    <span class="d-flex justify-end">
                      {{ overviewRating && overviewRating['total' + rating + 'Star'] }}
                    </span>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </div>
  <div>
    <nguyen-footer>
      <nguyen-footer-page></nguyen-footer-page>
    </nguyen-footer>
  </div>
</template>

<style>
</style>