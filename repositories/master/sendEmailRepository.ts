import http from '~/common/http'

const resource = 'api/v1'

export default {
  sendOtpToEmail(payload = {}, langCodes = {}) {
    return http.POST(`${resource}/otp/send-otp`, payload, true, false, langCodes)
  }
}
