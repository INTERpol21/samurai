import style from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, Form, Formik} from "formik";


//либо вытягивать из props с помошью JS {state}
const Dialogs = (props) => {


    let state = props.dialogsPage;


    let dialogsElements = state.dialogs
        .map((dialog, id) => <DialogItem name={dialog.name} key={id}/>)

    let messagesElements = state.messages
        .map((message, id) => <Message message={message.message} key={id}/>)

    // let newMessageBody = state.newMessageBody
    //
    // //STATE
    // let onSendMessageClick = () => {
    //
    //     props.sandMessage()
    // }
    //
    // let onNewMessageChange = (event) => {
    //     //target это и есть input
    //     let body = event.target.value;
    //     props.updateNewMessageBody(body)
    //
    // }

    const AddMassageForm = (props) => {

        let addNewMessage = (values) => {
            props.sendMessage(values);
        }

        return (
            <Formik
                initialValues={{
                    newMessageBody: ""
                }}
                onSubmit={(values, {resetForm}) => {
                    addNewMessage(values.newMessageBody);
                    resetForm({values: ''});
                }
                }
            >
                {() => (
                    <Form>
                        <div>
                            <Field
                                name={'newMessageBody'}
                                as={'textarea'}
                                placeholder={'Введите текст'}
                            />
                        </div>

                        <button type={'submit'}>Send</button>
                    </Form>
                )}
            </Formik>
        )
    }


    return (
        <div className={style.dialog__inner}>
            <div className={style.dialogs__items}>
                {dialogsElements}
            </div>
            <div className={style.dialogs__messages}>
                <div>{messagesElements}</div>
                <div>
                    <AddMassageForm sendMessage={props.sendMessage}/>
                    {/*<form>*/}
                    {/*    <input type="text" value={newMessageBody} placeholder={"Напиши текст"}*/}
                    {/*           onChange={onNewMessageChange}/>*/}
                    {/*    <button type={"button"} onClick={onSendMessageClick}>Message</button>*/}
                    {/*</form>*/}
                </div>
            </div>
        </div>

    )
}

export default Dialogs;
