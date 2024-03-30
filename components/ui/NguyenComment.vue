<script setup lang="ts">
import NguyenLike from "~/components/ui/NguyenLike.vue";
import NguyenTextFieldComment from "~/components/ui/NguyenTextFieldComment.vue";
import { onBeforeUnmount, onMounted, reactive, toRaw } from "vue";
import { connect, disconnect, subscribe } from "~/services/websocket";
import { DateHelper } from "~/common/helper";
import mangaDetailRepository from "~/repositories/master/mangaDetailRepository";

interface Props {
  roleHeart: boolean
  storyId: number | string
}

const props = withDefaults(defineProps<Props>(), {
  roleHeart: false,
  storyId: ''
})

interface ICommentResponse {
  commentId: string | number;
  message: string;
  timeComment: string; // Assuming Timestamp is converted to string
  likeComment: number | string;
  dislikeComment: number | string;
  emailUserComment: string;
  avatar: string;
}

interface IGetCommentResponse extends ICommentResponse {
  commentResponses: ICommentResponse[]
}

const showReadMore = ref<boolean>(false)
const showInputFeedBack = ref<boolean>(false)
const textFeedBack = ref<string>('')
const messages = reactive<ICommentResponse[]>([]);
const getCommentResponses = reactive<IGetCommentResponse[]>([])
const handleReadMore = () => {
  const textContainer = document.querySelector('.text-container-height')
  const readMoreBtn = document.getElementsByClassName('text-decoration-underline-read-more')
  textContainer?.classList.toggle('expanded')
  if (textContainer?.classList.contains('expanded')) {
    readMoreBtn[0].innerHTML = 'Thu gọn'
  } else {
    readMoreBtn[0].innerHTML = 'Đọc thêm'
  }
}

onMounted(() => {
  const textContainer = document.getElementsByClassName('text-container-height')
  const textSpan = document.getElementsByClassName('text-height')
  if (textSpan[0]?.clientHeight > textContainer[0]?.clientHeight) {
    showReadMore.value = true
  }
})

onMounted(() => {
  Promise.all([mangaDetailRepository.getAllCommentMana(props.storyId)])
    .then((response) => {
      getCommentResponses.push(...response[0] as IGetCommentResponse[])
    })
})

const handleFeedBack = (e: Event) => {
  showInputFeedBack.value = true
}

// web socket
const fetchMessage = () => {
  subscribe("/topic/story/" + props.storyId + "/comment", message => {
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
  <v-card
    class="mx-auto"
    flat
    v-for="comment in messages"
  >
    <template #prepend>
      <v-avatar
        style="margin-left: -14px"
        :image="comment.avatar"
      ></v-avatar>
    </template>
    <template #title>
      <div class="d-flex align-center">
        <h5>{{ comment.emailUserComment }}</h5>
        <span class="text-body-2 ml-2">{{ DateHelper.dateAgo(comment.timeComment) }}</span>
      </div>
    </template>
    <div class="text-container-height mt-n3" style="margin-left: 56px">
        <span class="text-height">
          {{ comment.message }}
        </span>
    </div>
    <div @click="handleReadMore" v-if="showReadMore">
      <span class="text-caption text-decoration-underline-read-more">{{ $t('page.mangaDetail.readMore') }}</span>
    </div>
    <v-card-actions style="margin-left: 42px" class="d-flex align-center ga-2">
      <nguyen-like
        icon="mdi-thumb-up"
        :like-num="comment.likeComment"
        :liked="false"
      ></nguyen-like>
      <nguyen-like
        icon="mdi-thumb-down"
        :like-num="comment.dislikeComment"
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
        v-model="textFeedBack"
        density="compact"
        :placeholder="$t('page.mangaDetail.writeFeedback')"
        src-image="https://i1-vnexpress.vnecdn.net/2020/11/19/lamborghini-huracan-sto-7012-1605777839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=_LK7qvQPtHWLoFWTspAb9Q"
        alt="Linh Nhi"
        :story-id="storyId"
        @show-input-comment="(showInput) => showInputFeedBack = showInput"
      ></nguyen-text-field-comment>
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
</style>
