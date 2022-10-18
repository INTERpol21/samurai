import {instance} from "./API";
import {profileAPI} from "./ProfileAPI";


export const usersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage} &count=${pageSize}`)
    },

    unfollow(userId: number | null) {
        return instance.delete(`follow/${userId}`)
    },

    follow(userId: number | null) {
        return instance.post(`follow/${userId}`)
    },

    getProfile(userId: number | null) {
        //console.warn('это старый метод - переделай его на
        //profileAPI.getProfile');
        return profileAPI.getProfile(userId);
    }

}

