import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const GptResponseModal = ({ open, onClose, response }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>예상 질문</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{response}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GptResponseModal;
