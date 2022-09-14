import profileReducer from "./Reducer/ProfileReducer";
import dialogsReducer from "./Reducer/DialogsReducer";
import sidBarReducer from "./Reducer/SidBarReducer";
//action creator, action type
// const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
// const SEND_MESSAGE = "SEND-MESSAGE";
//Переписал под ООП Инкапсуляция
let store = {
    //По договорености _ делает метод приватным
    _state: {
        profilePage: {
            posts: [{id: 1, message: "Hi, how are you?", likesCount: 12}, {
                id: 2, message: "It my first post", likesCount: 22
            }, {id: 3, message: "Hi, how are you?", likesCount: 32}, {
                id: 4, message: "It my first post", likesCount: 42
            }, {id: 5, message: "Hi, how are you?", likesCount: 52}, {
                id: 6,
                message: "It my first post",
                likesCount: 62
            },],
            newPostText: ""
        }, dialogsPage: {
            dialogs: [{id: 1, name: "Антон"}, {id: 2, name: "Василий"}, {id: 3, name: "Екатерина"}, {
                id: 4, name: "Владимир"
            }, {id: 5, name: "Нюша"}, {id: 6, name: "Слава"},],
            messages: [{id: 1, message: "Lorem ipsum dolor sit amet"}, {
                id: 2, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."
            }, {id: 3, message: "Ac placerat vestibulum lectus mauris ultrices eros in cursus"}, {
                id: 4, message: "Lorem ipsum dolor sit amet"
            }, {id: 5, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."}, {
                id: 6, message: "Lorem ipsum dolor sit amet"
            },],
            newMessageBody: ""
        },
        sideBar: {},

    },
    getState() {

        return this._state
    },
    //вызываем замыкание
    _callSubscriber() {
        console.log("State change")
    },
    // addPost() {
    //
    //     let newPost = {
    //         id: 7, //Вводим начальную строку
    //         message: this._state.profilePage.newPostText, likesCount: 0
    //     };
    //     this._state.profilePage.posts.push(newPost);
    //     //Делаем пустую строку после ввода
    //     this._state.profilePage.newPostText = "";
    //
    //     this._callSubscriber(this._state);
    // },
    // updateNewPostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //
    //     this._callSubscriber(this._state);
    //
    // },
    subscribe(observer) {

        //принимаем в родительском мире let rerenderEntireTree и присваиваем observer
        this._callSubscriber = observer //наблюдатель = observer патерн!

    },
    //Весь state меняется только через dispatch
//action это объект, мы Отправляем какое то действие(dispatch)
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sideBar = sidBarReducer(this._state.sideBar, action)
        this._callSubscriber(this._state)

        // if (action.type === ADD_POST) {
        //     let newPost = {
        //         id: 7, //Вводим начальную строку
        //         message: this._state.profilePage.newPostText, likesCount: 0
        //     };
        //     this._state.profilePage.posts.push(newPost);
        //     //Делаем пустую строку после ввода
        //     this._state.profilePage.newPostText = "";
        //     this._callSubscriber(this._state);
        // } else if (action.type === UPDATE_NEW_POST_TEXT) {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._callSubscriber(this._state);
        //
        //
        // } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
        //     this._state.dialogsPage.newMessageBody = action.body;
        //     this._callSubscriber(this._state);
        // } else if (action.type === SEND_MESSAGE) {
        //     let body = {id: 7, message: this._state.dialogsPage.newMessageBody}
        //     this._state.dialogsPage.newMessageBody = "";
        //     this._state.dialogsPage.messages.push(body)
        //     this._callSubscriber(this._state);
        // }

    }

}

// export const addPostActionCreator = () => ({
//     type: ADD_POST
// })
//
// export const updateNewPostTextActionCreator = (text) => ({
//     type: UPDATE_NEW_POST_TEXT, newText: text
// })
//
//
// export const  sendMessageCreator= () => ({
//     type: SEND_MESSAGE
// })
//
// export const updateNewMessageBodyCreator = (body) => ({
//     type: UPDATE_NEW_MESSAGE_BODY, body: body
// })

// //вызываем замыкание
// let rerenderEntireTree = () => {
//     console.log("State change")
// }
//
// let state = {
//     profilePage: {
//         posts: [{id: 1, message: "Hi, how are you?", likesCount: 12}, {
//             id: 2, message: "It my first post", likesCount: 22
//         }, {id: 3, message: "Hi, how are you?", likesCount: 32}, {
//             id: 4, message: "It my first post", likesCount: 42
//         }, {id: 5, message: "Hi, how are you?", likesCount: 52}, {id: 6, message: "It my first post", likesCount: 62},],
//         newPostText: ""
//     }, dialogsPage: {
//         dialogs: [{id: 1, name: "Антон"}, {id: 2, name: "Василий"}, {id: 3, name: "Екатерина"}, {
//             id: 4, name: "Владимир"
//         }, {id: 5, name: "Нюша"}, {id: 6, name: "Слава"},], messages: [{id: 1, message: "Lorem ipsum dolor sit amet"}, {
//             id: 2, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."
//         }, {id: 3, message: "Ac placerat vestibulum lectus mauris ultrices eros in cursus"}, {
//             id: 4, message: "Lorem ipsum dolor sit amet"
//         }, {id: 5, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."}, {
//             id: 6, message: "Lorem ipsum dolor sit amet"
//         },]
//     }
//
// }
// //Проверка состояния и ввода данных в state в частности в newPostText
// // window.state = state;

// export const addPost = () => {
//     let newPost = {
//         id: 7, //Вводим начальную строку
//         message: state.profilePage.newPostText, likesCount: 0
//     };

//
//     state.profilePage.posts.push(newPost);
//     //Делаем пустую строку после ввода
//     state.profilePage.newPostText = "";
//
//     rerenderEntireTree(state);
// }

// export const updateNewPostText = (newText) => {
//     state.profilePage.newPostText = newText;
//
//     rerenderEntireTree(state);
//
// }

// export const subscribe = (observer) => {
//
//     //принимаем в родительском мире let rerenderEntireTree и присваиваем observer
//     rerenderEntireTree = observer //наблюдатель = observer патерн!
//
// }

window.store = store;
export default store;