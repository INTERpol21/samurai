import {actions} from "../../redux/Reducer/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";
import React from "react";


//либо вытягивать из props с помошью JS {state}
// const DialogsContainer = () => {
//
//
//     // let state = props.store.getState().dialogsPage;
//     //
//     // //STATE
//     // let onSendMessageClick = () => {
//     //     props.store.dispatch(sendMessageCreator())
//     // }
//     //
//     // let onNewMessageChange = (body) => {
//     //     //target это и есть input
//     //     props.store.dispatch(updateNewMessageBodyCreator(body))
//     // }
//
// //удаляем пропсы так как в пропсыыбольше ничего не приходит используем StoreContext
//     return (
//         <StoreContext.Consumer>{
//             (store) => {
//
//                 //STATE
//                 let onSendMessageClick = () => {
//                     store.dispatch(sendMessageCreator())
//                 }
//
//                 let onNewMessageChange = (body) => {
//                     //target это и есть input
//                     store.dispatch(updateNewMessageBodyCreator(body))
//                 }
//                 return (
//                     //Оставляем пропсы только в чистом компоненте
//                     <Dialogs updateNewMessageBody={onNewMessageChange}
//                              sandMessage={onSendMessageClick}
//                              dialogsPage={store.getState().dialogsPage}/>)
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }
//настраиваем свойство, которое мы возьмем из state.dialogsPage

//
// let mapStateToProps = (state) => {
//     return {
//         dialogsPage: state.dialogsPage
//
//     }
// }
// //Колбеки которые будем отправлять в призентационую компоненту
// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageText) => {
//
//             dispatch(sendMessageCreator(newMessageText))
//         },
//         // updateNewMessageBody: (body) => {
//         //     dispatch(updateNewMessageBodyCreator(body))
//         // },
//
//     }
// }
// //Конвейр вызовов с низу вверх
// // compose(
// //     connect(mapStateToProps, mapDispatchToProps),
// //     withAuthRedirect
// // )(Dialogs)
// //
// // //HOC
// // let AuthRedirectComponent = withAuthRedirect(Dialogs)
// //
// //
// // const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
//
// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withAuthRedirect
// )(Dialogs);


let mapStateToProps = (state: RootState) => {
    return {
        dialogsPage: state.dialogsPage
    }
}


const DialogsContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
)(Dialogs)

export default DialogsContainer
