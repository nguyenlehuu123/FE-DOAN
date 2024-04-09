import { defineStore } from "pinia";
import { getTokenFromCookie } from "~/common/cookie";

interface IUserInfo {
  avatar?: string,
  email?: string
}

export const userStore = defineStore('useStore', {
  state: () => {
    return {
      useRole: '',
      userInfo: {},
      authorization: getTokenFromCookie() ? getTokenFromCookie() : ''
    }
  },
  getters: {
    getUserRole(): string {
      return this.useRole
    },
    getUserInfo(): IUserInfo {
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
    updateUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo
    },
    updateAuthorization(authorization: string) {
      this.authorization = authorization
    }
  }
})
