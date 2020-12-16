import http from '@/utils/request.js'
export default {
<<<<<<< HEAD
  getHome() {
    return http({
      url: 'api/index/index',
      method: 'get'
    })
  }
=======
    getHome() {
        return http({
            url: '/api/index/index',
            method: 'get'
        })
    }
>>>>>>> 22efd214ec24c67b3a0e127c636d142e27bee6ea

}
