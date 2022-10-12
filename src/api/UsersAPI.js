import {instance} from "./API";

export const usersAPI = {

    getUsersThunk(currentPage: number, pageSize: number,
                  term: string = '', friend: null | boolean = null) {


        const urlQuery = `users?page=${currentPage}&count=${pageSize}`
            + (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)

        return instance.get(urlQuery)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(res => res.data)
    },


    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(res => res.data)
    }

}
//
// export const usersAPI = {
//     getUsersThunk(currentPage, pageSize) {
//         return instance.get(`users?page=${currentPage} &count=${pageSize}`)
//
//     },
//     unfollow(userId) {
//         return instance.delete(`follow/${userId}`)
//
//     },
//     follow(userId) {
//         return instance.post(`follow/${userId}`)
//
//     }
// }