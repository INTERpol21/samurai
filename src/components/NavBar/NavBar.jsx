import style from "./NavBar.module.css"
import {NavLink} from "react-router-dom";

const isActive = (e) => {
    return e.isActive ? style.active : style.item;
}

const NavBar = () => {

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
                <NavLink className={isActive} to="/news">News</NavLink>
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