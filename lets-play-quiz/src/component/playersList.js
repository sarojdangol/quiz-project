import React, { useEffect, useState } from 'react';

import firebase from 'firebase';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';


export default function PlayersList() {

    const [playersData, setPlayersData] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);

    useEffect(()=>{
        setTimeout(function(){
            getData();
        },2000)
    },true)
    
    function getData() {
        let playersData=[];
        const db = firebase.firestore();
        db.collection('quiz_result').onSnapshot((snapshot) => {
            snapshot.forEach(function (value) {
                playersData.push(value.data())
            });
            setPlayersData(playersData);
            console.log(playersData);
            SetIsLoading(false);
        });
    }

    return (
        <div style={{maxWidth:600,margin:" 20px auto",display:"block", }}> 
            {isLoading ? <div>loading...</div>:
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell align="right">Category</TableCell>
                                <TableCell align="right">Level</TableCell>
                                <TableCell align="right">No Of Question</TableCell>
                                <TableCell align="right">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {   playersData.map((data,index)=>
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{data.user_name}</TableCell>
                                <TableCell align="right">{data.category}</TableCell>
                                <TableCell align="right">{data.level}</TableCell>
                                <TableCell align="right">{data.no_of_question}</TableCell>
                                <TableCell align="right">{data.score}</TableCell>

                            </TableRow>)}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
             }
            </div>

    );
}