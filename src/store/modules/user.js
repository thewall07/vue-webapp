import userApi from '@/api/user'
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token'),
        name: '',
        avatar: '',
        introduction: '',
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setName(state, name) {
            state.name = name;
        },
        setAvatar(state, avatar) {
            state.avatar = avatar;
        },
        setIntroduction(state, introduction) {
            state.introduction = introduction;
        }
    },
    actions: {
        // 用户登录
        login({
            commit
        }, formInfo) {
            const {
                username,
                password
            } = formInfo;
            return new Promise((resolve, reject) => {
                userApi.login({
                    username,
                    password
                }).then(res => {
                    const data = res.data.data;
                    commit('setToken', data.token);
                    localStorage.setItem(data.token);
                    resolve();
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 用户登出
        logout(commit, state) {
            return new Promise((resolve, reject) => {
                userApi.logout().then(res => {
                    commit('setToken', '');
                    localStorage.removeItem('token');
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 获取用户信息
        getInfo(commit, state) {
            return new Promise((resolve, reject) => {
                userApi.getInfo({
                    token: state.token
                }).then(res => {
                    const data = res.data.data;
                    if (!data) {
                        reject('Verification failed, please Login again.')
                    }
                    const {
                        roles,
                        name,
                        avatar,
                        introduction
                    } = data;
                    // roles must be a non-empty array
                    if (!roles || roles.length <= 0) {
                        reject('getInfo: roles must be a non-null array!')
                    }
                    commit('setAvatar', avatar);
                    commit('setName', name);
                    commit('setRoles', roles);
                    commit('setIntroduction', introduction);
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        }

    }
}