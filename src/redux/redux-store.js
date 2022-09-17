//store от redux
import {configureStore} from "@reduxjs/toolkit";
import DialogsReducer from "./Reducer/DialogsReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import SidBarReducer from "./Reducer/SidBarReducer";
import UsersReducer from "./Reducer/UsersReducer";


//Обратите внимание, что это работает только для одного уровня вложенности.
// Если требуются вложенные редукторы, придется вызывать combineReducers() самостоятельно.
let store = configureStore({
    reducer: {
        dialogsPage: DialogsReducer,
        profilePage: ProfileReducer,
        sidBarPage: SidBarReducer,
        usersPage: UsersReducer,

    }
})

window.store = store

export default store