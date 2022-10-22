import {APIResponseType, instance} from "./API";
import {PhotosType, ProfileType} from "../types/types";


type SavePhotoResponseData = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status/`, {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<SavePhotoResponseData>>(`profile/photo`, formData);
    },
    saveProfile(formData: ProfileType) {
        return instance.put(`profile`, formData);
    }

}
