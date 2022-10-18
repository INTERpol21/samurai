import {instance} from "./API";


export const securityAPI = {

    getCaptchaAPI() {
        return instance.get(`/security/get-captcha-url`)
            .then(res => res.data)
    }

}