import {instance} from "./API";
import {profileAPI} from "./ProfileAPI";


export const usersAPI = {

    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage} &count=${pageSize}`)
    },

    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },

    follow(userId) {
        return instance.post(`follow/${userId}`)
    },

    getProfile(userId) {
        //console.warn('это старый метод - переделай его на
        //profileAPI.getProfile');
        return profileAPI.getProfile(userId);
    }

}

