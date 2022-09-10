import {rerenderEntireTree} from "../render";

let state = {
    profilePage: {
        posts: [{id: 1, message: "Hi, how are you?", likesCount: 12}, {
            id: 2,
            message: "It my first post",
            likesCount: 22
        }, {id: 3, message: "Hi, how are you?", likesCount: 32}, {
            id: 4,
            message: "It my first post",
            likesCount: 42
        }, {id: 5, message: "Hi, how are you?", likesCount: 52}, {id: 6, message: "It my first post", likesCount: 62},],
    }, dialogsPage: {
        dialogs: [{id: 1, name: "Антон"}, {id: 2, name: "Василий"}, {id: 3, name: "Екатерина"}, {
            id: 4,
            name: "Владимир"
        }, {id: 5, name: "Нюша"}, {id: 6, name: "Слава"},],
        messages: [{id: 1, message: "Lorem ipsum dolor sit amet"}, {
            id: 2,
            message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."
        }, {id: 3, message: "Ac placerat vestibulum lectus mauris ultrices eros in cursus"}, {
            id: 4,
            message: "Lorem ipsum dolor sit amet"
        }, {id: 5, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."}, {
            id: 6,
            message: "Lorem ipsum dolor sit amet"
        },]
    }

}

export let addPost = (postMessage) => {
    let newPost = {
        id: 7,
        message: postMessage,
        likesCount: 0
    };

    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export default state;