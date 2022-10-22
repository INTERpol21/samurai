import style from "./Post.module.css";
import React from "react";


type PropsType = {
    value: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {

    return (

        <div className={style.item}>
            <img src="https://coolsen.ru/wp-content/uploads/2021/06/138-8-1018x1024.jpg" alt="#"/>
            {props.value}
            <div>Like {props.likesCount}</div>
        </div>


    )
}

export default Post;