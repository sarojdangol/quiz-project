import React from 'react';
import { catogery_json } from './../utils/categoryjson';
import { Grid, Card } from '@material-ui/core';
import {useHistory} from "react-router-dom";

export default function QuizCategory() {
    let history=useHistory();
    return (
        <div style={{margin:20,background:'#f5f5f5',padding:8}}>
            <h2 style={{color:'orange'}}>Quiz Categories</h2>
            <Grid container spacing={2}>
                {catogery_json.map((items, key) => (
                    <Grid key={key} item style={{padding:0}}>

                        <Card onClick={()=>history.push('/category/'+items.id)} style={{padding:10, margin:'10px 10px 10px 10px', background:items.background, cursor:"pointer"}}>{items.name} </Card>
                    </Grid>
                ))}
            </Grid>
        </div>

    );

}