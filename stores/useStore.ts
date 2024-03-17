import { defineStore } from "pinia";

export const userStore = defineStore('useStore', {
  state: () => {
    return {
      useRole: '',
      userInfo: {},
      authorization: ''
    }
  },
  getters: {
    getUserRole(): string {
      return this.useRole
    },
    getUserInfo(): string | object {
      return this.userInfo
    },
    getAuthorization(): string {
      return this.authorization
    }
  },
  actions: {
    updateUserRole(role: string) {
      this.useRole = role
    },
    updateUserInfo(userInfo: string | object) {
      this.userInfo = userInfo
    },
    updateAuthorization(authorization: string) {
      this.authorization = authorization
    }
  }
})
