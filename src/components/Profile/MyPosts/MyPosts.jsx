import style from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {

    let posts = [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It my first post", likesCount: 22},
        {id: 3, message: "Hi, how are you?", likesCount: 32},
        {id: 4, message: "It my first post", likesCount: 42},
        {id: 5, message: "Hi, how are you?", likesCount: 52},
        {id: 6, message: "It my first post", likesCount: 62},
    ]
    let postsElements = posts
        .map(posts => <Post message={posts.message} likesCount={posts.likesCount}/>)

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
                {postsElements}
            </div>
        </div>
    </div>)
}

export default MyPosts;