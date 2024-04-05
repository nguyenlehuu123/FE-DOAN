import { userStore } from "~/stores/useStore";
import { differenceInDays } from "date-fns/fp/differenceInDays";
import { i18n } from "~/plugins/i18n";

import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from '~/app.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')


interface IHeaders {
  'Cache-Control': string;
  Pragma: string;
  Expires: string;
  'X-CmdId': string;
  Authorization: string;
  'Accept-Language': string;
  'Content-Type': string;
}

const useStoreLocal = userStore()

const configHeaderApi = (data: number | string | object | null): IHeaders => {
  const headers: IHeaders = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'X-CmdId': '',
    Authorization: useStoreLocal.getAuthorization ? useStoreLocal.getAuthorization : '',
    'Accept-Language': 'en,vi;q=0.8,en;q=0.9',
    'Content-Type': 'application/json'
  };

  if (typeof data === 'number' || typeof data === 'string' || typeof data === 'object') {
    headers['Content-Type'] = 'application/json'
  }

  return headers
};

const DateHelper = {
  compareDate: (beforeDate: Date, afterDate: Date) => {
    if (beforeDate.getTime() < afterDate.getTime()) {
      return -1
    } else if (beforeDate.getTime() === afterDate.getTime()) {
      return 0
    }
    return 1
  },
  numberDayAgo: (beforeDate: Date): number => {
    const today = new Date()
    return differenceInDays(beforeDate, today)
  },
  formatDateMMDDYYYY: (isoDateString: string) => {
    const date = new Date(isoDateString)

    // Lấy thông tin ngày, tháng và năm từ đối tượng Date
    const day = date.getDate()
    const month = date.getMonth() + 1 // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear()

    // Tạo chuỗi ngày/tháng/năm
    const formattedDate = `${day}/${month}/${year}`

    return formattedDate;
  },
  dateAgo: (timestamp: number) => {
    const now = new Date();
    const date = new Date(timestamp);

    const diffInTime = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    // Tính số năm
    let years = now.getFullYear() - date.getFullYear();
    // Tính số tháng
    let months = now.getMonth() - date.getMonth() + years * 12;
    // Tính số ngày
    let days = now.getDate() - date.getDate();

    // Nếu số ngày âm, giảm số tháng và tính lại số ngày
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    // Nếu số tháng âm, giảm số năm và tính lại số tháng
    if (months < 0) {
      years--;
      months += 12;
    }

    // Trả về chuỗi thời gian tương ứng
    if (diffInDays < 1) {
      return i18n.global.t('page.mangaDetail.justPosted');
    } else if (diffInDays < 30) {
      return `${diffInDays} ${i18n.global.t('page.mangaDetail.dayAgo')}`;
    } else if (months < 12) {
      return `${months} ${i18n.global.t('page.mangaDetail.monthAgo')}`;
    } else {
      return `${years} ${i18n.global.t('page.mangaDetail.yearAgo')}`;
    }
  }
}

const ObjectHelper = {
  copyValueByField: (source: any, target: any) => {
    Object.keys(target).forEach((fieldName: string) => {
      if (source.hasOwnProperty(fieldName)) {
        target[fieldName] = source[fieldName]
      }
    })
  }
}

export {
  configHeaderApi,
  DateHelper,
  ObjectHelper
}
