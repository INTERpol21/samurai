import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/Reducer/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";


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


let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage

    }
}
//Колбеки которые будем отправлять в призентационую компоненту
let mapDispatchToProps = (dispatch) => {
    return {
        sandMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        }
    }
}
//HOC
let AuthRedirectComponent = withAuthRedirect(Dialogs)


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;
