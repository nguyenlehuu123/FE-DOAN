<script setup lang="ts">
import NguyenLike from "~/components/ui/NguyenLike.vue";
import NguyenTextFieldComment from "~/components/ui/NguyenTextFieldComment.vue";
import { onMounted } from "vue";
import { DateHelper } from "~/common/helper";
import { useI18n } from "vue-i18n";
import { userStore } from "~/stores/useStore";


interface Props {
  accountName: string | null
  dayAgo: number | string | null
  textComment: string
  likeNum: number | string
  dislikeNum: number | string
  roleHeart: boolean
  srgAvatar: string
  storyId: string | number
  commentId: number | null
  parentCommentId: number | null
  totalCommentChildren: number | null
}

const props = withDefaults(defineProps<Props>(), {
  accountName: '',
  dayAgo: 0,
  textComment: '',
  likeNum: 0,
  dislikeNum: 0,
  roleHeart: false,
  srgAvatar: '',
  storyId: '',
  commentId: -1,
  parentCommentId: null,
  totalCommentChildren: null
})

const showInputFeedBack = ref<boolean>(false)
const textFeedBack = ref<string>('')
const userStoreLocal = userStore()
const i18n = useI18n()
const emit = defineEmits(['handleShowCommentChildren'])

const handleReadMore = () => {
  const textContainer = document.querySelector(`[data-id="text-container-height-${props.commentId}"]`)
  const readMoreBtn = document.querySelector(`[data-id="span-comment-${props.commentId}"]`)
  textContainer?.classList.toggle('expanded')
  if (textContainer?.classList.contains('expanded')) {
    readMoreBtn ? readMoreBtn.innerHTML = i18n.t('page.mangaDetail.collapse') : ''
  } else {
    readMoreBtn ? readMoreBtn.innerHTML = i18n.t('page.mangaDetail.readMore') : ''
  }
}

onMounted(() => {
  const item = document.querySelector(`[data-id="text-comment-${props.commentId}"]`)
  if (item && item.clientHeight <= 24) {
    const spanComment = document.querySelector(`[data-id="span-comment-${props.commentId}"]`)
    spanComment && spanComment.setAttribute("style", "display: none;");
  }
})

const handleFeedBack = (e: Event) => {
  showInputFeedBack.value = true
}

const handleShowCommentChildren = () => {
  emit('handleShowCommentChildren')
}

</script>

<template>
  <v-card
    class="mx-auto"
    flat
  >
    <template #prepend>
      <v-avatar
        style="margin-left: -14px"
        :image="props.srgAvatar"
      ></v-avatar>
    </template>
    <template #title>
      <div class="d-flex align-center">
        <h5>{{ props.accountName }}</h5>
        <span class="text-body-2 ml-2">{{ DateHelper.dateAgo(parseInt(props.dayAgo)) }}</span>
      </div>
    </template>
    <div
      :data-id="`text-container-height-${commentId}`"
      class="text-container-height mt-n3"
      style="margin-left: 56px">
        <span class="text-height"
              :data-id="`text-comment-${commentId}`"
        >
          {{ props.textComment }}
        </span>
    </div>
    <div
      style="margin-left: 56px;"
      @click="handleReadMore"
    >
      <span
        :data-id="`span-comment-${commentId}`"
        class="text-caption text-decoration-underline-read-more"
      >
        {{ $t('page.mangaDetail.readMore') }}
      </span>
    </div>
    <v-card-actions style="margin-left: 42px" class="d-flex align-center ga-2">
      <nguyen-like
        icon="mdi-thumb-up"
        :like-num="props.likeNum"
        :liked="false"
      ></nguyen-like>
      <nguyen-like
        icon="mdi-thumb-down"
        :like-num="props.dislikeNum"
        :liked="false"
      ></nguyen-like>
      <div v-if="props.roleHeart">
        <v-icon icon="mdi-cards-heart-outline" style="cursor: pointer"></v-icon>
      </div>
      <div>
        <v-btn
          rounded
          variant="plain"
          style="font-size: 12px"
          @click="handleFeedBack"
        >
          {{ $t('page.mangaDetail.feedback') }}
        </v-btn>
      </div>
    </v-card-actions>
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"></slot>
    </template>
    <div v-if="showInputFeedBack" class="show-input--feedback">
      <nguyen-text-field-comment
        :placeholder="$t('page.mangaDetail.writeFeedback')"
        :src-image="userStoreLocal.userInfo.avatar"
        :story-id="props.storyId"
        :parent-comment-id="props.parentCommentId"
        v-model="textFeedBack"
        density="compact"
        alt="Linh Nhi"
        @show-input-comment="(showInput) => showInputFeedBack = showInput"
      ></nguyen-text-field-comment>
    </div>
    <div v-if="totalCommentChildren">
      <v-btn
        prepend-icon="mdi-menu-down"
        class="btn-down-num-feedback"
        flat
        rounded
        @click="handleShowCommentChildren"
      >
        {{ totalCommentChildren }} {{ $t('page.mangaDetail.feedback') }}
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.text-container-height {
  max-height: 24px;
  width: 200px;
  overflow: hidden;
  position: relative;
}

.text-height {
  display: block;
}

.expanded {
  max-height: none;
}

.text-decoration-underline-read-more:hover {
  cursor: pointer;
  text-decoration: underline;
}

.show-input--feedback {
  margin-left: 52px;
}

.btn-down-num-feedback:hover {
  background-color: #BBDEFB;
}

.btn-down-num-feedback {
  text-transform: none;
  margin-left: 56px;
}
</style>
