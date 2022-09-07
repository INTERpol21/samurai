import style from "./Dialogs.module.css"
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={style.item + " " + style.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}
const Message = (props) => {
    return (
        <p className={style.message}>{props.message}</p>
    )
}


const Dialogs = () => {
    return (
        <div className={style.dialog__inner}>
            <div className={style.dialogs__items}>
                <DialogItem name="Антон" id="1"/>
                <DialogItem name="Василий" id="2"/>
                <DialogItem name="Екатерина" id="3"/>
                <DialogItem name="Владимир" id="4"/>
                <DialogItem name="Нюша" id="5"/>
                <DialogItem name="Слава" id="6"/>
            </div>
            <div className={style.dialogs__messages}>
                <Message message="Lorem ipsum dolor sit amet"/>
                <Message message="Magnis dis parturient montes nascetur ridiculus mus mauris vitae. "/>
                <Message message="Ac placerat vestibulum lectus mauris ultrices eros in cursus."/>
            </div>
        </div>

    )
}

export default Dialogs;
