<script setup lang="ts">
import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import validation from "~/common/validation";
import NguyenDatePicker from "~/components/ui/NguyenDatePicker.vue";
import NguyenFooter from "~/components/ui/NguyenFooter.vue";
import { useI18n } from "vue-i18n";
import authorInfoRepository from "~/repositories/master/authorInfoRepository";
import { TOAST_TYPE } from "~/common/constant";
import toast from "~/common/toast";
import { computed } from "#imports";
import { dialogConfirmStore } from "#imports";
import { useDraftingStore } from "~/stores/draftingStore";
import { DateHelper } from "~/common/helper";
import { useRoute } from 'vue-router'

interface IAuthor {
  authorId: number | null;
  name: string | null;
  pseudonym: string | null;
  address: string | null;
  phone: string | null;
  email: string;
  dateOfBirth: string | null;
}

const i18n = useI18n()
const emailInput = ref<string>('')
const route = useRoute()
const author = ref<IAuthor>({
  authorId: null,
  name: null,
  pseudonym: null,
  address: null,
  phone: null,
  email: '',
  dateOfBirth: null
} as IAuthor)
const formAuthorInfo = ref()
const formEmail = ref()
const ADD_MODE = 1
const mode = ref(0)
const dialogConfirm = dialogConfirmStore()
const draftingStore = useDraftingStore()
const drafting = computed(
  {
    get() {
      return draftingStore.getDrafting
    },
    set(value: boolean) {
      draftingStore.updateDrafting(value)
    }
  }
)

onMounted(() => {
  emailInput.value = route.query.email as string
  if (emailInput.value) {
    handleSearchEmail()
  }
})

const handleSearchEmail = async () => {
  const { valid } = await formEmail.value.validate()

  if (!valid) {
    return
  }
  authorInfoRepository.getAuthorInfo({ email: emailInput.value })
    .then((response) => {
      author.value = response as IAuthor
      author.value.dateOfBirth = DateHelper.formatDateMMDDYYYY(author.value.dateOfBirth as string)
      mode.value = ADD_MODE
      drafting.value = true
    })
    .catch(error => {
    })
}

const handleRegisterAuthor = async () => {
  const { valid } = await formAuthorInfo.value.validate()

  if (!valid) {
    return
  }

  authorInfoRepository.saveAuthorInfo(author.value)
    .then(() => {
      toast.showManual(i18n.t('message.000017'), TOAST_TYPE.SUCCESS)
      clearFormData()
    })
    .catch(error => {
    })
}

const clearFormData = () => {
  author.value = {
    authorId: null,
    name: null,
    pseudonym: null,
    address: null,
    phone: null,
    email: '',
    dateOfBirth: null
  }
  emailInput.value = ''
  mode.value = 0
  formAuthorInfo.value.reset()
}

const handleCancel = () => {
  if (drafting.value) {
    dialogConfirm.setConfirmResolve(clearFormData)
    dialogConfirm.setContentMessage(i18n.t('message.000013'))
    dialogConfirm.setShow(true)
  }
}
</script>

<template>
  <div style="margin-top: 200px">
    <v-form
      ref="formEmail"
    >
      <nguyen-text-field
        v-model.trim="emailInput"
        label="Email"
        density="compact"
        width="36"
        :text-field-width="500"
        :horizontal="true"
        :rules="[
            (value) => validation.emailPattern(value, 'Email')
          ]"
      ></nguyen-text-field>

      <div class="d-flex justify-center mb-12 mt-6">
        <v-btn
          style="background-color: #43A047; width: 140px"
          @click="handleSearchEmail"
        >
          {{ $t('page.uploadStory.search') }}
        </v-btn>
      </div>
    </v-form>

    <div class="my-8">
      <span style="font-weight: 600; font-size: 18px">{{ $t('page.userManagement.authorInformation') }}</span>
      <v-divider></v-divider>
    </div>

    <div>
      <v-form
        ref="formAuthorInfo"
      >
        <nguyen-text-field
          v-model.trim="author.email"
          :disabled="true"
          label="Email"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
          :rules="[
            (value) => validation.emailPattern(value, 'Email'),
            (value) => validation.required(value, 'Email')
          ]"
          @input="drafting = true"
        ></nguyen-text-field>
        <nguyen-text-field
          v-model.trim="author.name"
          :disabled="mode !== ADD_MODE"
          label="Tên tác giả"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
          :rules="[
                 (value) => validation.required(value, 'Release Date')
                ]"
          @input="drafting = true"
        ></nguyen-text-field>
        <nguyen-text-field
          v-model.trim="author.pseudonym"
          :disabled="mode !== ADD_MODE"
          label="Bút danh"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
          :rules="[
                 (value) => validation.required(value, 'Release Date')
                ]"
          @input="drafting = true"
        ></nguyen-text-field>
        <nguyen-date-picker
          v-model="author.dateOfBirth"
          :disabled="mode !== ADD_MODE"
          horizontal
          label="Ngày sinh"
          :label-width="150"
          :text-field-width="500"
          :date-picker-width="500"
          :rules="[
                 (value) => validation.required(value, 'Release Date')
                ]"
          @input="drafting = true"
        >
        </nguyen-date-picker>
        <nguyen-text-field
          v-model.trim="author.phone"
          :disabled="mode !== ADD_MODE"
          label="Số điện thoại"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
          :rules="[
                 (value) => validation.required(value, 'Số điện thoại')
                ]"
          @input="drafting = true"
        ></nguyen-text-field>
        <nguyen-text-field
          v-model.trim="author.address"
          :disabled="mode !== ADD_MODE"
          label="Địa chỉ"
          density="compact"
          width="36"
          :text-field-width="500"
          :horizontal="true"
          :rules="[
                 (value) => validation.required(value, 'Số điện thoại')
                ]"
          @input="drafting = true"
        ></nguyen-text-field>
      </v-form>
    </div>
    <nguyen-footer class="w-100 d-flex justify-center align-center"
                   style="background-color: rgba(0, 0, 0, 0.3); height: 50px; position: fixed; bottom: 0; z-index: 200; left: 0;">
      <div class="d-flex align-center justify-center flex-row">
        <v-btn
          :disabled="mode !== ADD_MODE"
          height="36"
          width="140"
          color="error"
          variant="flat"
          class="mx-1"
          @click="handleCancel"
        >
          <template #prepend>
            <v-icon :color="'white'">
              mdi-close-circle
            </v-icon>
          </template>
          <span class="text-white">{{ $t('page.uploadStory.cancel') }}</span>
        </v-btn>
        <v-btn
          :disabled="mode !== ADD_MODE"
          height="36"
          width="140"
          color="success"
          variant="flat"
          class="mx-1"
          @click="handleRegisterAuthor"
        >
          <template #prepend>
            <v-icon :color="'white'">
              mdi-check-circle
            </v-icon>
          </template>
          <span class="text-white">{{ $t('page.uploadStory.register') }}</span>
        </v-btn>
      </div>
    </nguyen-footer>

  </div>
</template>

<style scoped>

</style>