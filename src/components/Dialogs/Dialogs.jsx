import style from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {dialogsElements, messagesElements} from "../../Store/Store";





const Dialogs = () => {

    // let dialogs = [
    //     {id: 1, name: "Антон"},
    //     {id: 2, name: "Василий"},
    //     {id: 3, name: "Екатерина"},
    //     {id: 4, name: "Владимир"},
    //     {id: 5, name: "Нюша"},
    //     {id: 6, name: "Слава"},
    // ]
    //
    // let messages = [
    //     {id: 1, message: "Lorem ipsum dolor sit amet"},
    //     {id: 2, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."},
    //     {id: 3, message: "Ac placerat vestibulum lectus mauris ultrices eros in cursus"},
    //     {id: 4, message: "Lorem ipsum dolor sit amet"},
    //     {id: 5, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."},
    //     {id: 6, message: "Lorem ipsum dolor sit amet"},
    // ]
    //
    // let dialogsElements = dialogs
    //     .map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    //
    // let messagesElements = messages
    //     .map(message => <Message message={message.message} id={message.id}/>)


    return (
        <div className={style.dialog__inner}>
            <div className={style.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={style.dialogs__messages}>
                {messagesElements}
            </div>
        </div>

    )
}

export default Dialogs;
