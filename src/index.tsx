import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import store from "./redux/redux-store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement)

root.render(
    //<React.StrictMode>

    // // BrowserRouter HashRouter
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>

// BrowserRouter HashRouter

//</React.StrictMode>,
)

// rerenderEntireTree(store.getState());
// //Замыкание из store.js, вызываем только при rerenderEntireTree(state);
// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(state)
// });
