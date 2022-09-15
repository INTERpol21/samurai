import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/Reducer/ProfileReducer";
import MyPosts from "./MyPosts";


const MyPostsContainer = (props) => {

    let state = props.store.getState();

    let addPost = () => {
        //Фунция из BLL(redux)
        props.store.dispatch(addPostActionCreator());
    }
    //Срабатывает всякий раз когда мы хотим изменить содержимое input(newPostElement)
    let onPostChange = (text) => {
        let action = (updateNewPostTextActionCreator(text));
        props.store.dispatch(action);
    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                 posts={state.profilePage.posts} newPostText={state.profilePage.newPostText}/>)

}

export default MyPostsContainer;