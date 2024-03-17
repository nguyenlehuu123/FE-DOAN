<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

interface Props {
  icon: string
  width: number | string
  height: number | string
  size: number | string
  fontSize: number | string
  likeNum: number
  liked: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  width: 30,
  height: 30,
  size: 20,
  fontSize: 16,
  likeNum: 0,
  liked: false
})

const liked = ref<boolean>(props.liked)
const likeNumber = ref<number>(props.likeNum)

const handleIncrementLike = () => {
  if (liked.value) {
    likeNumber.value = likeNumber.value - 1
  } else {
    likeNumber.value = likeNumber.value + 1
  }
  liked.value = !liked.value
}


</script>

<template>
  <div class="d-flex align-center d-inline ga-2">
    <v-btn
      :width="`${(props.width + '').replace('px', '')}px`"
      :height="`${(props.height + '').replace('px', '')}px`"
      icon
      flat
      @click="handleIncrementLike"
    >
      <v-icon
        v-bind="$attrs"
        :size="props.size"
        :icon="props.icon"
        :color="liked ? '#FFD740' : ''"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </v-icon>
    </v-btn>
    <span
      v-if="likeNumber !== 0"
      :style="`font-size: ${(props.fontSize + '').replace('px', '')}px`">
      {{ likeNumber }}
    </span>
  </div>
</template>

<style scoped>

</style>
