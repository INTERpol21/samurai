import {updateObjectInArray} from "../../utils/object-helpers";
import {usersAPI} from "../../api/UsersAPI";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET_USERS"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"


let initialState = {
    users: [], pageSize: 5, totalUsersCount: 101,
    currentPage: 1, isFetching: false, followingInProgress: []

};


const usersReducer = (state = initialState, action) => {


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

export const followSuccess = (userId) => ({
    type: FOLLOW, userId
})

export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW, userId
})

export const setUsers = (users) => ({
    type: SET_USERS, users
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE, currentPage
})

export const setTotalUsersCount = (TotalUsersCount) => ({
    type: SET_USERS_TOTAL_COUNT, TotalUsersCount: TotalUsersCount
})

export const toggleIsFetching = (isFetching) => ({
    //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
    type: TOGGLE_IS_FETCHING, isFetching
})
export const toggleFollowingProgress = (isFetching, userId) => ({
    //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
    type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
})


//////////////САНКИ
//создаем функцию thunk которую можно отправить с помошью dispatch и отправляет как CALLBACK!!!!
export const requestUsersThunkCreator = (page, pageSize) => {

    return async (dispatch) => {
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
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}


export default usersReducer;
