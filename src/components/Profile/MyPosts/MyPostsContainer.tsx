import {actions} from "../../../redux/Reducer/ProfileReducer";
import MyPosts, {DispatchMyPostsPropsType, MapMyPostsPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateGlobalType} from "../../../redux/redux-store";


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


// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateNewPostText: (text) => {
//             let action = updateNewPostTextActionCreator(text)
//             dispatch(action);
//         },
//         addPost: (newPostText) => {
//             dispatch(addPostActionCreator(newPostText));
//         }
//     }
// }


let mapStateToProps = (state: AppStateGlobalType) => {
    return {
        posts: state.profilePage.posts
    }
}


const MyPostsContainer = connect<MapMyPostsPropsType,
    DispatchMyPostsPropsType, {}, AppStateGlobalType>(mapStateToProps,
    {
        addPost: actions.addPostActionCreator
    })(MyPosts)

export default MyPostsContainer
