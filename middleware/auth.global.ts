import { userStore } from "~/stores/useStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = userStore()

  if (to.path.split('/').length && to.path.split('/')[1] == 'home') {
    return
  }

  if (to.path === '/') {
    return navigateTo('/home')
  }
})
