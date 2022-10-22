import axios from "axios";
import {UserType} from "../types/types";


/*withCredentials: true Параметр настроек, разрешение кукис, API-KEY ключ взятые с сервера, в настройках профиля*/
export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "ce31efa1-7b01-45a6-b9af-d029d3088c40"}
})


export type APIResponseType<Data = {}, ResultCode = ResultCodeEnum> = {
    data: Data
    resultCode: ResultCode
    messages: Array<string>
}


export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
