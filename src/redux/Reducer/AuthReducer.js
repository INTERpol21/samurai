// import {authAPI} from "../../api/AuthAPI";
//
// const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
// const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';
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
//         case GET_CAPTCHA_URL_SUCCESS:
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
//
// const getCaptchaUrlSuccess = (captchaUrl) => ({
//     type: GET_CAPTCHA_URL_SUCCESS,
//     payload: {captchaUrl}
// });
//
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
// export default authReducer;


import {authAPI} from "../../api/AuthAPI";
import {securityAPI} from "../../api/SecurityAPI";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    login: null,
    email: null,
    //isAuth: true
    isAuth: false,
    captchaUrl: null

}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:

            return {
                ...state,
                ...action.payload,
            }


        default:
            return state;
    }

}


const setAuthUserData = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {id, login, email, isAuth}
});


const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
});


// Ниже санки
export const getAuthUserData = () => async (dispatch) => {

    let response = await authAPI.me();

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true));
    }

}


export const logout = () => async (dispatch) => {

    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {

        dispatch(setAuthUserData(null, null, null, false));
    }
}


export const login = (values, setStatus, setFieldValue, setSubmitting) => async (dispatch) => {

    let response = await authAPI.login(values);

    let resultCode = response.data.resultCode;

    if (resultCode === 0) {

        dispatch(getAuthUserData());

    } else {

        let textError = `resultCode: ${resultCode} - another mistake`;

        if (response.data.messages && response.data.messages.length) {
            textError = `resultCode: ${resultCode} - ${response.data.messages.join()}`;
        }


        if (resultCode === 10) {

            dispatch(getCaptchaUrl())

            textError = `enter symbols from the picture`;

        }

        setStatus(textError);
        setSubmitting(false);

    }


}


export const getCaptchaUrl = () => async (dispatch) => {

    const response = await securityAPI.getCaptchaAPI();

    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));

}

export default authReducer;



