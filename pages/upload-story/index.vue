<script setup lang="ts">
import NguyenTextField from "~/components/ui/NguyenTextField.vue";
import NguyenDataTable from "~/components/ui/NguyenDataTable.vue";
import NguyenSelect from "~/components/ui/NguyenSelect.vue";
import validation from "~/common/validation";
import NguyenTextArea from "~/components/ui/NguyenTextArea.vue";
import NguyenUploadImage from "~/components/ui/NguyenUploadImage.vue";
import NguyenUploadFile from "~/components/ui/NguyenUploadFile.vue";


const headersFixed = [
  {
    key: 'no',
    title: 'No',
    align: 'center',
    sortable: true,
    width: '2%',
    fixed: true
  },
  {
    key: 'storyName',
    title: 'storyName',
    align: 'center',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'nameAuthor',
    title: 'Name Author',
    align: 'center',
    sortable: true,
    width: '18%',
    fixed: true
  },
  {
    key: 'dateSubmitted',
    title: 'date submitted',
    align: 'center',
    sortable: true,
    width: '15%',
    fixed: true
  },
  {
    key: 'like',
    title: 'Like',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'dislike',
    title: 'Dislike',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'follow',
    title: 'Follow',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'rating',
    title: 'Rating',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'edit',
    title: 'Edit',
    align: 'center',
    sortable: false,
    width: '5%',
    fixed: true
  },
]
const headersChapter = [
  {
    key: 'chapter',
    title: 'Chapter',
    align: 'center',
    sortable: true,
    width: '15%',
    fixed: true
  },
  {
    key: 'author',
    title: 'Author',
    align: 'center',
    sortable: true,
    width: '30%',
    fixed: true
  },
  {
    key: 'dateSubmitted',
    title: 'Date Submitted',
    align: 'center',
    sortable: true,
    width: '25%',
    fixed: true
  },
  {
    key: 'view',
    title: 'view chapter',
    align: 'center',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'status',
    title: 'Status',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  }
]

const items = [
  {
    no: 1,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 2
  },
  {
    no: 2,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 3
  },
  {
    no: 3,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 4
  },
  {
    no: 4,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 5
  },
  {
    no: 5,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 2
  },
  {
    no: 6,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 3
  },
  {
    no: 7,
    storyName: 'Chapter1',
    nameAuthor: 'Chapter1',
    dateSubmitted: '10/10/2022',
    like: 100,
    dislike: 100,
    follow: 100,
    rating: 1
  }
]
const itemsSelect = [
  {
    text: 'Item 1',
    key: 'item1'
  },
  {
    text: 'Item 2',
    key: 'item2'
  },
  {
    text: 'Item 3',
    key: 'item3'
  },
  {
    text: 'Item 4',
    key: 'item4'
  },
  {
    text: 'Item 5',
    key: 'item5'
  },
  {
    text: 'Item 6',
    key: 'item6'
  },
  {
    text: 'Item 7',
    key: 'item7'
  },
  {
    text: 'Item 7',
    key: 'item7'
  }
]

const itemsChapter = [
  {
    chapter: 'Chapter1',
    author: 'Author 1, Author 2',
    dateSubmitted: '10/10/2022',
    view: 100,
    status: 0
  },
  {
    chapter: 'Chapter1',
    author: 'Author 1, Author 2',
    dateSubmitted: '10/10/2022',
    view: 100,
    status: 0
  },
  {
    chapter: 'Chapter1',
    author: 'Author 1, Author 2',
    dateSubmitted: '10/10/2022',
    view: 100,
    status: 0
  },
  {
    chapter: 'Chapter1',
    author: 'Author 1, Author 2',
    dateSubmitted: '10/10/2022',
    view: 100,
    status: 0
  }
]

</script>
<template>
  <div>
    <div class="my-2">
      <v-icon icon="mdi-magnify"></v-icon>
      <span>Search truyện</span>
    </div>
    <v-divider class="mb-6"></v-divider>
    <div>
      <nguyen-text-field
        label="Tên truyện"
        density="compact"
        :text-field-width="500"
        :horizontal="true"
        width="36"
      ></nguyen-text-field>
      <nguyen-text-field
        label="Tên tác giả"
        density="compact"
        :text-field-width="500"
        :horizontal="true"
        width="36"
      ></nguyen-text-field>
      <div class="d-flex justify-center mb-12 mt-6">
        <v-btn style="background-color: #43A047; width: 140px">
          Search
        </v-btn>
      </div>
      <nguyen-data-table
        :headers="headersFixed"
        :height="400"
        :items="items"
      >
        <template #item.rating="{ item }">
          <div style="display: flex; justify-content: center; align-items: center">
            <v-rating
              :model-value="item?.rating"
              :disabled="true"
              color="#F9A825"
              class="v-rating-collapse--size"
              half-increments
            ></v-rating>
          </div>
        </template>
        <template #item.edit="{ item }">
          <div
            style="cursor: pointer; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 1px"
            class="edit-story-icon">
            <v-icon icon="mdi-pencil"></v-icon>
          </div>
        </template>
      </nguyen-data-table>
      <div class="d-flex justify-end mt-8 mb-8">
        <v-btn class="bg-light-blue-lighten-1">
          Add story
        </v-btn>
      </div>
      <v-divider class="mb-6"></v-divider>

      <!--      add story-->
      <div>
        <div style="display: flex">
          <div>
            <nguyen-select
              label-select="Tên tác giả"
              density="compact"
              width="500px"
              item-title="text"
              item-value="key"
              :items="itemsSelect"
              :multiple="true"
              :text-field-width="500"
              :horizontal="true"
              :rules="[
            (value) => validation.required(value, 'Tên tác giả')
          ]"
            ></nguyen-select>
            <nguyen-text-field
              label="Tên truyện"
              density="compact"
              width="36"
              :text-field-width="500"
              :horizontal="true"
              :rules="[
            (value) => validation.required(value, 'Tên truyện')
          ]"
            ></nguyen-text-field>
            <nguyen-upload-file></nguyen-upload-file>
          </div>
          <div style="margin-left: 200px">
            <nguyen-upload-image
              width-image="120"
              height-image="150"
            ></nguyen-upload-image>
          </div>
        </div>
        <nguyen-text-area
          label="Mô tả truyện"
          :rows="4"
          :max-length="2000"
          :rules="[
            (value) => validation.required(value, 'Mô tả truyện'),
            (value) => validation.lengthMax(value, 2000, 'Mô tả truyện'),
            (value) => validation.lengthMin(value, 100, 'Mô tả truyện')
          ]"
        >
        </nguyen-text-area>
        <div>
          <div>
            <input type="file" style="display: none">
            <v-btn prepend-icon="mdi-upload" style="border: 1px #4FC3F7 dashed;" flat>Upload File</v-btn>
          </div>
          <div>
            <nguyen-data-table
              :headers="headersChapter"
              :items="itemsChapter"
            >
            </nguyen-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.edit-story-icon:hover {
  background-color: #81C784;
}

.v-rating-collapse--size label {
  width: 22px;
}
</style>