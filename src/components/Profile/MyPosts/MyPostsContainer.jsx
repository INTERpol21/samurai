import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Reducer/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


// const MyPostsContainer = () => {
//
//     // let state = props.store.getState();
//     //
//     // let addPost = () => {
//     //     //Фунция из BLL(redux)
//     //     props.store.dispatch(addPostActionCreator());
//     // }
//     // //Срабатывает всякий раз когда мы хотим изменить содержимое input(newPostElement)
//     // let onPostChange = (text) => {
//     //     let action = (updateNewPostTextActionCreator(text));
//     //     props.store.dispatch(action);
//     // }
// //удаляем пропсы так как в пропсыыбольше ничего не приходит используем StoreContext
//     return (
//         <StoreContext.Consumer>{
//             (store) => {
//
//                 let state = store.getState();
//
//                 let addPost = () => {
//                     //Фунция из BLL(redux)
//                     store.dispatch(addPostActionCreator());
//                 }
//                 //Срабатывает всякий раз когда мы хотим изменить содержимое input(newPostElement)
//                 let onPostChange = (text) => {
//                     let action = (updateNewPostTextActionCreator(text));
//                     store.dispatch(action);
//                 }
//                 return (
//                     //Оставляем пропсы только в чистом компоненте
//                     <MyPosts updateNewPostText={onPostChange}
//                              addPost={addPost}
//                              posts={state.profilePage.posts}
//                              newPostText={state.profilePage.newPostText}/>)
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }


const mapStateToProps = (state) => {

    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action);
        },
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;