import {instance} from "./API";


export const authAPI = {

    me() {
        return instance.get(`auth/me/`)

    },
    login(values) {
        return instance.post(`auth/login/`, {values})

    },
    logout() {
        return instance.delete(`auth/login/`)

    },
}

