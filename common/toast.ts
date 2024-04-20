import { toast } from "vue3-toastify";
import { TOAST_TYPE } from "~/common/constant";


const show = (response: any, defaultMessage: string) => {
  const toastValue = detectToast(response.status)
  const messageToast = response.data.message || defaultMessage || ''

  toast(messageToast, {
    autoClose: 3000,
    type: toastValue.type,
    position: toast.POSITION.TOP_RIGHT,
    transition: "slide",
    hideProgressBar: true,
    icon: false,
    toastStyle: {
      opacity: '1',
      backgroundColor: toastValue.backgroundColor,
      width: '100%',
      textAlign: 'center',
      height: 'auto !important',
      color: 'white',
      marginBottom: '8px'
    },
    style: {
      width: '18%',
      top: 20,
      padding: 10,
    }
  })
}

const showManual = (message: string, type: number) => {
  let toastValue
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      toastValue = detectToast(TOAST_TYPE.SUCCESS)
      break
    case TOAST_TYPE.ERROR:
      toastValue = detectToast(TOAST_TYPE.ERROR)
      break
    default:
      toastValue = detectToast(TOAST_TYPE.ERROR)
  }
  const toastMessage = message || ''
  toast(toastMessage, {
    autoClose: 3000,
    type: toastValue.type,
    position: toast.POSITION.TOP_RIGHT,
    transition: "slide",
    hideProgressBar: true,
    icon: false,
    toastStyle: {
      opacity: '1',
      backgroundColor: toastValue.backgroundColor,
      width: '100%',
      textAlign: 'center',
      height: 'auto !important',
      color: 'white',
      marginBottom: '8px'
    },
    style: {
      width: '18%',
      top: 20,
      padding: 10,
    }
  })
}

const detectToast = (status: number) => {
  if (status.toString().startsWith("2")) {
    return {
      type: toast.TYPE.SUCCESS,
      backgroundColor: '#00C853'
    }
  }
  if (status.toString().startsWith("4")) {
    return {
      type: toast.TYPE.ERROR,
      backgroundColor: '#E53935'
    }
  }
  return {
    type: toast.TYPE.ERROR,
    backgroundColor: '#F44336'
  }
}

export default { show, showManual }
