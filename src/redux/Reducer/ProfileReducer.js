//action creator, action type

//
// const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const SET_USER_PROFILE = "SET_USER_PROFILE"
// const SET_STATUS = "SET_STATUS"
// const DELETE_POST = "DELETE_POST"


import {profileAPI} from "../../api/ProfileAPI";

let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It my first post", likesCount: 22},
        {id: 3, message: "Hi, how are you?", likesCount: 32},
        {id: 4, message: "It my first post", likesCount: 42},
        {id: 5, message: "Hi, how are you?", likesCount: 52},
        {id: 6, message: "It my first post", likesCount: 62},
    ],

    profile: null,
    status: 'double click here to change status'
};


const profileReducer = (state = initialState, action) => {


//     switch (action.type) {
//
//         case ADD_POST: {
//
//             // let newPost = {
//             //     id: 7, message: state.newPostText, likesCount: 0
//             // };
//             //Копия и пуш объекта
//             let body = action.newPostText
//             return {
//                 ...state,
//                 posts: [...state.posts, {
//                     id: 7, message: body, likesCount: 0
//                 }],
//                 newPostText: "",
//             }
//             // stateCopy.posts = [...state.posts, ]
//             // stateCopy.posts.push(newPost);
//             // //Зануление
//             // stateCopy.newPostText = "";
//             //
//             // return stateCopy;
//         },
//
//         case UPDATE_NEW_POST_TEXT: {
//             return {
//                 ...state,
//                 newPostText: action.newText
//             }
//             // stateCopy.newPostText = action.newText;
//             //
//             // return stateCopy;
//         }
//         case SET_USER_PROFILE: {
//             return {
//                 ...state,
//                 profile: action.profile
//             }
//         }
//         case SET_STATUS: {
//             return {
//                 ...state,
//                 status: action.status
//             }
//         }
//         case DELETE_POST: {
//             return {
//                 ...state,
//                 posts: state.posts.filter(p => p.id !== action.postId)
//             }
//         }
//
//
//         default:
//             return state;
//     }
// }
    switch (action.type) {

        case 'SN/PROFILE/ADD-POST': {

            let nextIdMessages = state.posts.length + 1

            let newPosts = {
                id: nextIdMessages + action.newPostText,
                message: action.newPostText,
                likesCount: 55
            }

            return {
                ...state,
                posts: [...state.posts, newPosts]
            }
        }

        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }

        case 'SN/PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }

        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }

        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }


        default:
            return state
    }
}
//Action's
export const actions = {

    addPostActionCreator: (newPostText) => ({
        type: 'SN/PROFILE/ADD-POST', newPostText
    }),

    setUserProfile: (profile) => (
        {type: 'SN/PROFILE/SET_USER_PROFILE', profile}),

    setStatus: (status) => ({type: 'SN/PROFILE/SET_STATUS', status}),

    deletePost: (postId) => ({type: 'SN/PROFILE/DELETE_POST', postId}),

    savePhotoSuccess: (photos) => ({
        type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos
    }),
}

// export const addPostActionCreator = (newPostText) => ({
//     type: ADD_POST, newPostText
// })
//
// export const updateNewPostTextActionCreator = (text) => ({
//     type: UPDATE_NEW_POST_TEXT, newText: text
// })
//
// export const setUserProfile = (profile) => ({
//     type: SET_USER_PROFILE, profile
// })
//
// export const setStatus = (status) => ({
//     type: SET_STATUS, status
// })
//
// export const deletePost = (postId) => ({type: DELETE_POST, postId})


//Санки
// export const getUserProfile = (userId) => async (dispatch) => {
//     let response = await profileAPI.getProfile(userId)
//     dispatch(actions.setUserProfile(response.data))
// }
//
// export const getStatus = (userId) => async (dispatch) => {
//     let response = await profileAPI.getStatus(userId)
//     dispatch(actions.setStatus(response.data))
// }
//
// export const updateStatus = (status) => async (dispatch) => {
//     let response = await profileAPI.updateStatus(status)
//     if (response.data.resultCode === 0) {
//         dispatch(actions.setStatus(status))
//     }
// }

export const getUserProfile = (userId) => async (dispatch) => {
    const responseData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(responseData))
}


export const getStatus = (userId) => async (dispatch) => {
    const responseData = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(responseData))
}


export const updateStatus = (status) => async (dispatch) => {
    try {
        const responseData = await profileAPI.updateStatus(status)
        if (responseData.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        console.log(error)
    }
}


export const savePhoto = (photoFile) => async (dispatch) => {
    const responseData = await profileAPI.savePhoto(photoFile)
    if (responseData.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(responseData.data.photos))
    }
}


export const saveProfile = (
    formData, setStatus, setSubmitting,
    goToViewMode) => async (
    dispatch, getState) => {
    const responseData = await profileAPI.saveProfile(formData)
    let resultCode = responseData.resultCode
    if (resultCode === 0) {
        const userId = getState().auth.id
        goToViewMode()
        if (userId) {
            await dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can\'t be null')
        }


    } else {
        let textError = `resultCode: ${resultCode} - ${responseData.messages.join(', ')}`
        setStatus(textError)
        setSubmitting(false)
    }
}

export default profileReducer;