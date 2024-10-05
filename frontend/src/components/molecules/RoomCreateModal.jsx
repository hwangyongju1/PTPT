import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Modal as ModalRoom, Typography } from '@mui/material';

const Modal = ({ open, onClose, title, children, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default Modal;
