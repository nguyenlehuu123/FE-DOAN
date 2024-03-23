<template>
  <v-app class="height-100">
    <page-header></page-header>
    <nguyen-popup-login></nguyen-popup-login>
    <nguyen-popup-register></nguyen-popup-register>
    <nguyen-dialog-http></nguyen-dialog-http>
    <nguyen-dialog-confirm></nguyen-dialog-confirm>
    <v-main>
      <div style="max-width: 1500px; margin: auto; margin-top: -60px;">
        <nuxt-page></nuxt-page>
      </div>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import PageHeader from "~/layouts/default-layout/PageHeader.vue";
import NguyenPopupLogin from "~/components/popup/NguyenPopupLogin.vue";
import NguyenPopupRegister from "~/components/popup/NguyenPopupRegister.vue";
import NguyenDialogHttp from "~/components/ui/NguyenDialogHttp.vue";
import NguyenDialogConfirm from "~/components/ui/NguyenDialogConfirm.vue";
</script>
