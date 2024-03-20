<script setup lang="ts">
import NguyenHyperLink from "~/components/ui/NguyenHyperLink.vue";
import { showDialogStore } from "~/stores/showDialogStore";
import { useI18n } from "vue-i18n";
import homeRepository from "~/repositories/master/homeRepository";

interface OptionHeaderI {
  optionHeaderId: number,
  title: string,
  orderSort: number,
  icon: string | null,
  link: string | null,
  optionCategoryEntities: OptionCategoryEntityI[] | null
}

interface OptionCategoryEntityI {
  optionCategoryId: number,
  categoryName: string,
  linkCategory: string
}

const items = ref([{
  prependIcon: 'mdi-clock-outline',
  title: 'recipe with chicken',
},
  {
    prependIcon: 'mdi-clock-outline',
    title: 'best hiking trails near me',
  },])

const language = [
  'English',
  'Tiếng việt'
]

const optionHeaderField = ref<OptionHeaderI[]>([])
const i18n = useI18n()
const selectedLanguage = ref<number>()
const tabs = ref<number>(1)
const model = defineModel()
const toggleMode = defineModel('toggleMode')
const inputRef = ref()
const showDialog = showDialogStore()

const handleChangeTextSearch = (event: Event): void => {
  const target = event.target as HTMLInputElement
  model.value = target.value
}

onMounted(() => {
  Promise.all([
    homeRepository.getOptionsHeader({}, {})
  ])
    .then((response) => {
      optionHeaderField.value = response[0] as OptionHeaderI[]
    })
})

const handleShowDialogLogin = () => {
  showDialog.handleToggleShowDialogLogin()
}
const handleToggleLanguage = (i: number) => {
  selectedLanguage.value = i
  if (i === 0) {
    i18n.locale.value = 'en'
  }
  if (i === 1) {
    i18n.locale.value = 'vi'
  }
}


</script>
<template>
  <v-app-bar
    class="d-flex align-center"
    :absolute="true"
  >
    <template #prepend>
      <v-img
        :width="40"
        cover
        src="https://st.truyenqqvn.com/template/frontend/images/logo-icon.png"
        style="margin-left: 20px"
      ></v-img>
    </template>
    <v-app-bar-title>TRUYENVV</v-app-bar-title>
    <v-autocomplete
      v-model="model"
      :items="items"
      append-inner-icon="mdi-microphone"
      density="comfortable"
      item-props
      menu-icon=""
      :placeholder="$t('page.home.searchPlaceHolder')"
      prepend-inner-icon="mdi-magnify"
      rounded
      auto-select-first
      theme="light"
      variant="solo"
      :focused="true"
      :hide-no-data="true"
      style="width: 300px; margin-top: 20px; margin-left: 50px;"
      class="v-focus--border-color"
      ref="inputRef"
      @change="handleChangeTextSearch"
    >
      <template #item="{ props, item }">
        <v-list-item
          v-bind="props"
          :title="item.title"
          :height="10"
        ></v-list-item>
      </template>
    </v-autocomplete>
    <v-spacer></v-spacer>
    <template #append>
      <v-btn icon>
        <v-icon icon="mdi-bell"></v-icon>
      </v-btn>
      <v-btn
        icon
        id="menu-activator"
      >
        <v-icon icon="mdi-translate"></v-icon>
      </v-btn>
      <v-menu
        activator="#menu-activator"
        transition="scale-transition"
      >
        <v-card
          style="width: 140px"
        >
          <v-list
            density="compact"
            class="d-flex flex-column ga-1"
          >
            <v-list-subheader>
              Translations
            </v-list-subheader>
            <v-list-item
              v-for="(item, i) in language"
              class="select-language-common"
              :key="i"
              :value="i"
              :color="i === selectedLanguage ? '#2196F3' : ''"
              :class="`${i === selectedLanguage ? 'select-language' : ''}`"
              @click="() => {handleToggleLanguage(i)}"
            >
              <v-list-item-title v-text="item" style="font-size: 14px"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <v-switch
        v-model="toggleMode"
        hide-details
        true-icon="mdi-moon-waxing-crescent"
        false-icon="mdi-weather-sunny"
        inset
      >
        <v-icon append-icon="mdi-moon-waxing-crescent"></v-icon>
      </v-switch>
      <v-spacer style="margin-right: 20px"></v-spacer>
      <v-btn
        variant="outlined"
        style="color: #0071C1; width: 140px"
        @click="handleShowDialogLogin"
      >
        {{ $t('page.home.login') }}
        <v-icon icon="mdi-login"></v-icon>
      </v-btn>
    </template>
  </v-app-bar>
  <div>
    <v-tabs
      v-model="tabs"
      bg-color="indigo-lighten-2"
      fixed-tabs
      style="margin-top: 64px; height: 50px"
    >
      <v-tab
        v-for="(optionHeader, index) in optionHeaderField"
        :key="index"
        :value="index"
        :to="optionHeader.link"
      >
        {{ optionHeader.title }}
        <v-icon v-if="optionHeader.icon" end>
          {{ optionHeader.icon }}
        </v-icon>
      </v-tab>
    </v-tabs>
  </div>
  <v-window
    style="position: relative; z-index: 200"
    v-model="tabs"
  >
    <v-window-item
      v-for="(optionHeader, index) in optionHeaderField"
      :key="index"
      :value="index"
    >
      <v-card
        class="w-100"
        variant="elevated"
        rounded="0"
        v-if="optionHeader?.optionCategoryEntities !== []"
      >
        <div
          class="d-flex justify-center align-center w-66 mx-auto flex-wrap"
        >
          <div
            style="height: 50px; width: 100px"
            class="option-category-div mx-6"
            v-for="(category, index) in optionHeader?.optionCategoryEntities" :key="index"
          >
            <nguyen-hyper-link :to="category.linkCategory">
              <span style="font-size: 16px" class="d-block my-3">{{ category.categoryName }}</span>
            </nguyen-hyper-link>
          </div>
        </div>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<style scoped lang="scss">
.select-language {
  background-color: #90CAF9;
  color: #1565C0;
}

.select-language-common {
  font-size: 4px;
  width: 90%;
  margin: auto;
  padding: 0;
  border-radius: 8px;
  text-align: center
}

.v-list-item {
  height: 12px !important;
}

.option-category-div {
  cursor: pointer;
}
</style>