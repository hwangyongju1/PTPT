import React from 'react';
import { Box } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomTextarea from '../../molecules/CustomTextarea';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { toggleScriptSelect } from '../../../store/actions/room';
import { useTempScript } from '../../../store/actions/soloActions';

const SelectScriptTab = () => {
  const soloPreset = useSelector((state) => state.solo);

  const dispatch = useDispatch();
  const addScript = () => {
    dispatch(useTempScript(soloPreset.script ?? 0, { title: '', content: '' }));
    dispatch(toggleScriptSelect(false));
  };

  const selectScript = (scriptIdx) => {
    console.log(soloPreset.script[scriptIdx]);
    dispatch(useTempScript(scriptIdx, soloPreset.script[scriptIdx]));
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center', // 세로 가운데 정렬
          marginBottom: '10px',
        }}
      >
        <CustomSelect
          label='스크립트 선택'
          options={soloPreset.script.map((item, index) => ({
            value: index,
            label: item.title,
          }))}
          onChange={(scriptIdx) => {
            selectScript(scriptIdx);
          }}
        />
        <AddCircleOutlinedIcon
          sx={{
            color: '#7A7A7A',
            marginLeft: '10px',
            cursor: 'pointer',
          }}
          onClick={addScript}
        />
      </Box>

      <CustomTextarea
        placeholder={'스크립트를 선택해주세요'}
        editFlag={false}
        sx={{ marginTop: '10px' }} // marginTop 추가
      />
    </Box>
  );
};

export default SelectScriptTab;
