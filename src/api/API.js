import axios from "axios";


/*withCredentials: true Параметр настроек, разрешение кукис, API-KEY ключ взятые с сервера, в настройках профиля*/
export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {"API-KEY": "ce31efa1-7b01-45a6-b9af-d029d3088c40"}
})




