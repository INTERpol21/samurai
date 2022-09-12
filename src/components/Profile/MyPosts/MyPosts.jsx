import  {createRef} from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsElements = props.posts.map((post,id) => <Post key={id} message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = createRef();
    let addPost = () => {
        let text = newPostElement.current.value;
        //Фунция из BLL(redux)
        props.addPost(text);


    }
    //Срабатывает всякий раз когда мы хотим изменить содержимое input(newPostElement)
    let onPostChange=()=>{
        let text = newPostElement.current.value;
        //Фунция из BLL(redux)
        props.updateNewPostText(text)
    // console.log(text)
    }

    return (<div className={style.blockPosts}>

        <h2>My posts</h2>
        <div>
            <form>
                <input onChange={onPostChange} value={props.newPostText} type="text" ref={newPostElement} placeholder={"Напиши текст"}/>
                <button type={"button"} onClick={addPost}>Add post</button>
            </form>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    </div>)
}

export default MyPosts;