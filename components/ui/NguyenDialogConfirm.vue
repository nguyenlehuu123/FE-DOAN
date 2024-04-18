<script setup lang="ts">
import { computed, dialogConfirmStore } from "#imports";

const dialogConfirm = dialogConfirmStore()
const show = computed(() => dialogConfirm.getShow())
const message = computed(() => dialogConfirm.getContentMessage())

const confirmCallBack = () => {
  const confirmResolve = dialogConfirm.getConfirmResolve()
  if (confirmResolve) {
    confirmResolve(...dialogConfirm.getConfirmParam())
    dialogConfirm.setConfirmParam([])
  }
  dialogConfirm.setShow(false)
}

const cancelCallBack = () => {
  const cancelResolve = dialogConfirm.getCancelResolve()
  if (cancelResolve) {
    cancelResolve(...dialogConfirm.getCancelResolve())
    dialogConfirm.setCancelParam([])
  }
  dialogConfirm.setShow(false)
}
</script>

<template>
  <v-dialog
    :model-value="show"
    :width="340"
    :max-height="330"
    position="fixed"
    style="z-index: 9999"
    top="50%"
    left="50%"
    @click:outside="cancelCallBack"
    @keydown.esc="cancelCallBack"
  >
    <v-card
      :flat="true"
    >
      <v-icon icon="mdi-alert" class="text-h2 align-center text-yellow-accent-3 mx-auto my-2"></v-icon>
      <v-card-title class="text-yellow-accent-3 text-center text-h4">
        Confirm
      </v-card-title>
      <v-card-text class="text-center align-center text-body-1 my-4">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="my-5 d-flex justify-center text-capitalize classification-ok"
          :width="80"
          variant="outlined"
          @click="confirmCallBack"
        >
          OK
        </v-btn>
        <v-btn
          class="my-5 d-flex justify-center text-capitalize classification-cancel"
          :width="80"
          variant="outlined"
          @click="cancelCallBack"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.v-card-actions {
  display: flex;
  justify-content: center;
}

.classification-ok {
  background-color: red;
  margin: 0 10px;
}

.classification-cancel {
  background-color: #84FFFF;
  margin: 0 10px;
}
</style>