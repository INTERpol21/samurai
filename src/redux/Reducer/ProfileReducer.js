//action creator, action type


const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = "SET_USER_PROFILE"
let initialState = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It my first post", likesCount: 22},
        {id: 3, message: "Hi, how are you?", likesCount: 32},
        {id: 4, message: "It my first post", likesCount: 42},
        {id: 5, message: "Hi, how are you?", likesCount: 52},
        {id: 6, message: "It my first post", likesCount: 62},
    ],

    newPostText: "",
    profile: null
};


const profileReducer = (state = initialState, action) => {


    switch (action.type) {

        case ADD_POST: {
            // let newPost = {
            //     id: 7, message: state.newPostText, likesCount: 0
            // };
            //Копия и пуш объекта
            return {
                ...state,
                newPostText: "",
                posts: [...state.posts, {
                    id: 7, message: state.newPostText, likesCount: 0
                }]
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


        default:
            return state;
    }
}

//Action's
export const addPostActionCreator = () => ({
    type: ADD_POST
})

export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT, newText: text
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, profile
})


export default profileReducer;