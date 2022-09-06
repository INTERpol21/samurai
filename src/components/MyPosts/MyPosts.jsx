import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My posts
            <div>
                <div className={style.posts}>
                    <Post />
                    
                </div>
            </div>
        </div>
    )
}

export default MyPosts;