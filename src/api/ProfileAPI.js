import {instance} from "./API";

export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(res => res.data)
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(res => res.data)
    },

    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
            .then(res => res.data)
    },

    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData)
            .then(res => res.data)

    },

    saveProfile(formData) {
        return instance.put(`profile`, formData)
            .then(res => res.data)
    }
}