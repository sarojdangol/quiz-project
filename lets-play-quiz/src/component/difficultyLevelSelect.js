import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Card, Avatar } from '@material-ui/core';
import '../styles/quiz.css';
import CloseIcon from '@material-ui/icons/Close';
import { LEVEL_JSON } from '../utils/categoryjson';
export default function DifficultyLevelSelect(data) {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        data.onDialogClose();
    };
    const descriptionElementRef = React.useRef(null);
    useEffect(() => {

        setOpen(data.open);

    }, [data.open]);

    function handleLevel(level){
        data.onSetLevel(level);
        data.onDialogClose();

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
                <div style={{display:'flex', justifyContent:'space-between', padding:20}}>
                    <div style={{fontSize:20,fontWeight:900 }}>Select Difficult Level</div>
                    <div onClick={handleClose} style={{cursor:'pointer' }}><CloseIcon/></div>
                </div>
                <DialogContent dividers={'papers'}>
                    <DialogContentText
                        id="scroll=dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div style={{ display: "flex" }}>
                            {LEVEL_JSON.map((item) =>
                                <Card style={{ padding: 10, margin: '20px 10px 10px 10px', cursor: 'pointer', width: '120px' }}
                                onClick={()=>handleLevel(item.value)}
                                >
                                    <div style={{ fontSize: 22, fontWeight: 600 }}>
                                        <Avatar style={{ margin: 'auto', background: item.color, color: "yellow" }}>{item.label}</Avatar></div>
                                    <div style={{ fontSize: 16, fontWeight: 600, margin:'20px' }}>{item.name}</div>
                                </Card>
                            )}

                        </div>
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