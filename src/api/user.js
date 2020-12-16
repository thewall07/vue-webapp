import http from '@/utils/request.js'
export default {
<<<<<<< HEAD
  login(data) {
    return http({
      url: 'api/user/login',
      method: 'post',
      data
    })
  },
  logout() {
    return http({
      url: 'api/user/logout',
      method: 'post'
    })
  },
  getInfo(data) {
    return http({
      url: 'api/user/info',
      method: 'get',
      data
    })
  }
}
=======
    login(data) {
        return http({
            url: '/api/user/login',
            method: 'post',
            data
        })
    },
    logout() {
        return http({
            url: '/api/user/logout',
            method: 'post',
        })
    },
    getInfo(data) {
        return http({
            url: '/api/user/info',
            method: 'get',
            data
        })
    }
}
>>>>>>> 22efd214ec24c67b3a0e127c636d142e27bee6ea
