import request from '@/utils/request'

export default {
  // 查询所有
  getPageList(page, size, searchMap) {
    return request(
      {
        url: `/reservation/search/${page}/${size}`,
        method: 'post',
        data: searchMap
      }
    )
  }
}
