//action creator, action type

const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
    dialogs: [
        {id: 1, name: "Антон"}, {id: 2, name: "Василий"},
        {id: 3, name: "Екатерина"}, {id: 4, name: "Владимир"},
        {id: 5, name: "Нюша"}, {id: 6, name: "Слава"},
    ],
    messages: [
        {id: 1, message: "Lorem ipsum dolor sit amet"},
        {id: 2, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."},
        {id: 3, message: "Ac placerat vestibulum lectus mauris ultrices eros in cursus"},
        {id: 4, message: "Lorem ipsum dolor sit amet"},
        {id: 5, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."},
        {id: 6, message: "Lorem ipsum dolor sit amet"},
    ],
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action) => {

    if (action.type === UPDATE_NEW_MESSAGE_BODY) {
        state.newMessageBody = action.body;


    } else if (action.type === SEND_MESSAGE) {
        let body = {id: 7, message: state.newMessageBody}
        state.newMessageBody = "";
        state.messages.push(body)

    }
    return state;
}

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE
})

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body
})

export default dialogsReducer;