// //action creator, action type
//
// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
// const SEND_MESSAGE = "SEND-MESSAGE";
//
// type DialogType = {
//     id: number
//     name: string
// }
// type MessageType = {
//     id: number
//     message: string
// }
//
// let initialState = {
//     dialogs: [
//         {id: 1, name: "Антон"}, {id: 2, name: "Василий"},
//         {id: 3, name: "Екатерина"}, {id: 4, name: "Владимир"},
//         {id: 5, name: "Нюша"}, {id: 6, name: "Слава"},
//     ] as Array<DialogType>,
//     messages: [
//         {id: 1, message: "Lorem ipsum dolor sit amet"},
//         {id: 2, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."},
//         {id: 3, message: "Ac placerat vestibulum lectus mauris ultrices eros in cursus"},
//         {id: 4, message: "Lorem ipsum dolor sit amet"},
//         {id: 5, message: "Magnis dis parturient montes nascetur ridiculus mus mauris vitae."},
//         {id: 6, message: "Lorem ipsum dolor sit amet"},
//     ] as Array<MessageType>,
//
//     newMessageText: ""
// }
//
// export type InitialStateType = typeof initialState
//
// const dialogsReducer = (state = initialState, action: any): InitialStateType => {
//
// //
// //     if (action.type === UPDATE_NEW_MESSAGE_BODY) {
// //
// //         stateCopy.newMessageBody = action.body;
// //         return stateCopy
// //
// //     } else if (action.type === SEND_MESSAGE) {
// //         let body = {id: 7, message: stateCopy.newMessageBody}
// //         stateCopy.newMessageBody = "";
// //         stateCopy.messages.push(body)
// //
// //     }
// //     return stateCopy;
// // }
//     switch (action.type) {
//
//         case UPDATE_NEW_MESSAGE_BODY: {
//             return {
//                 ...state,
//                 newMessageText: action.body
//             }
//         }
//         case SEND_MESSAGE: {
// //             let newMessage = {id: 7, message: state.newMessageBody};
// // //Копия и пуш объекта
// //             stateCopy.messages = [...state.messages]
// //             stateCopy.messages.push(newMessage)
// //             //Зануление
// //             stateCopy.newMessageBody = "";
// //             let body = state.newMessageBody
//             let body = action.newMessageText
//             return {
//                 ...state,
//                 messages: [...state.messages,
//                     {id: 7, message: body}],
//                 newMessageText: "",
//             }
//         }
//         default:
//             return state;
//     }
// }
//
// type SendMessageCreatorActionType = {
//     type: typeof SEND_MESSAGE
//     newMessageText: string
// }
//
// export const sendMessageCreator = (newMessageText: string): SendMessageCreatorActionType => ({
//     type: SEND_MESSAGE,
//     newMessageText
// })
//
//
// // export const updateNewMessageBodyCreator = (body:string) => ({
// //     type: UPDATE_NEW_MESSAGE_BODY, body: body
// // })
//
// export default dialogsReducer;

import {InferActionsTypes} from "../redux-store";

type DialogType = {
    id: number,
    name: string
}

type MassageType = {
    id: number | string,
    message: string
}

let initialState = {

    sidebar: [
        {id: 1, name: 'Tom'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Ivan'},
        {id: 4, name: 'Valera'}
    ] as Array<DialogType>,

    messages: [
        {id: 1, message: 'hi 11'},
        {id: 2, message: 'hi 2'},
        {id: 3, message: 'hi 3'}
    ] as Array<MassageType>

}


export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>


const dialogsReducer = (
    state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case 'SN/DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody

            let nextIdMessages = state.messages.length + 1

            let newMessage = {
                id: nextIdMessages + body,
                message: body
            }

            return {
                ...state,
                messages: [...state.messages, newMessage]
            }


        default:
            return state
    }
}


export const actions = {

    sendMessageCreator: (newMessageBody: string) => ({
        type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody


    } as const)

}


export default dialogsReducer