import style from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import React, {FC} from "react";


const isActive = (e: { isActive: boolean }) => {
    return e.isActive ? style.active : style.item;
}

const NavBar: FC = () => {

    return (

        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink className={isActive} to="/profile"
                >Profile</NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={isActive} to="/dialogs">Messages</NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={isActive} to="/users">Users</NavLink>
            </div>
            <div className={style.item}>
                <NavLink className={isActive} to="/about">About</NavLink>
            </div>
            {/*<div className={style.item}>*/}
            {/*    <NavLink className={isActive} to="/music">Music</NavLink>*/}
            {/*</div>*/}
            {/*<div className={style.item}>*/}
            {/*    <NavLink className={isActive} to="/settings">Settings</NavLink>*/}
            {/*</div>*/}
        </nav>
    )
}

export default NavBar;