import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import state, {addPost, subscribe, updateNewPostText} from "./redux/state"

const root = ReactDOM.createRoot(document.getElementById('root'));

 let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
        </React.StrictMode>
    )
}

rerenderEntireTree(state);
//Замыкание из state.js, вызываем только при rerenderEntireTree(state);
 subscribe(rerenderEntireTree);