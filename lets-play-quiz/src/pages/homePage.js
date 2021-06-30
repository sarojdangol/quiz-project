import React, { useState, useEffect } from 'react';
import QuizCategory from './../component/quizCategory';
import { TextField, Button, Card, CardHeader, Avatar, IconButton } from '@material-ui/core';
import PlayersList from '../component/playersList';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
export default function HomePage() {
    
    let history= useHistory();
    const [userName, setUserName] = useState('');
    const [user_profile,setUserInfo]=useState('');

    // let user_profile = localStorage.getItem('_user_name') ? JSON.parse(localStorage.getItem('_user_name')) : '';

    useEffect(() => {
        setUserName(localStorage.getItem('_user_name') ? localStorage.getItem('_user_name') : "");
        setUserInfo(localStorage.getItem('_user_info') ? JSON.parse(localStorage.getItem('_user_info')) : '' );
    }, true)

    function handleChange(event) {
        setUserName(event.target.value);

    }
    function onHandleLogOut(){
firebase.auth().signOut().then(function(){

}).catch(function(error){

});
localStorage.clear();
window.location.reload();
    }
    return (
        <div>
            {userName !== '' ?
                <div style={{ display: 'flex', margin: 20 }}>
                    <div style={{width:'100%'}}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" src={user_profile.photoURL}>
                                        
                                 </Avatar>
                                }
                              
                                title={user_profile.displayName}
                                subheader={user_profile.email}
                                action={
                                    <IconButton aria-label="setting" onClick={onHandleLogOut}>
                                        <LogOutIcon />
                                    </IconButton>
                                }
                            />
                            </Card>
                    </div>
                    </div>:
            <div style={{ display: 'flex', margin: 20 }}>
            
                        <Button variant='contained' color='secondary' style={{ marginLeft: 20 }}
                            onClick={() => history.push('/signin')}> LOG In  </Button>
                    </div>
                    }
                    <Card style={{margin:20,padding:20,background:'#f0f8ff'}}>
                        <p>We have new feature of Polling. Give Your Vote</p>
                        <Button variant="contained" color="primary" style={{marginLeft:20}} onClick={()=>history.push('/poll/list')}>Cast Your Vote</Button>
                        </Card>
            <QuizCategory />
                    <div style={{ background: '#f5f5f5', padding: 20 }}>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>Players List</div>
                        <PlayersList />
                    </div>
                </div>
    );
}