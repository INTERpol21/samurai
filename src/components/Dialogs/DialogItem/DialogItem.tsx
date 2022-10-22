import style from "../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import React, {FC} from "react";


type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {

    return (
        <div className={style.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;
