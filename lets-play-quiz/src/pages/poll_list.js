import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Card, CardHeader, Avatar, LinearProgress } from '@material-ui/core';
import { height } from '@material-ui/system';
import { useHistory, useParams } from 'react-router-dom';
import  Button  from '@material-ui/core/Button';
export default function PollList() {
    let history=useHistory();
   
    const [pollData, setPollData] = useState();
    const [pollId,setPollId]= useState(); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(function () {
            getData();
        }, 1000)
        // console.log('useefect')
    }, [])
    function getData() {
        let pollData_list = [];
        let pollId_list = [];
        const db = firebase.firestore();
        db.collection('poll').onSnapshot((snapshot) => {
            snapshot.forEach(function (value) {
                pollData_list.push(value.data());
                pollId_list.push(value.id);
            });
            setPollData(pollData_list);
            setPollId(pollId_list);
            setLoading(false);

        })
    }
    return (
        <div>{loading ? <div>loading...</div> :
            <div>
<p>                <div style={{display:'flex', justifyContent:'space-between', margin:20}}>
                    <div>All Poll</div>
                    <Button variant='contained' color='secondary' 
                            onClick={() => history.push('/poll/manage')}> Create Poll </Button>
                </div></p>
                {pollData.map((data, index) => 
                    <div style={{marginBottom:20}}>
                        <Card onClick={()=>history.push('/playPoll/'+pollId[index])} style={{margin:20, padding:20, background:'#f0f8ff', cursor:'pointer'}}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" style={{background:data.isActive?"green":"red"}}>{(index + 1)}</Avatar>
                                }
                                title={<div style={{fontSize:22, fontWeight:900}}>{data.question}</div>} />
                            <div style={{ margin: "10px 10px 0px 10px" }}>
                                <div>{data.optionA}:{data.optionA_count}</div>
                                <LinearProgress variant="determinate" value={data.optionA_count } style={{ height: 10, marginTop: "10px" }} />
                            </div>
                            <div style={{ margin: "10px 10px 0px 10px" }}>
                                <div>{data.optionB}:{data.optionB_count}</div>
                                <LinearProgress variant="determinate" value={data.optionB_count } style={{ height: 10, marginTop: "10px" }} />
                            </div>
                            <div style={{ margin: "10px 10px 0px 10px" }}>
                                <div>{data.optionC}:{data.optionC_count}</div>
                                <LinearProgress variant="determinate" value={data.optionC_count } style={{ height: 10, marginTop: "10px" }} />
                            </div>
                            <div style={{ margin: "10px 10px 0px 10px" }}>
                                <div>{data.optionD}:{data.optionD_count}</div>
                                <LinearProgress variant="determinate" value={data.optionD_count } style={{ height: 10, marginTop: "10px" }} />
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        }</div>
    );
}