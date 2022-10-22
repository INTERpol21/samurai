//store от redux
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import dialogsReducer from "./Reducer/DialogsReducer";
import profileReducer from "./Reducer/ProfileReducer";
import sidBarReducer from "./Reducer/SidBarReducer";
import usersReducer from "./Reducer/UsersReducer";
import authReducer from "./Reducer/AuthReducer";
import appReducer from "./Reducer/AppReducer";
import chatReducer from "./Reducer/ChatReducer";


// Если требуются вложенные редукторы, придется вызывать combineReducers() самостоятельно.


// let rootReducers = combineReducers({
//     profilePage: profileReducer,
//     dialogsPage: dialogsReducer,
//     sidebar: sidBarReducer,
//     usersPage: usersReducer,
//     auth: authReducer,
//     app: appReducer,
//     chat: chatReducer
// })


export const store = configureStore({
    reducer: {
        // @ts-ignore
        profilePage: profileReducer,
        // @ts-ignore
        dialogsPage: dialogsReducer,
        sidebar: sidBarReducer,
        // @ts-ignore
        usersPage: usersReducer,
        // @ts-ignore
        auth: authReducer,
        app: appReducer,
        // @ts-ignore
        chat: chatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>


// type RootReducersType = typeof rootReducers;
//
// export type AppStateGlobalType = ReturnType<RootReducersType>;
//
//
// export type BaseThunkType<ActionTypes extends Action,
//     ReturnType = Promise<void>> = ThunkAction<ReturnType,
//     AppStateGlobalType, unknown, ActionTypes>

export type InferActionsTypes<T> = T extends {
    [key: string]: (...args: any[]) => infer U
} ? U : never;

//
// let store = createStore(rootReducers, applyMiddleware(thunkMiddleWare))
//
// @ts-ignore
window.store = store


export default store