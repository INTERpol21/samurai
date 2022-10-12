// import {authAPI} from "../../api/API";
// import {securityAPI} from "../../api/SecurityAPI";
//
// const SET_USER_DATA = "SET_USER_DATA"
//
//
// let initialState = {
//     userId: null,
//     email: null,
//     login: null,
//     isAuth: false
// };
//
//
// const authReducer = (state = initialState, action) => {
//
//
//     switch (action.type) {
//
//         case SET_USER_DATA:
//
//             return {
//                 ...state, ...action.payload
//             }
//
//         default:
//             return state
//     }
//
//
// }
//
// export const setAuthUserData = (userId, email, login, isAuth) => ({
//     type: SET_USER_DATA,
//     payload: {userId, email, login, isAuth}
// })
// //Санки
// //Залогинины мы или нет
// export const getAuthUserData = () => async (dispatch) => {
//     let response = await authAPI.me()
//     if (response.data.resultCode === 0) {
//         //Деструкуризация. Быть острожным с передачей и очередью setAuthUserData
//         let {id, email, login} = response.data.data
//         dispatch(setAuthUserData(id, email, login, true))
//     }
// }
//
//
// export const logout = (email, password, rememberMe) => async (dispatch) => {
//     let response = await authAPI.logout(email, password, rememberMe)
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false))
//
//     }
// }
//
//
// export const login = (email, password, rememberMe, setStatus) => {
//     return async (dispatch) => {
//         let response = await authAPI.login(email, password, rememberMe)
//         if (response.data.resultCode === 0) {
//             dispatch(getAuthUserData())
//         } else {
//             setStatus(response.data.messages)
//         }
//
//     }
// };
//
// export const getCaptchaUrl = () => {
//     return async (dispatch) => {
//         let response = await securityAPI.getCaptchaUrl()
//         if (response.data.resultCode === 0) {
//             dispatch(getAuthUserData())
//         } else {
//             setStatus(response.data.messages)
//         }
//
//     }
// };
//
//
// export default authReducer;
import {securityAPI} from "../../api/SecurityAPI";
import {ResultCodeEnum} from "../../api/API";
import {authAPI} from "../../api/AuthAPI";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (
    state = initialState, action) => {

    switch (action.type) {

        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/GET_CAPTCHA_URL_SUCCESS':

            return {
                //login55: true, // test
                ...state,
                //isAuth: 55,  // test
                ...action.payload
            }


        default:
            return state
    }

}


const actions = {

    setAuthUserData: (
        id: number | null, login: string | null,
        email: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA',
        payload: {id, login, email, isAuth}
    }),


    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    })

}


// Ниже санки
export const getAuthUserData = () => async (dispatch) => {
    try {
        let meData = await authAPI.me()
        //meData.data.email  // тут видно как нам тс подсказывает

        if (meData.resultCode === ResultCodeEnum.Success) {
            let {id, login, email} = meData.data
            dispatch(actions.setAuthUserData(id, login, email, true))
        }

    } catch (error) {
        console.log(error.message)
    }
}


export const logout = () => async (dispatch) => {

    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {

        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}


// export const login = (
//     values, setStatus, setFieldValue,
//     setSubmitting) => async (dispatch) => {
//
//     let loginData = await authAPI.login(values)
//
//     let resultCode = loginData.resultCode
//
//     if (resultCode === ResultCodeForCaptchaEnum.Success) {
//
//         await dispatch(getAuthUserData())
//
//     } else {
//
//         let textError = `resultCode: ${resultCode} - another mistake`
//
//         if (loginData.messages && loginData.messages.length) {
//             textError = `resultCode: ${resultCode} - ${loginData.messages.join()}`
//         }
//
//
//         if (resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
//
//             await dispatch(getCaptchaUrl())
//
//             textError = `enter symbols from the picture`
//
//         }
//
//         setStatus(textError)
//         setSubmitting(false)
//     }
//
// }
export const login = (email, password, rememberMe, setStatus) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            setStatus(response.data.messages)
        }

    }
}

export const getCaptchaUrl = () => async (dispatch) => {

    const responseData = await securityAPI.getCaptchaAPI()

    const captchaUrl = responseData.url

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))

}

export default authReducer
