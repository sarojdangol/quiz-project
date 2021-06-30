import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/header';
import HomePage from './pages/homePage';

import  firebase from  "firebase";
import Routes from './routes';

function App() {

  useEffect(() => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAlrmLs4hokFJChk2ELjPMEABkkZNhQT7Q",
      authDomain: "lets-play-quiz-5c785.firebaseapp.com",
      databaseURL: "https://lets-play-quiz-5c785.firebaseio.com",
      projectId: "lets-play-quiz-5c785",
      storageBucket: "lets-play-quiz-5c785.appspot.com",
      messagingSenderId: "74774659863",
      appId: "1:74774659863:web:94c6892e9dfd87b76ded52",
      measurementId: "G-M6LHKMBLX2"
    };
    // firebase.initializeApp(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
  },[]);

  return (
    <div >

      <Header />
      <Routes/>
    </div>
  );
}

export default App;
