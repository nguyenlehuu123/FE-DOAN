<script setup lang="ts">
import NguyenHyperLink from "~/components/ui/NguyenHyperLink.vue";
import { showDialogStore } from "~/stores/showDialogStore";
import { userStore } from "~/stores/useStore";
import { useI18n } from "vue-i18n";
import { matchSorter } from 'match-sorter'
import homeRepository from "~/repositories/master/homeRepository";
import loginRepository from "~/repositories/master/loginRepository";

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

interface ISearchStory {
  storyId: number;
  storyName: string;
  imageStory: string;
  nameAuthor: string;
}

const searchAllStory = ref<ISearchStory[] | null>(null)
const items = ref<ISearchStory[]>()

const language = [
  'English',
  'Tiếng việt'
]

const optionHeaderField = ref<OptionHeaderI[]>([])
const i18n = useI18n()
const selectedLanguage = ref<number>()
const tabs = ref<number>(1)
const toggleMode = defineModel('toggleMode')
const showDialog = showDialogStore()
const userStoreLocal = userStore()

const handleSetting = () => {
  // TODO
}

const handleLogout = () => {
  loginRepository.logout()
    .then(() => {
      userStoreLocal.updateUserInfo({})
      userStoreLocal.updateAuthorization('')
      userStoreLocal.updateUserRole('')
      navigateTo('/home')
    })
}

const menuInfo = ref([{
  prependIcon: 'mdi-cog-outline',
  title: 'page.home.info.setting',
  handle: handleSetting,
},
  {
    prependIcon: 'mdi-logout',
    title: 'page.home.info.logout',
    handle: handleLogout
  },])

const computedMenuInfo = computed(() => {
  return menuInfo.value.map(item => {
    return {
      ...item,
      title: i18n.t(item.title),
    };
  });
});


const handleInfoMenu = (index: number) => {
  computedMenuInfo.value.forEach((item, i) => {
    if (i == index) {
      item.handle()
    }
  })
}

const handleChangeTextSearch = (event: string): void => {
  items.value = matchSorter(searchAllStory.value as ISearchStory[], event, { keys: ['storyName', 'nameAuthor'] }).slice(0, 10)
}

onMounted(() => {
  Promise.all([
    homeRepository.getOptionsHeader({}, {}),
    homeRepository.searchAllStory()
  ])
    .then((response) => {
      optionHeaderField.value = response[0] as OptionHeaderI[]
      searchAllStory.value = response[1] as ISearchStory[]
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
        style="margin-left: 60px"
      ></v-img>
    </template>
    <v-app-bar-title>TRUYENVV</v-app-bar-title>
    <v-autocomplete
      :items="items"
      density="comfortable"
      menu-icon=""
      :placeholder="$t('page.home.searchPlaceHolder')"
      prepend-inner-icon="mdi-magnify"
      rounded
      theme="light"
      variant="solo"
      item-title="storyName"
      :focused="true"
      :hide-no-data="true"
      style="width: 300px; margin-top: 20px; margin-left: 50px;"
      class="v-focus--border-color"
      @update:search="handleChangeTextSearch"
    >
      <template v-slot:item="{ props, item }">
        <v-card style="display: flex; cursor: pointer" @click="() => navigateTo(`manga-detail/${item.raw.storyId}`)">
          <v-img
            :src="item.raw.imageStory"
            max-height="120"
            max-width="80"
            cover
          ></v-img>
          <div>
            <v-card-title style="font-size: 16px; font-weight: 600; max-width: 560px">
              {{ item.raw.storyName ? item.raw.storyName : '' }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.raw.nameAuthor ? item.raw.nameAuthor : '' }}
            </v-card-subtitle>
          </div>
        </v-card>
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
          style="width: 140px; top: 10px; left: -44px"
        >
          <v-list
            density="compact"
            class="d-flex flex-column ga-1"
          >
            <v-list-subheader style="display: flex; justify-content: center">
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
      <div style="width: 140px">
        <v-btn
          v-if="!userStoreLocal.getAuthorization"
          variant="outlined"
          style="color: #0071C1; width: 140px"
          @click="handleShowDialogLogin"
        >
          {{ $t('page.home.login') }}
          <v-icon icon="mdi-login"></v-icon>
        </v-btn>
        <div v-else class="d-flex justify-space-around">
          <v-divider vertical></v-divider>
          <v-avatar style="cursor: pointer; border: 2px #E6EE9C solid" id="menu-info">
            <v-img
              :src="userStoreLocal.getUserInfo.avatar ? userStoreLocal.getUserInfo.avatar : 'data:image/jpeg;base64,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'"
            ></v-img>
          </v-avatar>
          <v-menu
            activator="#menu-info"
          >
            <v-card style="top: 14px; width: 261px; max-height: 510px">
              <div>
                <div style="background-color: #eeeeee; height: 88px"></div>
                <div style="height: 112px; display: flex; justify-content: center; margin-top: -40px">
                  <v-avatar style="cursor: pointer; border: 2px #E6EE9C solid; width: 80px; height: 80px"
                            id="menu-info">
                    <v-img
                      :src="userStoreLocal.getUserInfo.avatar ? userStoreLocal.getUserInfo.avatar : 'data:image/jpeg;base64,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'"
                    ></v-img>
                  </v-avatar>
                </div>
              </div>
              <v-divider></v-divider>
              <v-list>
                <v-list-item
                  style="width: 90%; height: 12px; border-radius: 8px"
                  class="mx-auto"
                  v-for="(item, index) in computedMenuInfo"
                  :key="index"
                  :value="index"
                  @click="() => handleInfoMenu(index)"
                >
                  <template #prepend>
                    <v-icon :icon="item.prependIcon"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
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