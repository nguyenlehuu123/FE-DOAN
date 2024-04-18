import { defineStore } from "pinia";

export const dialogConfirmStore = defineStore('dialogConfirmStore', () => {
  const show = ref(false)
  const contentMessage = ref('Message Confirm')
  const confirmResolve = ref()
  const confirmParam = ref([])
  const cancelResolve = ref()
  const cancelParam = ref({})

  const setShow = (stateShow: boolean) => {
    show.value = stateShow
  }

  const getShow = () => {
    return show.value
  }

  const setContentMessage = (message: string) => {
    const messageLines = message.split(/<br\s*\/?>/i)
    contentMessage.value = messageLines.join('\n')
  }

  const getContentMessage = () => {
    return contentMessage.value
  }

  const setConfirmResolve = (input: any) => {
    confirmResolve.value = input
  }

  const getConfirmResolve = () => {
    return confirmResolve.value
  }

  const setConfirmParam = (input: any) => {
    confirmParam.value = input
  }

  const getConfirmParam = () => {
    return confirmParam.value
  }

  const setCancelResolve = (input: any) => {
    cancelResolve.value = input
  }

  const getCancelResolve = () => {
    return cancelResolve.value
  }

  const setCancelParam = (input: any) => {
    cancelParam.value = input
  }

  const getCancelParam = () => {
    return cancelParam.value
  }

  return {
    setShow,
    getShow,
    setContentMessage,
    getContentMessage,
    setConfirmResolve,
    getConfirmResolve,
    setConfirmParam,
    getConfirmParam,
    setCancelResolve,
    getCancelResolve,
    setCancelParam,
    getCancelParam
  }
})
