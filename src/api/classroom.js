import request from '@/utils/request'

export default {
  getList() {
    return request(
      {
        url: '/classroom/list',
        method: 'get'
      }
    )
  },
  search(page, size, searchMap) {
    return request(
      {
        url: `/classroom/search/${page}/${size}`,
        method: 'get',
        data: searchMap
      }
    )
  },

  /* 新增教室 */
  addClassroom(searchMap) {
    return request(
      {
        url: '/classroom',
        method: 'post',
        data: searchMap
      }
    )
  }
}
