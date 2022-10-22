import {updateObjectInArray} from "../../utils/object-helpers";
import {usersAPI} from "../../api/UsersAPI";
import {UserType} from "../../types/types";
import {AppThunk, InferActionsTypes} from "../redux-store";
import {APIResponseType} from "../../api/API";
import {Dispatch} from "redux";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5, totalUsersCount: 101,
    currentPage: 1, isFetching: false,
    followingInProgress: [] as Array<(number)>,//Array id users
    filter: {term: '', friend: null as null | boolean}
};


export type InitialStateUsersReducerType = typeof initialState

export type FilterUsersReducerType = typeof initialState.filter

type ActionsType = InferActionsTypes<typeof actions>



const usersReducer = (state = initialState, action: ActionsType): InitialStateUsersReducerType => {


    switch (action.type) {

        case 'SN/USERS/FOLLOW':
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
        case 'SN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }

        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export const actions = {

    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),

    unfollowSuccess: (userId: number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) => ({
        type: 'SN/USERS/SET_CURRENT_PAGE',
        currentPage
    } as const),

    setFilter: (filter: FilterUsersReducerType) => ({
        type: 'SN/USERS/SET_FILTER',
        payload: filter
    } as const),


    setTotalUsersCount: (
        totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
        totalUsersCount: totalUsersCount
    } as const),


    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching
    } as const),


    toggleFollowingProgress: (
        isFetching: boolean,
        userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)

}

// type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
//     SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType
//
// type FollowSuccessActionType = {
//     type: typeof FOLLOW
//     userId: number | null
// }
// export const followSuccess = (userId: number ): FollowSuccessActionType => ({
//     type: FOLLOW, userId
// })
//
// type UnfollowSuccessActionType = {
//     type: typeof UNFOLLOW
//     userId: number | null
// }
// export const unfollowSuccess = (userId: number ): UnfollowSuccessActionType => ({
//     type: UNFOLLOW, userId
// })
//
// type SetUsersActionType = {
//     type: typeof SET_USERS
//     users: Array<UserType>
// }
// export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
//     type: SET_USERS, users
// })
//
// type SetCurrentPageActionType = {
//     type: typeof SET_CURRENT_PAGE
//     currentPage: number
// }
// export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
//     type: SET_CURRENT_PAGE, currentPage
// })
//
// type SetTotalUsersCountActionType = {
//     type: typeof SET_USERS_TOTAL_COUNT
//     TotalUsersCount: number
// }
// export const setTotalUsersCount = (TotalUsersCount: number): SetTotalUsersCountActionType => ({
//     type: SET_USERS_TOTAL_COUNT, TotalUsersCount: TotalUsersCount
// })
//
// type ToggleIsFetchingActionType = {
//     type: typeof TOGGLE_IS_FETCHING
//     isFetching: boolean
// }
// export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
//     //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
//     type: TOGGLE_IS_FETCHING, isFetching
// })
//
// type ToggleFollowingProgressActionType = {
//     type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
//     isFetching: boolean
//     userId: number | null
// }
// export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({
//     //Если наш usersReducer из action принимает isFetching/ То и второе значение тут isFetching
//     type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
// })


//////////////САНКИ
//создаем функцию thunk которую можно отправить с помошью dispatch и отправляет как CALLBACK!!!!
export const requestUsers = (
    page: number, pageSize: number, filter: FilterUsersReducerType): AppThunk => {

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


type ActionCreatorTypesFor_followUnfollowFlow = (
    userId: number) => ActionsType;

type DispatchType = Dispatch<ActionsType>;

type ApiMethodType = (userId: number) => Promise<APIResponseType>


let _followUnfollowFlow = async (
    dispatch: DispatchType, userId: number,
    apiMethod: ApiMethodType,
    actionCreator: ActionCreatorTypesFor_followUnfollowFlow) => {

    dispatch(actions.toggleFollowingProgress(true, userId))

    let responseData = await apiMethod(userId)

    if (responseData.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.toggleFollowingProgress(false, userId))

}


export const follow = (userId: number): AppThunk => {

    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.followSuccess)

    }
}


export const unfollow = (userId: number): AppThunk => {

    return async (dispatch) => {

        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)

    }
}

export default usersReducer
