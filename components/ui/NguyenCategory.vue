<script setup lang="ts">
const slots = useSlots()
definePageMeta({
  layout: false
})

interface Props {
  src: string,
  title: string,
  chapter: string | number,
  postingTime: string,
  status: number | string,
  storyId: number | string
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  title: '',
  chapter: '',
  postingTime: '',
  status: 0,
  storyId: 1
})

const fickerStatus = ref<boolean>(false)

const textStatus = computed(() => {
  if (props.status === 0) {
    return null;
  }
  if (props.status === 1) {
    return 'Hot'
  }
  if (props.status === 2) {
    return 'New'
  }
  return null
})

let clearInte: string | number | NodeJS.Timeout | undefined
onMounted(() => {
  clearInte = setInterval(() => {
    fickerStatus.value = !fickerStatus.value
  }, 500)
})

onUnmounted(() => {
  clearInterval(clearInte)
})

</script>

<template>
  <nuxt-link :to="`/manga-detail/${storyId}`" style="text-decoration: none">
    <v-card width="180" height="294" variant="text" style="cursor: pointer">
      <v-img
        width=inherit
        height="233"
        :cover="true"
        class="rounded-lg"
        loding
        :src="props.src"
      >
        <div class="d-flex mt-2 ml-2 ga-1">
          <div style="color: aliceblue; background-color: #0071C1; font-size: 12px" class="px-1 rounded-sm">
            <span>{{ postingTime }}</span>
          </div>
          <div v-if="status !== 0 && fickerStatus" style="color: aliceblue; font-size: 12px" class="px-1 rounded-sm"
               :class="`${(props.status) === 1 ? 'bg-red-darken-3' : 'bg-lime-accent-3'}`">
            <span>{{ textStatus }}</span>
          </div>
        </div>
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </v-img>
      <div class="text-center">
        <v-card-title class="font-weight-medium px-0 py-0 font-size-16" style="font-size: 16px">
          {{ title }}
        </v-card-title>
        <!--    TODO I18N-->
        <v-card-text class="py-0 text-h8 font-weight-regular" style="font-size: 12px">Chapter {{
            chapter
          }}
        </v-card-text>
      </div>
    </v-card>
  </nuxt-link>
</template>

<style scoped>

</style>
