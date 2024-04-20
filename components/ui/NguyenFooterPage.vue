<script setup lang="ts">
import imgLogo from "~/assets/images/truyen_vv.jpg";
</script>
<template>
  <div
    style="margin-top: 50px; border-top: #FF8F00 solid 2px;">
    <div style="margin-top: 10px; margin-bottom: 50px;">
      <div style="display: flex">
        <div style="display: flex; flex-direction: column; width: 50%">
          <div style="display: flex; align-items: center; width: 200px">
            <v-img
              :src="imgLogo"
              :width="100"
              :height="100"
            >
            </v-img>
            <span style="font-size: 24px">TRUYENVV</span>
          </div>
          <div style="display: flex; flex-direction: column">
            <span>Email: truyen_vv@gmail.com</span>
            <span>Hotline: 0123 456 789</span>
            <span>Địa chỉ: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</span>
          </div>
        </div>
        <v-divider vertical></v-divider>
        <div style="width: 50%; margin-left: 20px; display: flex; flex-wrap: wrap; gap: 10px">
          <v-btn variant="outlined" color="#64B5F6">Anime</v-btn>
          <v-btn variant="outlined" color="#64B5F6">Cổ đại</v-btn>
          <v-btn variant="outlined" color="#64B5F6">Magic</v-btn>
          <v-btn variant="outlined" color="#64B5F6">School Left</v-btn>
          <v-btn variant="outlined" color="#64B5F6">Xuyên không</v-btn>
          <v-btn variant="outlined" color="#64B5F6">Sports</v-btn>
          <v-btn variant="outlined" color="#64B5F6">Martial Arts</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>
