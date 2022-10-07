import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));

// let rerenderEntireTree = (state) => {
root.render(
    <MainApp/>
)

// rerenderEntireTree(store.getState());
// //Замыкание из store.js, вызываем только при rerenderEntireTree(state);
// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireTree(state)
// });
