import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from '@material-ui/core';
import DifficultIcon from '@material-ui/icons/ShowChart';
import StartQuizIcon from '@material-ui/icons/PlayArrow';
import TypeIcon from '@material-ui/icons/Sort';
import QuestionIcon from '@material-ui/icons/Exposure';
import { catogery_json } from './../utils/categoryjson';
import { useHistory } from 'react-router-dom';
import DifficultyLevelSelect from './../component/difficultyLevelSelect';
import NoOfQuestions from './../component/noOfQuestions';
import QuestionTypes from '../component/questionTypes';

export default function CategoryDetail() {

    let history=useHistory();
    let { id } = useParams();
    const [level, setLevel] = useState('Level');
    const [type, setType] = useState('QuestionType');
    const [numberOfQuestion, setNumberOfQuestion] = useState('Number of Questions');
    const [category,setCategory]=useState({"name":"","id":""});
    const [selectDifficultLevel,setSelectDifficultLevel]=useState(false);
    const [selectNoOfQuestions,setSelectNoOfQuestions]=useState(false);

    
    useEffect(()=>{
        let cat= catogery_json.filter((value)=>{
            return value.id==id;
        }); 
        setCategory(cat[0]);
    },[true]);

    function handleLevel(level){
        setLevel(level);
        // console.log(level);
    }
    function handleNoOfQuestions(no){
        setNumberOfQuestion(no);
        // console.log(no);
    }
    function handleTypesOfQuestions(type){
        setType(type);
        // console.log(type);
    }

    return (
        <div style={{ margin: 30 }}>
            <div style={{ fontSize: 24, fontWeight: 900, padding: 16 }}>{category.name}</div>
            <div style={{ fontSize: 14, fontWeight: 700, padding: 16 }}>To play quiz, please configure the types of quiz you want to play</div>
            <div style={{ padding: 16, background: '#f5f5f5' }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Your Quiz configuration :</div>
 

                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto'}}>
                    <Card  onClick={()=>setSelectNoOfQuestions(true)} 
                    style={{ padding: 10, margin: '10px 10px 10px 10px' , textAlign: 'center', cursor:'pointer'}}>
                        <div style={{ fontSize: 22, fontWeight: 600 }}><QuestionIcon/> </div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{numberOfQuestion}</div>
                    </Card>
                    <Card onClick={()=>setSelectDifficultLevel(true)} 
                    style={{ padding: 10, margin: '10px 10px 10px 10px', textAlign: 'center',cursor:'pointer' }}>
                        <DifficultIcon />
                        <div style={{ fontSize: 18, fontWeight: 600 }}>
                            {level}
                        </div>

                    </Card>
                    {/* <Card onClick={()=>setType(true)} 
                    style={{ padding: 10, margin: '10px 10px 10px 10px', textAlign: 'center',cursor:'pointer' }}>
                        <TypeIcon />
                        <div style={{ fontSize: 18, fontWeight: 600 }}>
                            {type}
                        </div>

                    </Card> */}

                </div>
            </div>
            <Button 
            variant="contained" 
            color="secondary" 
            style={{background:"green", margin:'20px auto'}} 
            onClick={()=>{
                sessionStorage.removeItem('_current_quiz');
                history.push('/play/'+id+'/'+level+'/'+numberOfQuestion);
            }} startIcon={<StartQuizIcon/>}>
                Start Quiz
            </Button>
           
            <DifficultyLevelSelect open={selectDifficultLevel} onDialogClose={()=>setSelectDifficultLevel(false)}
            onSetLevel={handleLevel}
            />
            <NoOfQuestions open={selectNoOfQuestions} onDialogClose={()=>setSelectNoOfQuestions(false)}
            onSetQuestions={handleNoOfQuestions}
            />
                     {/* <QuestionTypes/> */}
         
        </div>
    );
} 