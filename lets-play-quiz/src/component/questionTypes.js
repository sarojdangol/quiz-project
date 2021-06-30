import React, { useEffect } from 'react';
import { CloseIcon } from '@material-ui/icons/Close';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Card, Avatar } from '@material-ui/core';


export default function QuestionTypes(data) {

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        data.onDialogClose();
    };
    const descriptionElementRef = React.useRef(null);
    useEffect(() => {

        setOpen(data.open);

    }, [data.open]);

    function handleLevel(no) {
        data.onSetQuestions(no);
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
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
                    <div style={{ fontSize: 20, fontWeight: 900 }}>Select Types of Question</div>
                    <div onClick={handleClose} style={{ cursor: 'pointer' }}><CloseIcon /></div>
                </div>
                <DialogContent dividers={'papers'}>
                    <DialogContentText
                        id="scroll=dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div style={{ display: "flex" }}>
                            {['Any Type', 'Multiple Choice', 'True/False'].map((item) =>
                                <Card style={{ padding: 10, margin: '20px 10px 10px 10px', cursor: 'pointer', width: '120px' }}
                                    onClick={() => handleLevel(item)}
                                >
                                    <div style={{ fontSize: 22, fontWeight: 600 }}>{item}</div>
                                    <div style={{ fontSize: 16, fontWeight: 600, margin: '20px' }}>Quiz with {item} questions</div>
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