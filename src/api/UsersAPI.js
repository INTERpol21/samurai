import {instance} from "./API";


export const usersAPI = {
    getUsersThunk(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage} &count=${pageSize}`)

    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)

    },
    follow(userId) {
        return instance.post(`follow/${userId}`)

    }
}

