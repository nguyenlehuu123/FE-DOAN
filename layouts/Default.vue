<template>
  <v-app class="height-100">
    <page-header></page-header>
    <nguyen-popup-login></nguyen-popup-login>
    <nguyen-popup-register></nguyen-popup-register>
    <v-main>
      <nuxt-page></nuxt-page>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import PageHeader from "~/layouts/default-layout/PageHeader.vue";
import NguyenPopupLogin from "~/components/popup/NguyenPopupLogin.vue";
import NguyenPopupRegister from "~/components/popup/NguyenPopupRegister.vue";
</script>
