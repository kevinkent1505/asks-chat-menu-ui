import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import firebase from "firebase/app";
import reportWebVitals from './reportWebVitals';

firebase.initializeApp({
    apiKey: "AIzaSyCEOfVVJu1riMfcsY2s8yLQ_wm15LOcsqw",
    authDomain: "asks-chat-menu.firebaseapp.com",
    projectId: "asks-chat-menu",
    storageBucket: "asks-chat-menu.appspot.com",
    messagingSenderId: "673849750085",
    appId: "1:673849750085:web:984fe975c6263e8740a92c",
    measurementId: "G-5MSSVDZBNN"
})

ReactDOM.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
