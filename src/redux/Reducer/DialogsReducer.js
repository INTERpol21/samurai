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
    newMessageText: ""
}

const dialogsReducer = (state = initialState, action) => {

//
//     if (action.type === UPDATE_NEW_MESSAGE_BODY) {
//
//         stateCopy.newMessageBody = action.body;
//         return stateCopy
//
//     } else if (action.type === SEND_MESSAGE) {
//         let body = {id: 7, message: stateCopy.newMessageBody}
//         stateCopy.newMessageBody = "";
//         stateCopy.messages.push(body)
//
//     }
//     return stateCopy;
// }
    switch (action.type) {

        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageText: action.body
            }
        }
        case SEND_MESSAGE: {
//             let newMessage = {id: 7, message: state.newMessageBody};
// //Копия и пуш объекта
//             stateCopy.messages = [...state.messages]
//             stateCopy.messages.push(newMessage)
//             //Зануление
//             stateCopy.newMessageBody = "";
//             let body = state.newMessageBody
            let body = action.newMessageText
            return {
                ...state,
                messages: [...state.messages,
                    {id: 7, message: body}],
                newMessageText: "",
            }
        }
        default:
            return state;
    }
}


export const sendMessageCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText})


export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, body: body
})

export default dialogsReducer;