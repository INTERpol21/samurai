import DialogItem from "../components/Dialogs/DialogItem/DialogItem";
import Message from "../components/Dialogs/Message/Message";
import Post from "../components/Profile/MyPosts/Post/Post";

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

export let postsElements = state.profilePage.posts
    .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

export let dialogsElements = state.dialogsPage.dialogs
    .map(dialog => <DialogItem name={dialog.name} key={dialog.id}/>)

export let messagesElements = state.dialogsPage.messages
    .map(message => <Message message={message.message} key={message.id}/>)

