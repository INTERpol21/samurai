//store от redux
import {configureStore} from "@reduxjs/toolkit";
import DialogsReducer from "./Reducer/DialogsReducer";
import ProfileReducer from "./Reducer/ProfileReducer";
import SidBarReducer from "./Reducer/SidBarReducer";
import UsersReducer from "./Reducer/UsersReducer";
import authReducer from "./Reducer/AuthReducer";
import appReducer from "./Reducer/AppReducer";


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

// Только для использования useSelector useDispatch Хуков
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store

export default store