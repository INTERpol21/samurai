//action creator, action type
import {profileAPI} from "../../api/ProfileAPI";
import {PhotosType, PostType, ProfileType} from "../../types/types";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"


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

const profileReducer = (state = initialState, action: any): InitialStateType => {


    switch (action.type) {

        case ADD_POST: {

            // let newPost = {
            //     id: 7, message: state.newPostText, likesCount: 0
            // };
            //Копия и пуш объекта
            let body = action.newPostText
            return {
                ...state,
                posts: [...state.posts, {
                    id: 7, message: body, likesCount: 0
                }],
                newPostText: "",
            }
            // stateCopy.posts = [...state.posts, ]
            // stateCopy.posts.push(newPost);
            // //Зануление
            // stateCopy.newPostText = "";
            //
            // return stateCopy;
        }

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
            // stateCopy.newPostText = action.newText;
            //
            // return stateCopy;
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS:

            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }


        default:
            return state;
    }
}


//Action's
type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
    type: ADD_POST, newPostText
})


// export const updateNewPostTextActionCreator = (text) => ({
//     type: UPDATE_NEW_POST_TEXT, newText: text
// })
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE, profile
})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
    type: SET_STATUS, status
})

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})


//Санки
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {

    try {
        const response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }

    } catch (error) {
        console.log(error);
    }

}

export const savePhoto = (photoFile: any) => async (dispatch: any) => {

    const response = await profileAPI.savePhoto(photoFile);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }

}

export const saveProfile = (formData: any, setStatus: any, setSubmitting: any, goToViewMode: any) => async (dispatch: any, getState: any) => {

    const response = await profileAPI.saveProfile(formData);

    let resultCode = response.data.resultCode;

    if (resultCode === 0) {
        const userId = getState().auth.id;
        goToViewMode();
        dispatch(getUserProfile(userId));
    } else {

        let textError = `resultCode: ${resultCode} - ${response.data.messages.join(', ')}`;
        setStatus(textError);
        setSubmitting(false);
    }

};


export default profileReducer;