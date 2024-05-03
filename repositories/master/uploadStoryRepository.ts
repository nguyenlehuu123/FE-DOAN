import http from '~/common/http'

const resource = 'api/v1/upload-story'

export default {
  searchConditionStory(payload = {}, langCodes = {}) {
    return http.GET(`${resource}/search`, payload, false, true, langCodes);
  },
  getAllAuthorSelect(payload = {}, langCodes = {}) {
    return http.GET(`${resource}/get-all-author`, payload, false, false, langCodes);
  },
  getAllStoryGenre(payload = {}, langCodes = {}) {
    return http.GET(`${resource}/get-all-story-genre`, payload, false, false, langCodes);
  },
  uploadStory(payload = {}, langCodes = {}) {
    return http.POST(`${resource}/upload`, payload, false, true, langCodes);
  },
  updateStory(params: number | string, payload = {}, langCodes = {}) {
    return http.PUT(`${resource}/update-story/${params}`, payload, false, true, langCodes);
  },
  getSequenceNumberStory(payload = {}, langCodes = {}) {
    return http.GET(`${resource}/sequence-number-story`, payload, false, false, langCodes);
  }
}
