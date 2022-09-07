import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
    return (<div className={style.blockPosts}>
        <h2>My posts</h2>
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add post</button>
            </div>
            <div className={style.posts}>
                <Post message="Hi, how are you?" like="20"/>
                <Post message="It my first post" like="15"/>
            </div>
        </div>
    </div>)
}

export default MyPosts;