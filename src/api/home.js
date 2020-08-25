import http from '@/utils/request.js';
export default {
    getHome() {
        return http({
            url: 'api/index/index',
            method: 'get'
        })
    }

}