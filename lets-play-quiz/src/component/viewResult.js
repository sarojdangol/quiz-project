import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Card } from '@material-ui/core';
import '../styles/quiz.css';
export default function ViewResult(data) {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        data.onDialogClose();
    };
    const descriptionElementRef = React.useRef(null);
    useEffect(() => {

        setOpen(data.open);

    }, [data.open]);

    function manageUserAnswer(correctAnswer, ans, userAnswer) {
        if (ans == correctAnswer) {
            if (userAnswer == correctAnswer) {
                return 'green';
            }
            else {
                return 'teal';
            }
        }
        else {
            if (userAnswer == ans) {
                return 'yellow';
            }
            else {
                return 'white';
            }
        }

    }


    return (

        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <div  style={{display:'flex', justifyContent:'space-around', margin:14 }}>
                    <div>
                        <div style={{background:'yellow', height:30,width:50}}></div>
                        <div style={{marginTop:10}}>Your Answer</div>
                    </div>
                    <div>
                        <div style={{background:'teal', height:30,width:50}}></div>
                        <div style={{marginTop:10}}>Correct Answer</div>
                    </div>
                    <div>
                        <div style={{background:'green', height:30,width:50}}></div>
                        <div style={{marginTop:10}}>Your Correct Answer</div>
                    </div>
                </div>
                <DialogContent dividers={'papers'}>
                    <DialogContentText
                        id="scroll=dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {data.quizData.map((quiz) => (
                            <div className="questionWrapper">
                                <div className="question">{quiz.question}</div>
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: "auto auto" }}>
                                        {quiz.answers.map((ans, index) => (
                                            <Card key={index} className="answer"
                                                style={{ background: manageUserAnswer(quiz.correct_answer, ans, quiz.userAnswer) }}
                                            >{ans}</Card>))}


                                    </div>
                                </div>


                            </div>

                        ))}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleClose} color="primary">Subscribe</Button>

                </DialogActions>
            </Dialog>
        </div>
    );

}