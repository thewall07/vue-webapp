import axios from 'axios';
import { Toast } from 'vant';
import store from '@/store';
import qs from 'qs';

// 可以提取功能函数

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {
//     Message({
//         message: msg,
//         duration: 1000,
//     });
// }
/**
 * 跳转登录页
 * 携带当前页面路由,以便登陆之后返回当前页面
 */
// const toLogin = () => {
//     router.replace({
//         path: '/login',
//         query: {
//             redirect: router.currentRoute.fullPath
//         }
//     })
// }

/** 
 * 请求失败后,错误统一处理
 * @params {Number} status 请求状态码
 */
// const errorHandle = (status, other) => {
//     switch (status) {
//         // 401未登录状态,跳转登录页
//         case 401:
//             toLogin();
//             break;
//             // 403 token过期,清除token 跳转登录页
//         case 403:
//             tip('登录过期,请重新登陆');
//             localStorage.removeItem('token');
//             store.commit('loginSucess', null);
//             setTimeout(() => {
//                 toLogin();
//             }, 1000)
//             break;
//         case 404:
//             tip('请求的资源不存在');
//             break;
//         default:
//             console.log(other);
//     }
// }
// 设置请求头
// axios.default.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

// process.env是Nodejs提供的一个API，它返回一个包含用户环境信息的对象。
// 通过NODE_ENV 判断当前环境是生产环境(production)还是开发环境(development) 自动切换不同域名
// 暂时开发环境和生产环境  所以域名暂时一样 
// if(process.env.NODE_ENV == "development"){ 
//     host = "http://shop.bufantec.com/bufan";
// }else{
//     host = "http://shop.bufantec.com/bufan";
// }
// 创建 axios 实例
const service = axios.create({
    baseUrl: process.env.VUE_APP_API, // api的base_url
    timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.getters.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)
// 响应拦截器
service.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;

                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面                
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('setToken', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;

                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            // errorHandle(error.response.status);
            return Promise.reject(error.response);
        }
    }
)


// 二次封装 修正config
function http(config) {
    if (config.method.toLowerCase() === 'post') {
        // post请求
        // 用来序列化post类型的数据，后面会提到
        config.data = qs.stringify(config.data, {
            arrayFormat: 'repeat',
            allowDots: true
        })
    } else {
        // get请求
        config.params = config.data;
    }
    return service(config)
}
export default http

// 使用
// import http from '@utils/request'

// export function getKind(data){
//     return http({
//         url:'/zw/api/admin/kind/list',
//         method:'get',
//         data
//     })
// }

// import {getKind} from 'xxx.js'
// getKind()


// export default {
//     getKind(data) {
//         return http({
//             url: '/zw/api/admin/kind/list',
//             method: 'get',
//             data
//         })
//     }
// }
// import kindApi from 'xxx'
// kindApi.getKind()