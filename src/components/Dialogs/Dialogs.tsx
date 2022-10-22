import style from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {ErrorMessageWrapper} from "../../utils/validators/validators";
import * as Yup from "yup";
import React, {FC} from "react";
import {InitialStateType} from "../../redux/Reducer/DialogsReducer";


type DialogsPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage

    let dialogsElement = state.sidebar.map(d => <DialogItem name={d.name} id={d.id} key={d.id}/>)

    let messagesElement = state.messages.map(m => <Message message={m.message} key={m.id}/>)


    return (
        <div className={style.dialogs}>

            <div className={style.dialogsItems}>
                {dialogsElement}
            </div>

            <div className={style.massages}>

                <div>{messagesElement}</div>

            </div>

            <AddMassageForm sendMessage={props.sendMessage}/>

        </div>
    )
}


type AddMassageFormPropsType = {
    sendMessage: (newMessageBody: string) => void
}

const AddMassageForm: FC<AddMassageFormPropsType> = (props) => {

    const validationSchema = Yup.object().shape({

        newMessageBody: Yup.string()
            .min(2, 'Must be longer than 2 characters !')
            .max(100, 'Must be shorter than 100 characters !')
            .required('Required !')
    })

    const addNewMessage = (values: string) => {

        props.sendMessage(values)

    }

    return (
        <Formik
            initialValues={{
                newMessageBody: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {

                addNewMessage(values.newMessageBody)
                resetForm()
            }}
        >
            {() => (
                <Form>
                    <div>
                        <Field
                            name={'newMessageBody'}
                            as={'textarea'}
                            placeholder={'Enter your message'}
                        />
                    </div>
                    <ErrorMessage name="newMessageBody">
                        {ErrorMessageWrapper}
                    </ErrorMessage>

                    <button type={'submit'}>Send</button>
                </Form>
            )}
        </Formik>
    )
}

export default Dialogs

