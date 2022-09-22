import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "ce31efa1-7b01-45a6-b9af-d029d3088c40"}
})


export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage} &count=${pageSize}`)
            .then(response => response.data)
    },
    unFollowedButton(user) {
        return instance.delete(`follow/${user.id}`)
            .then(response => response.data)
    },
    followedButton(user) {
        return instance.post(`follow/${user.id}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)

    }
}

