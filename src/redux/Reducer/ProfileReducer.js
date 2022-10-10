//action creator, action type
import {profileAPI} from "../../api/API";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"


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


        default:
            return state;
    }
}

//Action's
export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST, newPostText
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, profile
})

export const setStatus = (status) => ({
    type: SET_STATUS, status
})

export const deletePost = (postId) => ({type: DELETE_POST, postId})


//Санки
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}


export default profileReducer;