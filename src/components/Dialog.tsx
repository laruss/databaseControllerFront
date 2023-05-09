import * as React from 'react';
import Button from '@mui/material/Button';
import DialogMUI from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {setDialog} from "../app/slices/appSlice";

export default function Dialog() {
    const dispatch = useAppDispatch();
    const {isOpen, title, text, onConfirm, onCancel} = useAppSelector(state => state.app.dialog);

    const handleCancel = () => {
        onCancel && onCancel();
        dispatch(setDialog({isOpen: false, title: '', text: '', onConfirm: () => {}, onCancel: () => {}}));
    };

    const handleConfirm = () => {
        onConfirm && onConfirm();
        dispatch(setDialog({isOpen: false, title: '', text: '', onConfirm: () => {}, onCancel: () => {}}));
    };

    return (
        <div>
            <DialogMUI
                open={isOpen}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </DialogMUI>
        </div>
    );
}