import {createRef} from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";


const MyPosts = (props) => {
    let postsElements = props.posts.map((post, id) => <Post key={id} message={post.message}
                                                            likesCount={post.likesCount}/>);

    let newPostElement = createRef();

    let onAddPost = () => {
        props.addPost();
        //Фунция из BLL(redux)
        // props.dispatch(addPostActionCreator());
    }
    //Срабатывает всякий раз когда мы хотим изменить содержимое input(newPostElement)
    let onPostChange = () => {
        let text = newPostElement.current.value;
        //Фунция из BLL(redux)newText:text так как в store.js action.newText
        //Перекидываем весь функционал и излишество в контейнер
        // let action = (updateNewPostTextActionCreator(text));
        // props.dispatch(action);
        props.updateNewPostText(text)
    }

    return (<div className={style.blockPosts}>

        <h2>My posts</h2>
        <div>
            <form>
                <input onChange={onPostChange} value={props.newPostText}
                       type="text" ref={newPostElement} placeholder={"Напиши текст"}/>
                <button type={"button"} onClick={onAddPost}>Add post</button>
            </form>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    </div>)
}

export default MyPosts;