import {APIResponseType, instance, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./API";
import {ValueObjLoginType} from "../redux/Reducer/AuthReducer";


type MeResponseDataType = {
    id: number,
    email: string,
    login: string,
}


type LoginResponseDataType = { userId: number }

type LoginResultCode = ResultCodeEnum | ResultCodeForCaptchaEnum


export const authAPI = {

    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me/`)

    },
    login(values: ValueObjLoginType) {
        return instance.post<APIResponseType<LoginResponseDataType, LoginResultCode>>(`auth/login/`, {values})

    },
    logout() {
        return instance.delete(`auth/login/`)

    },
}

