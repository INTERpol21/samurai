import style from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";


//либо вытягивать из props с помошью JS {state}
const Dialogs = (props) => {


    let state = props.dialogsPage;


    let dialogsElements = state.dialogs
        .map((dialog, id) => <DialogItem name={dialog.name} key={id}/>)

    let messagesElements = state.messages
        .map((message, id) => <Message message={message.message} key={id}/>)

    let newMessageBody = state.newMessageBody

    //STATE
    let onSendMessageClick = () => {

        props.sandMessage()
    }

    let onNewMessageChange = (event) => {
        //target это и есть input
        let body = event.target.value;
        props.updateNewMessageBody(body)

    }


    return (
        <div className={style.dialog__inner}>
            <div className={style.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={style.dialogs__messages}>
                <div>{messagesElements}</div>
                <div>
                    <form>
                        <input type="text" value={newMessageBody} placeholder={"Напиши текст"}
                               onChange={onNewMessageChange}/>
                        <button type={"button"} onClick={onSendMessageClick}>Message</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Dialogs;
