import React, { useEffect, useState } from 'react';
import { Card } from '@material-ui/core';
import '../styles/quiz.css';
export default function Question(quiz) {
    
  

    return (
        <div className="questionWrapper">
            <div className="question">{quiz.quiz.question}</div>
            <div>
                <div style={{display:'grid',gridTemplateColumns:"auto auto"}}>
                   {quiz.quiz.answers.map((ans,index)=>(
                     <Card key={index} className="answer"
                     style={{background:quiz.quiz.userAnswer==ans?'blue':'#61dafb'}}
                     onClick={()=>quiz.handleUserAnswer(ans)}>{ans}</Card>))}
                   
                   
                </div>
            </div>


        </div>

    );
}