import {usersAPI} from "../../api/UsersAPI";
import {updateObjectInArray} from "../../utils/object-helpers";

// const FOLLOW = "FOLLOW"
// const UNFOLLOW = "UNFOLLOW"
// const SET_USERS = "SET_USERS"
// const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
// const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT"
// const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
// const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"


let initialState = {
    users: [], pageSize: 5, totalUsersCount: 101,
    currentPage: 1, isFetching: false, followingInProgress: [],
    filter: {term: '', friend: null}

};


const usersReducer = (state = initialState, action) => {


    switch (action.type) {

        case 'SN/USERS/FOLLOW':
            return {
                ...state, // users: [...state.users] Аналогично примеру ниже
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                // users: state.users.map(user => {
                //     if (user.id === action.userId) {
                //         return {...user, followed: true}
                //     }
                //     return user
                // })
            }


        case 'SN/USERS/UNFOLLOW':
            return {
                ...state, // users: [...state.users] Аналогично примеру ниже
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                // users: state.users.map(user => {
                //     if (user.id === action.userId) {
                //         return {...user, followed: false}
                //     }
                //     return user
                // })
            }

        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }

        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }

        case 'SN/USERS/SET_TOTAL_USERS_COUNT':

            if (action.totalUsersCount > 101) {
                return {
                    ...state,
                    totalUsersCount: 101
                    // если так вывести без условия то создаст 4 тыс страниц!
                }
            } else {
                return {
                    ...state,
                    totalUsersCount: action.totalUsersCount
                }
            }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case 'SN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }


        default:
            return state;
    }
}
//
// export const followSuccess = (userId) => ({
//     type: FOLLOW, userId
// })
//
// export const unfollowSuccess = (userId) => ({
//     type: UNFOLLOW, userId
// })
//
// export const setUsers = (users) => ({
//     type: SET_USERS, users
// })
//
// export const setCurrentPage = (currentPage) => ({
//     type: SET_CURRENT_PAGE, currentPage
// })
//
// export const setTotalUsersCount = (totalUsersCount) => ({
//     type: SET_USERS_TOTAL_COUNT, count: totalUsersCount
// })
//
// export const toggleIsFetching = (isFetching) => ({
//     //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
//     type: TOGGLE_IS_FETCHING, isFetching
// })
// export const toggleFollowingProgress = (isFetching, userId) => ({
//     //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
//     type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
// })
export const actions = {

    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId}),

    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId}),

    setUsers: (users) => ({type: 'SN/USERS/SET_USERS', users}),

    setCurrentPage: (currentPage: number) => ({
        type: 'SN/USERS/SET_CURRENT_PAGE',
        currentPage
    }),

    setFilter: (filter) => ({
        type: 'SN/USERS/SET_FILTER',
        payload: filter
    }),


    setTotalUsersCount: (
        totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        totalUsersCount: totalUsersCount
    }),


    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching
    }),


    toggleFollowingProgress: (
        isFetching,
        userId) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    })

}


//////////////САНКИ
//создаем функцию thunk которую можно отправить с помошью dispatch и отправляет как CALLBACK!!!!
//  export const usersThunk = (page, pageSize) => {
//
//     return async (dispatch) => {
//         dispatch(toggleIsFetching(true))
//         dispatch(setCurrentPage(page))
//
//
//         let response = await usersAPI.getUsersThunk(page, pageSize)
//         dispatch(toggleIsFetching(false))
//         dispatch(setUsers(response.data.items))
//         dispatch(setTotalUsersCount(response.data.totalCount))
//     }
// }
// //РЕФАКТОР и вынес дублирующего кода
// const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
//     dispatch(toggleFollowingProgress(true, userId))
//
//     let response = await apiMethod(userId)
//     if (response.data.resultCode === 0) {
//         dispatch(actionCreator(userId))
//     }
//     dispatch(toggleFollowingProgress(false, userId))
// }
//
// export const follow = (userId) => {
//
//     return async (dispatch) => {
//         followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
//     }
// }
//
// export const unfollow = (userId) => {
//
//     return async (dispatch) => {
//         followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
//     }
// }
//
//
// export default usersReducer;
export const usersThunk = (
    page: number, pageSize: number, filter) => {

    return async (
        dispatch) => {

        dispatch(actions.toggleIsFetching(true))

        dispatch(actions.setCurrentPage(page))

        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsersAPI(
            page, pageSize, filter.term, filter.friend)

        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }

}


let followUnfollowFlow = async (
    dispatch, userId: number,
    apiMethod,
    actionCreator) => {

    dispatch(actions.toggleFollowingProgress(true, userId))

    let responseData = await apiMethod(userId)

    if (responseData.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.toggleFollowingProgress(false, userId))

}


export const follow = (userId: number) => {

    return async (dispatch) => {

        let apiMethodFollow = usersAPI.follow.bind(usersAPI)

        await followUnfollowFlow(dispatch, userId, apiMethodFollow, actions.followSuccess)

    }
}


export const unfollow = (userId: number) => {

    return async (dispatch) => {

        //let apiMethodUnfollow = usersAPI.unfollow.bind( usersAPI );
        // Дима так сделал что бы не создавать типо лишние переменные
        // тоесть сразу bind сделал в параметрах

        await followUnfollowFlow(dispatch, userId,
            usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)

    }
}

export default usersReducer