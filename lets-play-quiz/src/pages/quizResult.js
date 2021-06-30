import React, { useEffect, useState } from 'react';
import '../styles/quiz.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import StartQuizIcon from '@material-ui/core/SvgIcon/SvgIcon';
import ViewResult from './../component/viewResult';
// import "firebase/firestore";
import firebase from "firebase";
export default function QuizResult() {
    const firestore = firebase.firestore();
    let history = useHistory();
    let [result, setResult] = useState(0);
    let [viewresult, setViewResult] = useState(false);

    useEffect(() => {
        let data = history.location.state;
        let username=localStorage.getItem('_user_name')?localStorage.getItem('_user_name'):"";
        console.log(data);
        firestore.collection("quiz_result").add({
            category: data.category.name,
            level: data.level,
            no_of_question: data.questions,
            score: data.result,
            user_name: username
        });
        setResult(history.location.state.result);
    }, true)

    return (
        <div id="quiz">
            <h1>{history.location.state.isPass ? "Congratulation" : "OOOPS! Try Again"}</h1>
            <div className="circle">
                <div>{result}</div>
            </div>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    sessionStorage.removeItem('_current_quiz');
                    history.push('/');
                }}
                style={{ background: 'green', margin: '20px auto', display: 'block' }}

            >Play New QUiz</Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    // alert("Ajs");
                    // console.log("view");
                    setViewResult(true);
                }}
                style={{ background: 'green', margin: '20px auto', display: 'block' }}

            >View result
                 </Button>

            <ViewResult open={viewresult} onDialogClose={() => {
                setViewResult(false)
            }} quizData={history.location.state.quizData} />

        </div>
    );
}