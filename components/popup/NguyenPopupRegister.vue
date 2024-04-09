<script setup lang="ts">

import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import validation from "~/common/validation";
import NguyenHyperLink from "~/components/ui/NguyenHyperLink.vue";
import { showDialogStore } from "~/stores/showDialogStore";
import { userStore } from "~/stores/useStore";
import sendEmailRepository from "~/repositories/master/sendEmailRepository";
import loginRepository from "~/repositories/master/loginRepository";
import { useI18n } from "vue-i18n";
import { saveTokenToCookie } from "~/common/cookie";

const showDialog = showDialogStore()
const toggleEyePassword = ref<boolean>(false)
const toggleEyePasswordConfirm = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')
const form = ref(null)
const valid = ref<boolean>(false)
const otp = ref<number | string | null>(null)
const i18n = useI18n();
const userStoreLocal = userStore()

const handleSendOtp = () => {
  sendEmailRepository.sendOtpToEmail({ email: email.value }, {})
    .then((response) => {
    })
}

const handleRegister = async () => {
  const { valid } = await form.value.validate()
  if (!valid) {
    return
  }
  const langCodes = {
    400: i18n.t('message.000004'),
    401: i18n.t('message.000007'),
    402: i18n.t('message.000006', ['OTP']),
    404: i18n.t('message.000005', ['OTP'])
  }
  loginRepository.register(
    {
      email: email.value,
      password: password.value,
      otp: otp.value
    }, langCodes)
    .then((registerResponse: any) => {
      userStoreLocal.updateAuthorization('Bearer ' + registerResponse.accessToken)
      userStoreLocal.updateUserRole(registerResponse.role)
      userStoreLocal.updateUserInfo({
        email: registerResponse.email,
        avatar: registerResponse.avatar
      })
      showDialog.handleToggleShowDialogRegister()
      saveTokenToCookie(registerResponse.accessToken)
    })
}


</script>

<template>
  <v-dialog
    :model-value="showDialog.isShowDialogRegister"
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
      <v-card-title class="mx-auto" style="font-weight: bolder">{{ $t('page.register.register') }}</v-card-title>
      <v-form class="mx-auto" ref="form" v-model="valid">
        <div class="mx-auto">
          <nguyen-text-field
            v-model="email"
            append-inner-icon="mdi-email-outline"
            density="compact"
            text-field-width="440"
            style="border-radius: 8px"
            :label="$t('page.register.fieldName.email') "
            :rules="[
            (value) => validation.required(value, $t('page.register.fieldName.email')),
            (value) => validation.emailPattern(value, $t('page.register.fieldName.email'))
          ]"
          ></nguyen-text-field>
        </div>
        <div class="mx-auto">
          <nguyen-text-field
            v-model="password"
            :label="$t('page.register.fieldName.password')"
            density="compact"
            text-field-width="440"
            style="border-radius: 8px;"
            :rules="[
            (value) => validation.required(value, $t('page.register.fieldName.password')),
            (value) => validation.lengthMin(value, 8, $t('page.register.fieldName.password')),
            (value) => validation.lengthMax(value, 16, $t('page.register.fieldName.password'))
          ]"
            :append-inner-icon="toggleEyePassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="toggleEyePassword ? 'text' : 'password'"
            @click:append-inner="toggleEyePassword = !toggleEyePassword"
          ></nguyen-text-field>
        </div>
        <div class="mx-auto">
          <nguyen-text-field
            v-model="passwordConfirm"
            :label="$t('page.register.fieldName.passwordConfirm')"
            density="compact"
            text-field-width="440"
            style="border-radius: 8px;"
            :rules="[
            (value) => validation.required(value, $t('page.register.fieldName.passwordConfirm')),
            (value) => validation.compareNewPassword(value, password, $t('page.register.fieldName.password'), $t('page.register.fieldName.passwordConfirm'))
          ]"
            :append-inner-icon="toggleEyePasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :type="toggleEyePasswordConfirm ? 'text' : 'password'"
            @click:append-inner="toggleEyePasswordConfirm = !toggleEyePasswordConfirm"
          ></nguyen-text-field>
        </div>
        <div class="mx-auto d-flex align-center">
          <nguyen-text-field
            v-model="otp"
            :label="$t('page.register.fieldName.emailVerification')"
            density="compact"
            text-field-width="120"
            style="border-radius: 8px;"
            :rules="[
            (value) => validation.required(value, $t('page.register.fieldName.emailVerification')),
            (value) => validation.lengthMin(value, 6, $t('page.register.fieldName.emailVerification')),
            (value) => validation.lengthMax(value, 6, $t('page.register.fieldName.emailVerification'))
          ]"
          ></nguyen-text-field>
          <v-btn class="mt-2 ml-2" color="#4CAF50" @click="handleSendOtp">{{ $t('page.register.sendOTP') }}</v-btn>
        </div>
      </v-form>
      <v-card-subtitle style="margin-left: 16px">
        <nguyen-hyper-link to="/register">{{ $t('page.register.login') }}</nguyen-hyper-link>
        |
        <nguyen-hyper-link to="/change-password">{{ $t('page.register.forgotPassword') }}</nguyen-hyper-link>
      </v-card-subtitle>
      <v-card-actions style="margin-left: 280px">
        <v-btn
          variant="elevated"
          class="bg-blue-darken-1"
          @click="handleRegister"
        >
          {{ $t('page.register.register') }}
        </v-btn>
        <v-btn
          variant="elevated"
          class="bg-red-darken-2"
        >
          {{ $t('page.register.cancel') }}
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
