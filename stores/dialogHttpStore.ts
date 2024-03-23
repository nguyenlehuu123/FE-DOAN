import { defineStore } from 'pinia'
import { ref } from 'vue'

export const dialogHttpStore = defineStore('dialogHttpStore', () => {
  const show = ref<boolean>(false)
  const content = ref<string>('Content Error')
  const title = ref<string>('Error')
  const confirmResolve = ref()
  const confirmParam = ref()

  const setShow = (stateShow: boolean) => {
    show.value = stateShow
  }

  const getShow = () => {
    return show.value
  }

  const setContent = (message: string) => {
    content.value = message
  }

  const getContent = () => {
    return content.value
  }
  const setTitle = (input: string) => {
    title.value = input
  }

  const getTitle = () => {
    return title.value
  }

  const setConfirmParam = (input: any) => {
    confirmParam.value = input
  }

  const getConfirmParam = () => {
    return confirmParam.value
  }

  const setConfirmResolve = (input: any) => {
    confirmResolve.value = input
  }

  const getConfirmResolve = () => {
    return confirmResolve.value
  }

  return {
    setShow,
    getShow,
    setContent,
    getContent,
    setTitle,
    getTitle,
    setConfirmParam,
    getConfirmParam,
    setConfirmResolve,
    getConfirmResolve
  }
})