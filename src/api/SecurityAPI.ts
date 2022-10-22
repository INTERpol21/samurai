import {instance} from "./API";

type GetCaptchaURLResponseType = {
    data: any;
    url: string
}

export const securityAPI = {

    getCaptchaAPI() {
        return instance.get<GetCaptchaURLResponseType>(`/security/get-captcha-url`)
            .then(res => res.data)
    }

}