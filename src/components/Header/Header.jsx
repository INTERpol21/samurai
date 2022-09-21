import style from "./Header.module.css"
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (

        <header className={style.header}>

            <div className={style.container}>

                <img
                    src="https://i.pinimg.com/originals/82/12/e3/8212e3207e68b986fa25423918bb91d7.png"
                    alt="logo"
                />
                <div>
                    {props.isAuth ? props.login
                        : <NavLink className={style.login} to={'/login'}>Login</NavLink>}
                </div>

            </div>


        </header>
    )
}

export default Header;