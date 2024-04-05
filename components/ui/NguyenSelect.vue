<script setup lang="ts">
const slots = useSlots()

defineOptions({
  inheritAttrs: false
})

interface Props {
  disabled: boolean
  width: string | number
  rules: Function[]
  items: any[]
  itemTitle: string
  itemValue: string
  multiple: boolean
  returnObject: boolean
  labelSelect: string
  labelSelectWidth: string | number
  horizontal: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  width: 500,
  rules: () => [],
  items: () => [],
  itemTitle: '',
  itemValue: '',
  multiple: false,
  returnObject: false,
  labelSelect: '',
  labelSelectWidth: 150,
  horizontal: false
})

const nguyenSelect = ref()
const inputModel = defineModel<string[] | number[]>()

const handleToggleAll = () => {
  if (inputModel && inputModel.value && inputModel.value.length > 0) {
    inputModel.value = []
  } else {
    inputModel.value = props.items.map(item => item[props.itemValue])
  }
}

const checkBoxModelValue = computed(() => {
  return inputModel && inputModel.value && inputModel.value.length > 0;
})

</script>

<template>
  <div
    class="py-0"
    :style="`${props.horizontal ? 'display: flex; align-items: start;' : ''}`"
  >
    <div
      v-if="props.labelSelect !== ''"
      class="py-1"
      :style="`width: ${(props.labelSelectWidth + '').replace('px', '')}px; ${(props.labelSelectWidth + '').replace('px', '')}px`"
    >
      <span>
        {{ props.labelSelect }}
        <v-icon v-if="horizontal && props.rules.toString().includes('required')" icon="mdi-hexagram"
                style="font-size: 12px; color: #EF5350"></v-icon>
      </span>
    </div>
    <div
      :style="`width: ${(width + '').replace('px', '')}px`"
    >

      <v-select
        ref="nguyenSelect"
        v-model="inputModel"
        v-bind="$attrs"
        validate-on="blur"
        variant="outlined"
        rounded="2"
        :multiple="multiple"
        :item-title="itemTitle"
        :item-value="itemValue"
        :items="items"
        :bg-color="disabled ? 'bg-disable' : ''"
        :disabled="props.disabled"
        :rules="props.rules"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
        <template #prepend-item>
          <v-list-item
            v-if="multiple"
            title="Select All"
            @click="handleToggleAll"
          >
            <template #prepend>
              <v-checkbox-btn
                :indeterminate="inputModel && inputModel.length > 0 && inputModel.length < items.length"
                :model-value="checkBoxModelValue"
                :color="inputModel && inputModel.length > 0 ? '#43A047' : ''"
              ></v-checkbox-btn>
            </template>
          </v-list-item>
          <v-divider class="mb-2"></v-divider>
        </template>
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item.title }}</span>
          </v-chip>
          <span
            v-if="index === 2"
            class="text-grey text-caption align-self-center"
          >
        (+{{ inputModel?.length - 2 }} others)
      </span>
        </template>
      </v-select>
    </div>
  </div>
</template>