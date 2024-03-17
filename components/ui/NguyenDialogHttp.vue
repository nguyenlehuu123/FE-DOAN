<script setup lang="ts">
import { dialogHttpStore } from "~/stores/dialogHttpStore";
import { computed } from "#imports";

const slots = useSlots()
definePageMeta({
  layout: false
})

const dialogHttp = dialogHttpStore()

const show = computed(() => dialogHttp.getShow())
const content = computed(() => dialogHttp.getContent())
const title = computed(() => dialogHttp.getTitle())

const confirmRollback = function () {
  const confirmResolve = dialogHttp.setConfirmResolve()
  if (confirmResolve) {
    confirmResolve(...dialogHttp.getConfirmParam())
    dialogHttp.setConfirmParam([])
  }
  dialogHttp.setShow(false)
}
</script>

<template>
  <v-dialog
    :model-value="show"
    :width="340"
    :max-height="298"
    position="fixed"
    top="50%"
    left="50%"
    style="z-index: 9999"
    @click:outside="dialogHttp.setShow(false)"
    @keydown.esc="dialogHttp.setShow(false)"
  >
    <v-card
      flat="true"
      class="d-flex justify-center"
    >
      <v-icon icon="mdi-alert-circle-outline" class="text-h2 align-center text-red mx-auto my-2"></v-icon>
      <v-card-title class="text-red text-center text-h4">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-center align-center text-body-1 my-4">
        {{ content }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="bg-red mx-auto my-5"
          @click="confirmRollback"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>