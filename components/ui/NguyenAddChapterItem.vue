<script setup lang="ts">
import { useChapterStore } from "~/stores/chapterStore";

defineOptions({
  inheritAttrs: false
})

interface Props {
  index: number
  width?: string | number
  chapterNumber: number
  fileName: string
  urlFile: string
  status: number | string
}

const props = withDefaults(defineProps<Props>(), {
  index: -1,
  width: 1000,
  chapterNumber: 0,
  fileName: '',
  urlFile: '',
  status: 1
})

const emit = defineEmits(['edit-chapter-item'])

const chapterStore = useChapterStore()
const itemsStatus = ['Đang khóa', 'Đang mở']
const statusMenu = ref(props.status)
const chapterItemRef = ref()

const handleEditChapterItem = () => {
  emit('edit-chapter-item', props.index)
}

const handleDeleteChapterItem = () => {
  chapterStore.handleRemoveChapterModel(props.index)
}

defineExpose({
  chapterItemRef
})
</script>

<template>
  <v-card
    ref="chapterItemRef"
    :style="`width: ${(props.width + '').replace('px', '')}px`"
    v-bind="$attrs"
  >
    <div style="display: flex">
      <v-card-title>
        <v-icon icon="mdi-assistant" color="#512DA8"></v-icon>
        Chaper {{ props.chapterNumber }}
      </v-card-title>
      <v-card-text style="display: flex; justify-content: center; align-items: center; padding: 0">
        {{ props.fileName }}
      </v-card-text>
      <v-card-actions style="display: flex; gap: 40px">
        <div>
          <v-icon style="cursor: pointer" icon="mdi-chevron-double-up" color="#FDD835"></v-icon>
          <v-chip style="cursor: pointer; width: 100px" :id="`active-status-menu-${props.chapterNumber}`">
            {{ itemsStatus[statusMenu - 1] }}
          </v-chip>
          <v-menu :activator="`#active-status-menu-${props.chapterNumber}`">
            <v-list style="top: 2px; left: -10px">
              <v-list-item
                v-for="(item, index) in itemsStatus"
                :key="index"
                :value="index + 1"
                @click="statusMenu = index + 1"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div style="display: flex; gap: 10px">
          <v-icon icon="mdi-pencil" color="#42A5F5" style="cursor: pointer" @click="handleEditChapterItem"></v-icon>
          <v-icon icon="mdi-delete" color="#E53935" style="cursor: pointer" @click="handleDeleteChapterItem"></v-icon>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>
<style scoped lang="scss"></style>