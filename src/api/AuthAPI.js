import {instance} from "./API";


export const authAPI = {

    me() {
        return instance.get(`auth/me/`)

    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login/`, {email, password, rememberMe})

    },
    logout() {
        return instance.delete(`auth/login/`)

    },
}

