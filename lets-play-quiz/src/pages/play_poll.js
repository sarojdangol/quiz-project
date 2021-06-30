import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Chip, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import '../styles/quiz.css';
import { useHistory } from 'react-router-dom';

export default function PlayPoll() {
    let { id } = useParams();
    let history = useHistory();
    const [poll, setPoll] = useState();
    const [loading, setLoading] = useState(true);
    const [isVoteCasted, setVoteCasted] = useState(false);


    useEffect(() => {
        setTimeout(function () {
            getPoll();
        }, 1000)

    }, [true]);

    function getPoll() {
        const db = firebase.firestore();
        db.collection('poll').doc(id).get().then(snapshot => {

            console.log(snapshot.data());
            setPoll(snapshot.data());
            setLoading(false);

        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }
    function addPollCount(type, count) {
        setVoteCasted(true);
        const db = firebase.firestore();
        let data;

        if (type === 'A') {
            data = { optionA_count: parseInt(count) + 1, };

        }
        else if (type === 'B') {
            data = { optionB_count: parseInt(count) + 1, };
        }
        else if (type === 'C') {
            data = { optionC_count: parseInt(count) + 1, };
        }
        else {
            data = { optionD_count: parseInt(count) + 1, };
        }
        db.collection('poll').doc(id).update(data)
    }


    return (
        <div>
            {loading ? <div>loading....</div> :
                isVoteCasted ?
                    <div>
                        <img src="https://cdn.dribbble.com/users/298384/screenshots/3967988/googlecheck.gif" style={{ margin: "auto", display: "block" }} />
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <Button variant='contained' color='secondary' style={{ margin: '20px auto', display: 'block' }}
                                onClick={() => history.push('/poll/list')}> back to Result  </Button>
                            <Button variant='contained' color='secondary' style={{ margin: '20px auto', display: 'block' }}
                                onClick={() => history.push('/')}> back to Home  </Button>
                        </div>
                    </div> :
                    <div>
                        <div style={{ fontSize: 22, fontWeight: 900, margin: "10px 10px 0px 10px" }}>{poll.question}</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', marginLeft: 10 }}>
                            <div style={{ margin: "10px 10px 0px 0px" }}><Chip label={poll.optionA} clickable variant="outlined" style={{ width: "100%" }} onClick={() => addPollCount('A', poll.optionA_count)} className="option" /></div>
                            <div style={{ margin: "10px 10px 0px 0px" }}><Chip label={poll.optionB} clickable variant="outlined" style={{ width: "100%" }} onClick={() => addPollCount('B', poll.optionB_count)} className="option" /></div>
                            <div style={{ margin: "10px 10px 0px 0px" }}><Chip label={poll.optionC} clickable variant="outlined" style={{ width: "100%" }} onClick={() => addPollCount('C', poll.optionC_count)} className="option" /></div>
                            <div style={{ margin: "10px 10px 0px 0px" }}><Chip label={poll.optionD} clickable variant="outlined" style={{ width: "100%" }} onClick={() => addPollCount('D', poll.optionD_count)} className="option" /></div>
                        </div>
                    </div>}
        </div>
    );
}