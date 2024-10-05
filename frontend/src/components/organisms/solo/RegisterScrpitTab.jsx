import React from 'react';
import CustomTextarea from '../../molecules/CustomTextarea';
import CustomInput from '../../molecules/CustomInput';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleScriptSelect } from '../../../store/actions/room';
import {
  createScript,
  updateScript,
  useTempScript,
} from '../../../store/actions/soloActions';

const RegisterScriptTab = ({}) => {
  const dispatch = useDispatch();
  const scriptPreset = useSelector((state) => state.solo);
  const editFlag = useSelector((state) => state.room.editFlag);
  const saveClickListener = () => {
    const { index, script } = scriptPreset.tempScript;
    if (editFlag) {
      dispatch(updateScript(index, script));
    } else {
      dispatch(createScript(index, script));
    }

    dispatch(toggleScriptSelect());
    dispatch(useTempScript(0, { title: '', content: '' }));
  };

  const cancelClickListener = () => {
    dispatch(useTempScript(0, { title: '', content: '' }));
    dispatch(toggleScriptSelect());
  };
  return (
    <Box>
      <div style={{ marginBottom: '10px' }}>
        <CustomInput />
      </div>

      <CustomTextarea placeholder={'스크립트를 입력해주세요'} editFlag={true} />
      <Box
        display='flex'
        justifyContent='space-evenly'
        sx={{ paddingTop: '15px' }}
      >
        <Button
          onClick={saveClickListener}
          variant='contained'
          color='secondary'
        >
          저장
        </Button>
        <Button
          onClick={cancelClickListener}
          variant='contained'
          color='neutral'
        >
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterScriptTab;
