import React, {FC} from "react";

import {NavLink} from "react-router-dom";
import style from "./NotFound.module.css"

let NotFound: FC = () => {
    return (
        <div className={style.notFoundBlock}>
            <div> ...Page 404</div>
            <div>< br/></div>
            <div>
                <NavLink to='/'>
                    Go to main page
                </NavLink>
            </div>
        </div>
    )
}

export default NotFound