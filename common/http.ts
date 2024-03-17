import axios, { AxiosInstance } from 'axios'
import Properties from '@/common/properties'
import { configHeaderApi } from '@/common/helper'
import Toast from '@/common/toast'

let instance: AxiosInstance | null = null;
type TServerLink = string | undefined

const serverLink: TServerLink = Properties().SERVER_LINK as TServerLink

interface ErrorCodeMap {
  [errorCode: number]: string
}

const GET = (url: string, params: object, showToast: boolean, showDialog: boolean, langCodes: ErrorCodeMap) => {
  if (!instance) {
    instance = axios.create({
      baseURL: serverLink
    })
  }
  instance.defaults.timeout = 3600000
  return new Promise((resolve, rejected) => {
    instance?.get(
      url,
      {
        headers: configHeaderApi(null),
        params: { ...params }
      }
    )
      .then((rawResponse) => {
        resolve(rawResponse.data)
      })
      .catch((error) => {
        // TODO
        rejected(error)
      })
      .finally(() => {
        // TODO
      })
  })
}

const POST = (url: string, data: number | string | object, showToast: boolean, showDialog: boolean, langCodes: ErrorCodeMap) => {
  if (!instance) {
    instance = axios.create({
      baseURL: serverLink,
    })
  }
  instance.defaults.timeout = 3600000

  return new Promise((resolve, reject) => {
    instance?.post(url, data, {
      headers: configHeaderApi(data)
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        checkError(error, showToast, showDialog, langCodes)
        reject(error)
      })
      .finally(() => {
        //TODO
      })
  })
}


const PUT = (url: string, data: number | string, langCodes: ErrorCodeMap) => {
  const serverLink: TServerLink = Properties().SERVER_LINK as TServerLink
  if (!instance) {
    instance = axios.create({
      baseURL: serverLink
    })
  }
  instance.defaults.timeout = 3600000
  return new Promise((resolve, rejected) => {
    instance?.put(
      url, data, {
        headers: configHeaderApi(data)
      }
    ).then((rowResponse) => {
      resolve(rowResponse.data)
    })
      .catch((error) => {
        // TODO
        rejected(error)
      })
      .finally(() => {
        // TODO
      })
  })
}

const DELETE = (url: string, params: object, langCodes: ErrorCodeMap) => {
  if (!instance) {
    instance = axios.create({
      baseURL: serverLink
    })
  }
  instance.defaults.timeout = 3600000
  return new Promise((resolve, rejected) => {
    instance?.delete(
      url, {
        headers: configHeaderApi(null),
        params
      }
    ).then((rowResponse) => {
      resolve(rowResponse.data)
    })
      .catch((error) => {
        // TODO
        rejected(error)
      })
      .finally(() => {
        // TODO
      })
  })
}

const DOWNLOAD = (url: string, params: object) => {
  if (!instance) {
    instance = axios.create({
      baseURL: serverLink
    })
  }
  instance.defaults.timeout = 3600000
  return new Promise((resolve, reject) => {
    instance?.get(
      url,
      {
        responseType: 'arraybuffer',
        headers: configHeaderApi(null),
        params: { ...params }
      }
    ).then((rawResponse) => {
      const contentDisposition = rawResponse.headers['content-dispositon']
      const fileName = contentDisposition.substring(contentDisposition.indexOf('filename=') + 'filename='.length)
      const codes = new Uint8Array(rawResponse.data)
      setTimeout(() => {
        const elDownload = document.createElement('a')
        document.body.appendChild(elDownload)
        const data = window.btoa(codes.reduce(function (data: string, byte: number) {
          return data + String.fromCharCode(byte)
        }, ''))
        elDownload.setAttribute('href', 'data:application/octet-stream;base64,'.concat(data))
        elDownload.setAttribute('download', fileName)
        elDownload.style.display = 'none'
        elDownload.click()
        document.body.removeChild(elDownload)
      }, 100)
      resolve(rawResponse.data)
    })
      .catch((error) => {
        //TODO
      })
      .finally(() => {
        //TODO
      })
  })
}


const checkError = (error: any, showToast: boolean, showDialog: boolean, langCodes: ErrorCodeMap) => {
  if (error.response) {

  }
  if (error.response.data) {
    const errorCode = error.response.data.errorCode
    if (langCodes && langCodes[errorCode]) {
      error.response.data.messageErrorCode = langCodes
      error.response.data.message = langCodes[errorCode]
    }

    handleToast(error.response, showToast)
  }
}

function handleToast(resError: object, showToast: boolean) {
  if (resError !== undefined && showToast) {
    Toast.show(resError, '')
  }
}

export default { GET, POST, PUT, DELETE, DOWNLOAD }
