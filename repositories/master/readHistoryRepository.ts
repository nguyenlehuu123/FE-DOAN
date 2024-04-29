import http from '~/common/http'

const resource = '/api/v1/history'

export default {
  getReadHistory(params = {}, langCodes = {}) {
    return http.GET(`${resource}`, params, false, false, langCodes);
  }
}