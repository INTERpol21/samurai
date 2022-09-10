import style from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


const Dialogs = (props) => {
    let dialogsElements = props.state.dialogs
        .map(dialog => <DialogItem name={dialog.name} key={dialog.id}/>)

    let messagesElements = props.state.messages
        .map(message => <Message message={message.message} key={message.id}/>)


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
