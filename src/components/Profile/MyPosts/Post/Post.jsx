import style from "./Post.module.css";

const Post = (props) => {

    return (

        <div className={style.item}>

            <img src="https://coolsen.ru/wp-content/uploads/2021/06/138-8-1018x1024.jpg" alt="#"/>
            {props.message}
            <div><span>Like </span>{props.likesCount}</div>
        </div>


    )
}

export default Post;