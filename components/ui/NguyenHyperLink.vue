<script setup lang="ts">
</script>

<template>
  <nuxt-link v-bind="$attrs" class="nguyen-hyperlink text-hyperlink-color">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
  </nuxt-link>
</template>

<style scoped lang="scss">
.nguyen-hyperlink {
  font-size: 12px;
  color: black;
  text-decoration: none;
}

.text-hyperlink-color {

}
</style>
