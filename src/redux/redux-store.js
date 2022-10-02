//store от redux
import {configureStore} from "@reduxjs/toolkit";
import DialogsReducer from "./Reducer/DialogsReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import SidBarReducer from "./Reducer/SidBarReducer";
import UsersReducer from "./Reducer/UsersReducer";
import authReducer from "./Reducer/AuthReducer";
import appReducer from "./Reducer/AppReducer";
// import thunk from "redux-thunk";


//Обратите внимание, что это работает только для одного уровня вложенности.


// Если требуются вложенные редукторы, придется вызывать combineReducers() самостоятельно.

let store = configureStore({
    reducer: {
        dialogsPage: DialogsReducer,
        profilePage: ProfileReducer,
        sidBarPage: SidBarReducer,
        usersPage: UsersReducer,
        auth: authReducer,
        app: appReducer

    },
    // middleware: [thunk]

})
// const store2 = createStore(rootReducer, applyMiddleware(thunk))

// const store = configureStore(reducers   applyMiddleware(thunkMiddleware)
// ));

window.store = store

export default store