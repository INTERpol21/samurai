import {authAPI} from "../../api/AuthAPI";
import {securityAPI} from "../../api/SecurityAPI";
import {AppThunk, InferActionsTypes} from "../redux-store";

import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../../api/API";


// const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
// const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    //isAuth: true
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>


const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':

            return {
                ...state,
                ...action.payload,
            }


        default:
            return state;
    }

}

const actions = {

    setAuthUserData: (
        id: number | null, login: string | null,
        email: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA',
        payload: {id, login, email, isAuth}
    }) as const,


    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    }) as const

}

// type SetAuthUserDataActionPayloadType = {
//     id: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean
// }

// type SetAuthUserDataActionType = {
//     type: typeof SET_USER_DATA,
//     payload: SetAuthUserDataActionPayloadType
// }
//
//
// const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
//     type: SET_USER_DATA,
//     payload: {id, login, email, isAuth}
// });


// type GetCaptchaUrlSuccessActionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS,
//     payload: { captchaUrl: string }
// }
//
// const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
//     type: GET_CAPTCHA_URL_SUCCESS,
//     payload: {captchaUrl}
// });


// Ниже санки
export const getAuthUserData = (): AppThunk => async (dispatch) => {

    try {

        let response = await authAPI.me();

        if (response.data.resultCode === ResultCodeEnum.Success) {
            let {id, login, email} = response.data.data;
            dispatch(actions.setAuthUserData(id, login, email, true));
        }

    } catch (error: any) {
        console.log(error.response.status)
        console.log(error)
    }


}


export const logout = (): AppThunk => async (dispatch) => {

    let response = await authAPI.logout();

    if (response.data.resultCode === ResultCodeEnum.Success) {

        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export type ValueObjLoginType = {
    email: string, password: string, rememberMe: boolean,
    general: string, captcha: null | string
}

export const login = (values: ValueObjLoginType, setStatus: any, setFieldValue: any,
                      setSubmitting: any): AppThunk => async (dispatch) => {

    let response = await authAPI.login(values);

    let resultCode = response.data.resultCode;

    if (resultCode === ResultCodeForCaptchaEnum.Success) {

        await dispatch(getAuthUserData());

    } else {

        let textError = `resultCode: ${resultCode} - another mistake`;

        if (response.data.messages && response.data.messages.length) {
            textError = `resultCode: ${resultCode} - ${response.data.messages.join()}`;
        }


        if (resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {

            await dispatch(getCaptchaUrl())

            textError = `enter symbols from the picture`;

        }

        setStatus(textError)
        setSubmitting(false)

    }


}


export const getCaptchaUrl = (): AppThunk => async (dispatch) => {

    const response = await securityAPI.getCaptchaAPI();

    const captchaUrl = response.data.url;

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));

}

export default authReducer;



