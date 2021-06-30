import React, { useEffect, useState } from 'react';
import Question from './../component/question';
import '../styles/quiz.css';
import axios from 'axios';
import { API_BASE_URL } from './../config';
import PreviousIcon from '@material-ui/icons/ArrowLeft';
import NextIcon from '@material-ui/icons/ArrowRight';
import FinishIcon from '@material-ui/icons/CancelScheduleSend';
import { Button } from '@material-ui/core';
import QuizCategory from './../component/quizCategory';
import { useHistory, useParams } from 'react-router-dom';
import { catogery_json } from '../utils/categoryjson';


export default function QuizPage() {
    let history=useHistory();
    let {categoryId, level,number}=useParams();
    // console.log(level);
    // console.log(categoryId);
    // console.log(number);

    const [quizData, setQuizData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [questionNo, setQuestionNo] = useState(0);
    const [answerChange, setAnswerChange] = useState(true);
    const  [categoryName,setCategoryName]=useState();

    useEffect(() => {
      
        let cat= catogery_json.filter((value)=>{
            return value.id==categoryId;
        }); 
        setCategoryName(cat[0]);
          getQuizData();

      
    }, true);

    function getQuizData() {
        let quizData = sessionStorage.getItem('_current_quiz');
        if (quizData) {
            setQuizData(JSON.parse(quizData));
            setIsLoading(false);
        } else {
           
            let url =API_BASE_URL +'?amount='+number;
            if(level!='any'){
                url=url+'&difficulty='+level+'&category='+categoryId;
                // console.log(url);
              

            }
            axios.get(url).
                then((response) => {
                    createFinalQuiz(response.data.results);


                }).catch()
        }
    }
    function createFinalQuiz(data) {
        let newQuiz = [];
        data.forEach(function (value) {
            value.answers = value.incorrect_answers;
            value.answers.push(value.correct_answer);
            value.answers = shuffle(value.answers);
            newQuiz.push(value);
        });
        setQuizData(newQuiz);
        setIsLoading(false);
        sessionStorage.setItem('_current_quiz', JSON.stringify(newQuiz));

    }
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;

    }

    function handleUserAnswer(ans) {
        quizData[questionNo].userAnswer = ans;
        setQuizData(quizData);
        setAnswerChange(!answerChange);
    }
    function onFinishQuiz(){
        let count= 0;
        quizData.forEach(function (quiz){
            if(quiz.correct_answer== quiz.userAnswer){
                count++;
            }
        });
       history.push('/result',{"result":count*10,"isPass":count>4,"quizData":quizData,"level":level,"questions":quizData.length,"category":categoryName});
    
    }

    return (
        // <div>abcd</div>
        <div className='quizWrapper'>
            {isLoading ? <div>Please wait, Your Quiz is loading...</div> :
                <div style={{ marginTop: 20 }}>
                    <div>
                        <Question quiz={quizData[questionNo]} answerChange={answerChange} handleUserAnswer={handleUserAnswer} />
                    </div>
                    <div className="BottomWrapper">
                        <Button     
                            variant="outlined"
                            color="primary"
                            disabled={questionNo == 0}
                            onClick={() => setQuestionNo(questionNo - 1)}
                            startIcon={<PreviousIcon
                            />}>Previous</Button>

                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            startIcon={<FinishIcon/>}
                            onClick={onFinishQuiz}>Finish QUiz</Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<NextIcon />}
                            disabled={questionNo == (quizData.length - 1)}
                            onClick={() => setQuestionNo(questionNo + 1)}
                        >Next</Button>
                    </div>

                </div>}

        </div>

    );

}