//action creator, action type
import {profileAPI} from "../../api/ProfileAPI";
import {PhotosType, PostType, ProfileType} from "../../types/types";
import {AppThunk, InferActionsTypes} from "../redux-store";
import {ResultCodeEnum} from "../../api/API";

// const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const SET_USER_PROFILE = "SET_USER_PROFILE"
// const SET_STATUS = "SET_STATUS"
// const DELETE_POST = "DELETE_POST"
// const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"


let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It my first post", likesCount: 22},
        {id: 3, message: "Hi, how are you?", likesCount: 32},
        {id: 4, message: "It my first post", likesCount: 42},
        {id: 5, message: "Hi, how are you?", likesCount: 52},
        {id: 6, message: "It my first post", likesCount: 62},
    ] as Array<PostType>,

    profile: null as ProfileType | null,
    status: 'double click here to change status',
    newPostText: ''
};

export type InitialStateType = typeof initialState


type ActionsType = InferActionsTypes<typeof actions>



const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {


    switch (action.type) {

        case 'SN/PROFILE/ADD-POST': {


            let nextIdMessages = state.posts.length + 1

            let newPosts = {
                id: nextIdMessages + action.newPostText,
                message: action.newPostText,
                likesCount: 552
            }

            return {
                ...state,
                posts: [...state.posts, newPosts]
            }
        }
        // let newPost = {
        //     id: 7, message: state.newPostText, likesCount: 0
        // };
        //Копия и пуш объекта
        // let body = action.newPostText
        // return {
        //     ...state,
        //     posts: [...state.posts, {
        //         id: 7, message: body, likesCount: 0
        //     }],
        //     newPostText: "",
        // stateCopy.posts = [...state.posts, ]
        // stateCopy.posts.push(newPost);
        // //Зануление
        // stateCopy.newPostText = "";
        //
        // return stateCopy;


        // case UPDATE_NEW_POST_TEXT: {
        //     return {
        //         ...state,
        //         newPostText: action.newText
        //     }
        //     // stateCopy.newPostText = action.newText;
        //     //
        //     // return stateCopy;
        // }
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':

            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }


        default:
            return state;
    }
}


export const actions = {

    addPostActionCreator: (newPostText: string) => ({
        type: 'SN/PROFILE/ADD-POST', newPostText
    } as const),

    setUserProfile: (profile: ProfileType) => (
        {type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),

    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),

    deletePost: (postId: number) => ({type: 'SN/PROFILE/DELETE_POST', postId} as const),

    savePhotoSuccess: (photos: PhotosType) => ({
        type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos
    } as const)
}


//Action's


//Санки
export const getUserProfile = (userId: number): AppThunk => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))
}

export const getStatus = (userId: number): AppThunk => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}

export const updateStatus = (status: string): AppThunk => async (dispatch) => {

    try {
        const response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatus(status));
        }

    } catch (error) {
        console.log(error);
    }

}

export const savePhoto = (photoFile: any) => async (dispatch: any) => {

    const response = await profileAPI.savePhoto(photoFile);

    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }

}

export const saveProfile = (
    formData: ProfileType, setStatus: any, setSubmitting: any, goToViewMode: any): AppThunk =>
    async (dispatch, getState) => {

        const response = await profileAPI.saveProfile(formData);

        let resultCode = response.data.resultCode;

        if (resultCode === ResultCodeEnum.Success) {
            const userId = getState().auth.id;
            goToViewMode();
            if (userId) {
                await dispatch(getUserProfile(userId))
            } else {
                throw new Error('userId can\'t be null')
            }
        } else {

            let textError = `resultCode: ${resultCode} - ${response.data.messages.join(', ')}`;
        setStatus(textError);
        setSubmitting(false);
    }

};


export default profileReducer;