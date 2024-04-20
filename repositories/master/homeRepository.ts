import http from '~/common/http'

const resource = 'api/v1/home'

export default {
  getOptionsHeader(params = {}, langCodes = {}) {
    return http.GET(`${resource}/option-header`, params, false, false, langCodes);
  },
  getStoryHot(params = {}, langCodes = {}) {
    return http.GET(`${resource}/story-hot`, params, false, false, langCodes);
  },
  getStoryNewUpdate(params = {}, langCodes = {}) {
    return http.GET(`${resource}/story-new-update`, params, false, false, langCodes);
  },
  searchAllStory(params = {}, langCodes = {}) {
    return http.GET(`${resource}/search`, params, false, false, langCodes)
  },
  getStoryGenre(params = {} as { storyGenreId: number }, payload = {}, langCodes = {}) {
    return http.GET(`${resource}/get-story-genre/${params.storyGenreId}`, payload, false, true, langCodes)
  }
}
