import http from '~/common/http'

const resource = 'api/v1/author-info'


export default {
  getAuthorInfo(payload = {}, langCodes = {}) {
    return http.POST(`${resource}/get`, payload, false, true, langCodes);
  },
  saveAuthorInfo(payload = {}, langCodes = {}) {
    return http.POST(`${resource}/save`, payload, false, true, langCodes);
  }
}
