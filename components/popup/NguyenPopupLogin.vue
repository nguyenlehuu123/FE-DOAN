<script setup lang="ts">

import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import validation from "~/common/validation";
import NguyenHyperLink from "~/components/ui/NguyenHyperLink.vue";
import { showDialogStore } from "~/stores/showDialogStore";
import { userStore } from "~/stores/useStore";
import loginRepository from "~/repositories/master/loginRepository";
import { useI18n } from "vue-i18n";

const showDialog = showDialogStore()
const userStoreLocal = userStore()

const toggleEye = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const form = ref(null)
const valid = ref<boolean>(false)
const i18n = useI18n()

interface ILoginResponse {
  accessToken: string,
  refreshToken: string,
  expireTime: string
}

const handleShowDialogLogin = () => {
  showDialog.handleToggleShowDialogLogin()
}

const handleShowDialogRegister = () => {
  handleShowDialogLogin()
  showDialog.handleToggleShowDialogRegister()
}

const login = async () => {
  const { valid } = await form.value.validate()

  if (!valid) {
    return
  }

  const loginPayload = {
    email: email.value,
    password: password.value
  }
  const loginLangCodes = {
    404: i18n.t('message.000003', [i18n.t('page.login.fieldName.email')]),
    405: i18n.t('message.000002', [i18n.t('page.login.fieldName.password')])
  }
  loginRepository.login(loginPayload, loginLangCodes).then((loginResponse: any) => {
    console.log(loginResponse)
    userStoreLocal.updateAuthorization('Bearer ' + loginResponse.accessToken)
    handleShowDialogLogin()
  })
    .catch((error) => {
      // TODO
    })
    .finally(() => {
      // TODO
    })

}

</script>

<template>
  <v-dialog
    :model-value="showDialog.isShowDialogLogin"
    :width="500"
    :max-height="600"
    position="fixed"
    top="50%"
    left="50%"
    style="z-index: 9999"
  >
    <v-card
      flat
    >
      <v-card-title class="mx-auto" style="font-weight: bolder">{{ $t('page.login.login') }}</v-card-title>
      <v-form class="mx-auto" ref="form">
        <div class="mx-auto">
          <nguyen-text-field
            v-model="email"
            append-inner-icon="mdi-email-outline"
            :label="$t('page.login.fieldName.email') "
            density="compact"
            text-field-width="440"
            style="border-radius: 8px"
            :rules="[
            (value) => validation.required(value, $t('page.login.fieldName.email')),
            (value) => validation.emailPattern(value, $t('page.login.fieldName.email'))
          ]"
          ></nguyen-text-field>
        </div>
        <div class="mx-auto">
          <nguyen-text-field
            v-model="password"
            :label="$t('page.login.fieldName.password')"
            density="compact"
            text-field-width="440"
            style="border-radius: 8px;"
            :rules="[
            (value) => validation.required(value, $t('page.login.fieldName.password')),
            (value) => validation.lengthMin(value, 8, $t('page.login.fieldName.password')),
            (value) => validation.lengthMax(value, 16, $t('page.login.fieldName.password'))
          ]"
            :append-inner-icon="toggleEye ? 'mdi-eye' : 'mdi-eye-off'"
            :type="toggleEye ? 'text' : 'password'"
            @click:append-inner="toggleEye = !toggleEye"
          ></nguyen-text-field>
        </div>
      </v-form>
      <v-card-subtitle style="margin-left: 16px">
        <nguyen-hyper-link to="/register" @click="handleShowDialogRegister">
          {{ $t('page.login.register') }}
        </nguyen-hyper-link>
        |
        <nguyen-hyper-link to="/change-password">{{ $t('page.login.forgotPassword') }}</nguyen-hyper-link>
      </v-card-subtitle>
      <v-card-actions style="margin-left: 280px">
        <v-btn
          variant="elevated"
          class="bg-blue-darken-1"
          @click="login"
        >
          {{ $t('page.login.login') }}
        </v-btn>
        <v-btn
          variant="elevated"
          class="bg-red-darken-2"
          @click="handleShowDialogLogin"
        >
          {{ $t('page.login.cancel') }}
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <div class="d-flex justify-center ga-6 py-2">
        <v-icon icon="mdi-facebook" color="blue-accent-3" style="font-size: 50px"></v-icon>
        <v-icon icon="mdi-google" color="red" style="font-size: 50px"></v-icon>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
