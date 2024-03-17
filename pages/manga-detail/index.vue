<script setup lang="ts">
import NguyenDataTable from "~/components/ui/NguyenDataTable.vue";
import NguyenTextFieldComment from "~/components/ui/NguyenTextFieldComment.vue";
import NguyenComment from "~/components/ui/NguyenComment.vue";
import { useI18n } from "vue-i18n";

const i18n = useI18n()
const breadcrumbs = [
  {
    title: 'Trang chủ',
    disabled: false,
    href: 'breadcrumbs_dashboard',
  },
  {
    title: ' Trục Phong Nguyệt, Dư Quân Hỉ',
    disabled: false,
    href: 'breadcrumbs_link_1',
  }
]

const headersFixed = [
  {
    key: 'chapter',
    title: i18n.t('page.mangaDetail.chapter'),
    align: 'start',
    sortable: true,
    width: '30%',
    fixed: true
  },
  {
    key: 'status',
    title: i18n.t('page.mangaDetail.status'),
    align: 'start',
    sortable: false,
    width: '20%',
    fixed: true
  },
  {
    key: 'view',
    title: i18n.t('page.mangaDetail.view'),
    align: 'start',
    sortable: true,
    width: '20%',
    fixed: true
  },
  {
    key: 'dateSubmitted',
    title: i18n.t('page.mangaDetail.dateSubmitted'),
    align: 'start',
    sortable: true,
    width: '30%',
    fixed: true
  },
]
const items = [
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 0,
    view: 100,
    dateSubmitted: '10/10/2022',
  },
  {
    chapter: 'Chapter1',
    status: 1,
    view: 100,
    dateSubmitted: '20/10/2022',
  }
]

</script>

<template>
  <div class="mx-auto w-66">
    <v-breadcrumbs :items="breadcrumbs" class="mt-n12" style="font-size: 14px; font-weight: 600">
      <template #divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <div class="d-flex">
      <div>
        <v-img
          width="192"
          height="250"
          cover
          loding
          src="https://i.truyenvua.com/ebook/190x247/truc-phong-nguyet-du-quan-hi_1529549781.jpg?gt=hdfgdfg&mobile=2"></v-img>
      </div>
      <div style="margin-left: 50px">
        <h2>Trục Phong Nguyệt, Dư Quân Hỉ</h2>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-plus-thick" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.anotherName') }}</p>
          <p>Nữ Đương Gia Sương Dã Trại</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-account-star" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.author') }}</p>
          <p>Vân Đoan Mạn Họa</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-wifi" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.status') }}</p>
          <p>Đang Cập Nhật</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-thumb-up" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.likes') }}</p>
          <p>507</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-heart" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.flow') }}</p>
          <p>1,838</p>
        </div>
        <div class="d-flex align-center mt-3">
          <v-icon icon="mdi-eye-arrow-left" style="font-size: 20px; margin-right: 4px"></v-icon>
          <p style="width: 140px">{{ $t('page.mangaDetail.view') }}</p>
          <p>267,526</p>
        </div>
        <div class="d-flex ga-6 mt-2">
          <v-btn class="bg-green-lighten-1" prepend-icon="mdi-notebook">
            {{ $t('page.mangaDetail.readBeginning') }}
          </v-btn>
          <v-btn class="bg-red-accent-2" prepend-icon="mdi-heart">{{ $t('page.mangaDetail.flow') }}</v-btn>
          <v-btn class="bg-light-blue-accent-3" prepend-icon="mdi-thumb-up">{{ $t('page.mangaDetail.likes') }}</v-btn>
        </div>
      </div>
    </div>
    <div>
      <div class="d-flex align-center ga-6" style="color: #FF8F00">
        <v-icon icon="mdi-information-slab-circle"></v-icon>
        <h2>{{ $t('page.mangaDetail.introduce') }}</h2>
      </div>
      <div>
        Đại Tống kiến triều đệ thập bát năm, Phượng Hoàng Sơn “Sương dã trại” nữ đương gia liêu vô song, không chịu nổi
        bà vú cả ngày lải nhải, quyết định tìm một người nam nhân, sinh hài tử! Đúng lúc vào lúc này, Đại Tống quốc chủ
        bất kham địa phương rung chuyển, đặc phái đương triều khác họ Vương gia cố khuynh thành, lên núi diệt phỉ. Trời
        quang trăng sáng cố khuynh thành, một thế hệ mỹ nam, lại là xuất sư tiệp thân chết trước, coi khinh nữ nhân hậu
        quả, chính là bị cái này đang lo vô pháp sinh bảo tiểu nữ tử, trói lại sơn, áp lên giường đất.
      </div>
    </div>
    <div class="mt-8">
      <nguyen-data-table
        :headers="headersFixed"
        :items="items"
        :height="400"
      >
        <template #item.view="{ item }">
          <div>
            <v-icon icon="mdi-eye-check-outline"></v-icon>
            <span class="mx-2">{{ item?.view }}</span>
          </div>
        </template>
        <template #item.status="{ item }">
          <div>
            <v-icon v-if="item?.status === 0" icon="mdi-lock-alert-outline"></v-icon>
            <v-icon v-else icon="mdi-lock-open-outline"></v-icon>
          </div>
        </template>
      </nguyen-data-table>
    </div>
    <div>
      <div class="d-flex align-center mt-8" style="color: #FF8F00">
        <v-icon icon="mdi-comment"></v-icon>
        <h3 style="margin-left: 20px">{{ $t('page.mangaDetail.comment') }}</h3>
      </div>
      <nguyen-text-field-comment
        style="margin-top: 20px"
        density="compact"
        placeholder="Viết bình luận ..."
        src-image="https://i1-vnexpress.vnecdn.net/2020/11/19/lamborghini-huracan-sto-7012-1605777839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=_LK7qvQPtHWLoFWTspAb9Q"
        alt="Linh Nhi"
      ></nguyen-text-field-comment>
      <nguyen-comment
        account-name="@nguyenle"
        text-comment="em vẫn muốn được anh lì xì"
        flat
        srg-avatar="https://i1-vnexpress.vnecdn.net/2020/11/19/lamborghini-huracan-sto-7012-1605777839.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=_LK7qvQPtHWLoFWTspAb9Q"
        :like-num="1"
        :dislike-num="0"
        :day-ago="1"
        :role-heart="true"
      ></nguyen-comment>
    </div>
  </div>
</template>

<style scoped>

</style>