import http from '~/common/http'

const resource = 'api/v1/manga-detail'

export default {
  getMangaDetail(params = {}, langCodes = {}) {
    return http.GET(`${resource}/${params}`, {}, false, false, langCodes);
  }
}
