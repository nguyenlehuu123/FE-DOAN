import http from '~/common/http'

const resource = '/api/v1/history'

interface IParams {
  storyId: string | string[];
}

export default {
  getReadHistory(params = {}, langCodes = {}) {
    return http.GET(`${resource}`, params, false, false, langCodes);
  },
  addReadHistory(params = {} as IParams, langCodes = {}) {
    return http.POST(`${resource}/${params?.storyId}`, {}, false, true, langCodes);
  },
}