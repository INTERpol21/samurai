import axios from "axios";
/*withCredentials: true Параметр настроек, разрешение кукис, API-KEY ключ взятые с сервера, в настройках профиля*/

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "ce31efa1-7b01-45a6-b9af-d029d3088c40"}
})


export const usersAPI = {
    getUsersThunk(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage} &count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)

    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)

    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
            .then(response => response.data)

    }
}
export const authAPI = {

    me() {
        return instance.get(`auth/me/`)

    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login/`, {email, password, rememberMe})

    },
    logout() {
        return instance.delete(`auth/login/`)

    },
}



