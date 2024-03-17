import http from '~/common/http'

const resource = 'api/v1/auth'

export default {
  login(payload = {}, langCodes = {}) {
    return http.POST(`${resource}/authenticate`, payload, true, false, langCodes);
  }
}
