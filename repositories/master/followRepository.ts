import http from '~/common/http'

const resource = 'api/v1/follow'


export default {
  followStory(params: { storyId?: string } = {}, langCodes = {}) {
    return http.POST(`${resource}/${params.storyId}`, {}, false, true, langCodes);
  },
  getStoryFollowed(params = {}, langeCodes = {}) {
    return http.GET(`${resource}/`, params, false, false, langeCodes);
  },
  unfollowStory(params: { storyId?: string } = {}, langCodes = {}) {
    return http.DELETE(`${resource}/${params.storyId}`, params, langCodes);
  }
}
