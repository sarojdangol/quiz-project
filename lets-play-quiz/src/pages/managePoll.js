import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

export default function ManagePoll() {

    let history=useHistory();

    let defaultPoll = {
        "question": "",
        "optionA": "",
        "optionB": "",
        "optionC": "",
        "optionD": "",
    }
    const [poll, setPoll] = useState(defaultPoll);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(event) {
        defaultPoll[event.target.name] = event.target.value;
        setPoll(defaultPoll);
    }
    function onAddPoll() {
       setIsLoading(true);
        const firestore = firebase.firestore();
        firestore.collection("poll").add({
            question: poll.question,
            optionA: poll.optionA,
            optionB: poll.optionB,
            optionC: poll.optionC,
            optionD: poll.optionD,
            isActive: true,
            optionA_count: 0,
            optionB_count: 0,
            optionC_count: 0,
            optionD_count: 0,
        }).then(function(value){
            history.push('/playPoll/'+value.id); 
            setIsLoading(false);
        });
    }

    return (
        <div>{isLoading?
        <div>
            <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" style={{margin:'auto', display:"block"}}/>
            <p style={{textAlign:'center'}}>Please Wait</p>
        </div>:
            <div>
                <div style={{ margin: "10px 10px 0px 10px" }}>
                    <TextField id="filled-basic" label="Poll Question" variant="filled" fullWidth={true} onChange={handleChange} name="question" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", marginLeft: 10 }}>
                    <div style={{ margin: "10px 10px 0px 0px" }}><TextField id="outlined-basic" label="Option A" variant="outlined" onChange={handleChange} fullWidth={true} name="optionA" /></div>
                    <div style={{ margin: "10px 10px 0px 0px" }}><TextField id="outlined-basic" label="Option B" variant="outlined" onChange={handleChange} fullWidth={true} name="optionB" /></div>
                    <div style={{ margin: "10px 10px 0px 0px" }}><TextField id="outlined-basic" label="Option c" variant="outlined" onChange={handleChange} fullWidth={true} name="optionC" /></div>
                    <div style={{ margin: "10px 10px 0px 0px" }}><TextField id="outlined-basic" label="Option D" variant="outlined" onChange={handleChange} fullWidth={true} name="optionD" /></div>
                </div>
                <Button style={{ margin: "10px 10px 0px 10px" }} variant="contained" color="primary" onClick={onAddPoll}>Add Poll</Button>
            </div>
        }
        </div>
    )
}