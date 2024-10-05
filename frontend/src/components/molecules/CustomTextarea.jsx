import React, { useState, useEffect } from 'react';
import { TextField, styled, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { toggleScriptSelect } from '../../store/actions/room';
import { useTempScript, deleteScript } from '../../store/actions/soloActions';
import { DeleteModal } from './DeleteModal';

function CustomTextarea({ placeholder, editFlag }) {
  const [open, setOpen] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHAR_COUNT = 2000; // 원하는 최대 글자 수로 설정

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const tempScript = useSelector((state) => state.solo.tempScript);

  useEffect(() => {
    setCharCount(tempScript?.script?.content?.length || 0);
  }, [tempScript]);

  const handleChange = (event) => {
    const { index, script } = tempScript;

    if (event.target.value.length <= MAX_CHAR_COUNT) {
      const updatedScript = {
        ...script,
        content: event.target.value,
      };

      dispatch(useTempScript(index, updatedScript));
      setCharCount(event.target.value.length);
    }
  };

  return (
    <ScriptContainer>
      <CustomTextField
        placeholder={placeholder}
        multiline
        rows={13}
        value={tempScript?.script.content || ''}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        InputProps={{
          readOnly: !editFlag, // editFlag가 false일 때만 readOnly
          style: { color: 'inherit' },
        }}
      />
      {!editFlag ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '8px 0',
          }}
        >
          <DeleteIcon
            onClick={handleClickOpen}
            sx={{
              cursor: 'pointer',
              color: '#7A7A7A',
              marginRight: '5px',
            }}
          />
          <EditIcon
            onClick={() => {
              dispatch(toggleScriptSelect(true));
            }}
            sx={{
              cursor: 'pointer',
              color: '#7A7A7A',
              marginRight: '5px',
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '8px',
            paddingRight: '3px',
          }}
        >
          <Typography variant='caption' color='textSecondary'>
            {charCount}/{MAX_CHAR_COUNT}
          </Typography>
        </Box>
      )}

      <DeleteModal
        open={open}
        deleteAction={deleteScript}
        handleClose={handleClose}
      />
    </ScriptContainer>
  );
}

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
}));

const ScriptContainer = styled(Box)(({ theme }) => ({
  border: '1px solid #E1E3E1',
  borderRadius: '4px',
  padding: '2px',
}));

export default CustomTextarea;
