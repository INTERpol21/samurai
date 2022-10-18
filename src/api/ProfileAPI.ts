import {instance} from "./API";

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number | null) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData);
    },
    saveProfile(formData: any) {
        return instance.put(`profile`, formData);
    }

}
