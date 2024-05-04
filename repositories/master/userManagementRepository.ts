import http from '~/common/http'

const resource = 'api/v1/user-management'

export default {
  getUsers(params = {}, langCodes = {}) {
    return http.GET(`${resource}/users`, params, false, false, langCodes);
  },
  deleteUsers(params = {}, langCodes = {}) {
    return http.DELETE(`${resource}/delete/${params}`, {}, langCodes);
  },
  updateRoleUser(params = {}, payload = {}, langCodes = {}) {
    return http.PUT(`${resource}/update-role/${params}`, payload, false, false, langCodes);
  }
}