import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/Reducer/DialogsReducer";
import Dialogs from "./Dialogs";

//либо вытягивать из props с помошью JS {state}
const DialogsContainer = (props) => {


    let state = props.store.getState().dialogsPage;

    //STATE
    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (body) => {
        //target это и есть input
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (<Dialogs updateNewMessageBody={onNewMessageChange}
                     sandMessage={onSendMessageClick}
                     dialogsPage={state}/>)
}

export default DialogsContainer;
