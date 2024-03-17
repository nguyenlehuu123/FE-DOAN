<script setup lang="ts">
import NguyenLike from "~/components/ui/NguyenLike.vue";
import NguyenTextFieldComment from "~/components/ui/NguyenTextFieldComment.vue";

interface Props {
  accountName: string | null
  dayAgo: number | string | null
  textComment: string
  likeNum: number | string
  dislikeNum: number | string
  roleHeart: boolean
  srgAvatar: string
}

const props = withDefaults(defineProps<Props>(), {
  accountName: '',
  dayAgo: 0,
  textComment: '',
  likeNum: 0,
  dislikeNum: 0,
  roleHeart: false,
  srgAvatar: ''
})

const showReadMore = ref<boolean>(false)
const showInputFeedBack = ref<boolean>(false)
const textFeedBack = ref<string>('')
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

const handleFeedBack = (e: Event) => {
  showInputFeedBack.value = true
}

</script>

<template>
  <v-card
    class="mx-auto"
  >
    <template #prepend>
      <v-avatar
        :image="props.srgAvatar"
      ></v-avatar>
    </template>
    <template #title>
      <div class="d-flex align-center">
        <h5>{{ props.accountName }}</h5>
        <span class="text-body-2 ml-2">{{ props.dayAgo }} ngày trước</span>
      </div>
    </template>
    <div class="text-container-height mt-n3" style="margin-left: 72px">
        <span class="text-height">
          {{ props.textComment }}
        </span>
    </div>
    <div @click="handleReadMore" v-if="showReadMore">
      <span class="text-caption text-decoration-underline-read-more">Đọc thêm</span>
    </div>
    <v-card-actions style="margin-left: 60px" class="d-flex align-center ga-2">
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
          Phản hồi
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
        placeholder="Viết phản hồi..."
        src-image="https://i1-vnexpress.vnecdn.net/2020/11/19/lamborghini-huracan-sto-7012-1605777839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=_LK7qvQPtHWLoFWTspAb9Q"
        alt="Linh Nhi"
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
  margin-left: 72px;
}
</style>
