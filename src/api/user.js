import http from '@/utils/request.js';
export default {
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