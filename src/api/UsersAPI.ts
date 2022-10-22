import {APIResponseType, GetItemsType, instance} from "./API";


export const usersAPI = {

    getUsersAPI(currentPage: number, pageSize: number,
                term: string = '', friend: null | boolean = null) {


        const urlQuery = `users?page=${currentPage}&count=${pageSize}`
            + (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)

        return instance.get<GetItemsType>(urlQuery)
            .then(response => response.data)
    },

    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },


    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(res => res.data)
    }

}

