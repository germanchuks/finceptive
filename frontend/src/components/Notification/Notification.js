import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';


function AlertDialog({
    showAlert,
    setShowAlert,
    title,
    contextText,
    actionTrue
}) {

    const handleClose = () => {
        setShowAlert(false);
    };



    return (
        <AlertStyled>
            <Dialog
                open={showAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{
                    bgcolor: 'rgba(1, 2, 1, 0.9)',
                    color: 'white',
                    fontFamily: 'monospace',
                    fontSize: '17px'
                }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent sx={{
                    paddingBlock: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(36, 35, 35, 1)',
                    color: 'white'
                }}>
                    <DialogContentText sx={{ fontFamily: 'monospace', fontSize: '14px', color: 'white', paddingTop: '10px' }} id="alert-dialog-description">
                        {contextText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', gap: '30px', bgcolor: 'rgba(36, 35, 35, 1)', color: 'white', paddingTop: '10px' }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={actionTrue} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </AlertStyled>
    );
}

const AlertStyled = styled.div`
    .alert-box {
        width: 500px;
        height: 200px;
    }
`

export default AlertDialog;