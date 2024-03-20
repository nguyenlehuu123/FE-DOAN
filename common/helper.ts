import { userStore } from "~/stores/useStore";
import { differenceInDays } from "date-fns/fp/differenceInDays";

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
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const DateHelper = {
  compareDate: (beforeDate: Date, afterDate: Date) => {
    if (beforeDate.getTime() < afterDate.getTime()) {
      return -1;
    } else if (beforeDate.getTime() === afterDate.getTime()) {
      return 0;
    }
    return 1;
  },
  numberDayAge: (beforeDate: Date): number => {
    const today = new Date();
    return differenceInDays(beforeDate, today);
  },
  formatDateMMDDYYYY: (isoDateString: string) => {
    const date = new Date(isoDateString);

    // Lấy thông tin ngày, tháng và năm từ đối tượng Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();

    // Tạo chuỗi ngày/tháng/năm
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
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
