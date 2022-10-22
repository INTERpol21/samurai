//store от redux
import {Action, applyMiddleware, combineReducers, createStore, ThunkAction} from "@reduxjs/toolkit";
import dialogsReducer from "./Reducer/DialogsReducer";
import profileReducer from "./Reducer/ProfileReducer";
import sidBarReducer from "./Reducer/SidBarReducer";
import usersReducer from "./Reducer/UsersReducer";
import authReducer from "./Reducer/AuthReducer";
import appReducer from "./Reducer/AppReducer";
import chatReducer from "./Reducer/ChatReducer";


// Если требуются вложенные редукторы, придется вызывать combineReducers() самостоятельно.


let rootReducers = combineReducers({

    // тут ключи типо profilePage - это как бы обьекты
    // в которых лежат значения - тоест наши стейты - что тоже объекты

    profilePage: profileReducer,

    dialogsPage: dialogsReducer,

    sidebar: sidBarReducer,

    usersPage: usersReducer,

    auth: authReducer,

    app: appReducer,

    chat: chatReducer

})


type RootReducersType = typeof rootReducers;

export type AppStateGlobalType = ReturnType<RootReducersType>;


export type BaseThunkType<ActionTypes extends Action,
    ReturnType = Promise<void>> = ThunkAction<ReturnType,
    AppStateGlobalType, unknown, ActionTypes>

export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
} ? U : never;


let store = createStore(rootReducers, applyMiddleware())

// @ts-ignore
window.store = store


export default store