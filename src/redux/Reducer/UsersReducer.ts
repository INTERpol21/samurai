import {updateObjectInArray} from "../../utils/object-helpers";
import {usersAPI} from "../../api/UsersAPI";
import {UserType} from "../../types/types";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5, totalUsersCount: 101,
    currentPage: 1, isFetching: false,
    followingInProgress: [] as Array<number> //Array id users
};


export type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: any): InitialStateType => {


    switch (action.type) {

        case FOLLOW:
            return {
                ...state, // users: [...state.users] Аналогично примеру ниже
                users: updateObjectInArray(state.users, action.userId,
                    "id", {followed: true})
                // users: state.users.map(user => {
                //     if (user.id === action.userId) {
                //         return {...user, followed: true}
                //     }
                //     return user
                // })
            }


        case UNFOLLOW:
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

        case SET_USERS: {
            return {...state, users: action.users}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_USERS_TOTAL_COUNT: {
            return {...state,}
            // totalUsersCount: action.count
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }


        default:
            return state;
    }
}
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number | null
}
export const followSuccess = (userId: number | null): FollowSuccessActionType => ({
    type: FOLLOW, userId
})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number | null
}
export const unfollowSuccess = (userId: number | null): UnfollowSuccessActionType => ({
    type: UNFOLLOW, userId
})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS, users
})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE, currentPage
})

type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    TotalUsersCount: number
}
export const setTotalUsersCount = (TotalUsersCount: number): SetTotalUsersCountActionType => ({
    type: SET_USERS_TOTAL_COUNT, TotalUsersCount: TotalUsersCount
})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
    type: TOGGLE_IS_FETCHING, isFetching
})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number | null
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number | null): ToggleFollowingProgressActionType => ({
    //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
})


//////////////САНКИ
//создаем функцию thunk которую можно отправить с помошью dispatch и отправляет как CALLBACK!!!!
export const requestUsersThunkCreator = (page: number, pageSize: number) => {

    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        //import {usersAPI} from "../../api/API";
        let response = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(response.data.items))
        dispatch(setTotalUsersCount(response.data.totalCount))
    }
}
//РЕФАКТОР и вынес дублирующего кода
const followUnfollowFlow = async (dispatch: any, userId: number | null, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number | null) => {

    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number | null) => {

    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}


export default usersReducer;
