import {RootState} from "../redux-store";

export const selectIsAuth = (state: RootState) => {
    return state.auth.isAuth
}

export const selectCurrentUserLogin = (state: RootState) => {
    return state.auth.login
}
