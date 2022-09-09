import style from "./MyPosts.module.css";
import {postsElements} from "../../../Store/Store";

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
                {postsElements}
            </div>
        </div>
    </div>)
}

export default MyPosts;