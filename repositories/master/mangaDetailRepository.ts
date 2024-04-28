import http from '~/common/http'

const resource = 'api/v1/manga-detail'


export default {
  getMangaDetail(params = {}, langCodes = {}) {
    return http.GET(`${resource}/${params}`, {}, false, false, langCodes);
  },
  getAllCommentMana(params = {}, langCodes = {}) {
    return http.GET(`${resource}/comments/${params}`, {}, false, false, langCodes);
  },
  likeMaga(params = {}, langCodes = {}) {
    return http.PUT(`${resource}/likes/${params}`, {}, false, false, langCodes);
  },
  disLikeMaga(params = {}, langCodes = {}) {
    return http.DELETE(`${resource}/dislikes/${params}`, {}, langCodes);
  },
  isLikeMaga(params = {}, langCodes = {}) {
    return http.GET(`${resource}/is-liked/${params}`, {}, false, false, langCodes);
  }
}
