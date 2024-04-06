<script setup lang="ts">
import { ref } from 'vue';
import { UseFirebase } from "~/common/useFirebase";
import imgUpload from "~/assets/images/img-upload.png";

defineOptions({
  inheritAttrs: false
})

interface Props {
  widthImage: string | number
  heightImage: string | number
}

const props = withDefaults(defineProps<Props>(), {
  widthImage: 180,
  heightImage: 233
})

let selectedFile = ref()
const urlFileUpload = ref<string | null>(null);

const handleSelectFile = async (event: any) => {
  if (urlFileUpload.value !== null) {
    UseFirebase.handleDeleteFile(urlFileUpload.value);
  }
  selectedFile.value = event.target.files[0];
  urlFileUpload.value = await UseFirebase.handleUploadFile(selectedFile.value)
};

const handleUploadImage = () => {
  let fileInput = document.getElementById('input-upload-image');
  if (fileInput) {
    fileInput.click();
  }
};

</script>

<template>
  <div>
    <v-img
      :src="urlFileUpload ? urlFileUpload : imgUpload"
      :width="props.widthImage"
      :height="props.heightImage"
      class="v-img__upload-image"
      cover
      @click="handleUploadImage"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
      <template #default>
        <div class="d-flex w-100 h-100 justify-center align-center bg-color-over-fol">
          <v-icon icon="mdi-pencil" class="v-icon__hover"></v-icon>
        </div>
      </template>
    </v-img>
    <input
      id="input-upload-image"
      type="file"
      style="display: none"
      @change="handleSelectFile"
    >
  </div>
</template>

<style scoped lang="scss">
.v-img__upload-image {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 auto;
  transition: 0.3s;

  &:hover {
    border: 1px solid #000;

    .bg-color-over-fol {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .v-icon__hover {
      width: 40px;
      height: 40px;
      background-color: #FAFAFA;
      border-radius: 40px;
      color: #4FC3F7;
      visibility: visible;
    }
  }

  .v-icon__hover {
    visibility: hidden;
  }
}

</style>