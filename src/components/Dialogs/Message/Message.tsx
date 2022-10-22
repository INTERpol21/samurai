import style from "../Dialogs.module.css"
import React, {FC} from "react";

type PropsType = { message: string }

const Message: FC<PropsType> = (props) => {
    return (
        <p className={style.message}> {props.message}</p>
    )
}


export default Message;
