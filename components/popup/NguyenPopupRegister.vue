<script setup lang="ts">

import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import validation from "~/common/validation";
import NguyenHyperLink from "~/components/ui/NguyenHyperLink.vue";
import { showDialogStore } from "~/stores/showDialogStore";

const showDialog = showDialogStore()
const toggleEyePassword = ref<boolean>(false)
const toggleEyePasswordConfirm = ref<boolean>(false)
const email = ref<string>('')
const password = ref<string>('')
const passwordConfirm = ref<string>('')
const form = ref(null)

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
      <v-form class="mx-auto" ref="form">
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
