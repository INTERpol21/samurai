//Переписал под ООП Инкапсуляция
let store = {
    //По договорености _делает метод приватным
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
            },]
        }

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
//action это объект, мы Отправляем какое то действие(dispatch)
    dispatch(action) {

        if (action.type === 'ADD-POST') {

            let newPost = {
                id: 7, //Вводим начальную строку
                message: this._state.profilePage.newPostText, likesCount: 0
            };
            this._state.profilePage.posts.push(newPost);
            //Делаем пустую строку после ввода
            this._state.profilePage.newPostText = "";

            this._callSubscriber(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;

            this._callSubscriber(this._state);

        }

    }

}


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