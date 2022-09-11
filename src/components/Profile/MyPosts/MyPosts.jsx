import  {createRef} from "react";
import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
    let postsElements = props.posts
        .map((p, id) => <Post key={id} message={p.message} likesCount={p.likesCount}/>);

    let newPostElement = createRef();
    let addPost = () => {
        let text = newPostElement.current.value;
        props.addPost(text);
        newPostElement.current.value = "";
    }


    return (<div className={style.blockPosts}>

        <h2>My posts</h2>
        <div>
            <form>
                <input type="text" ref={newPostElement} placeholder={"Напиши пост"}/>
                <button type={"button"} onClick={addPost}>Add post</button>
            </form>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    </div>)
}

export default MyPosts;