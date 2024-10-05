import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  styled,
} from '@mui/material';

const CustomFormControl = styled(FormControl)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E1E3E1', // 테두리 색상을 설정합니다.
    },
    '&:hover fieldset': {
      borderColor: '#E1E3E1', // 호버 시에도 테두리 색상을 설정합니다.
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E1E3E1', // 포커스 시에도 테두리 색상을 설정합니다.
    },
  },
  '& .MuiInputLabel-root': {
    transform: 'translate(14px, 14px) scale(1)', // 라벨 위치를 고정합니다.
    transition: 'none', // 라벨 이동 애니메이션을 없앱니다.
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, 14px) scale(1)', // 축소된 라벨 위치를 기본 위치로 설정합니다.
  },
  '& .MuiOutlinedInput-input': {
    padding: '14px', // 입력 패딩 조정
  },
  '& .MuiSelect-select:focus': {
    backgroundColor: 'transparent', // 선택 시 배경색 투명으로 설정
  },
});

function CustomSelect({ label, options, style, onChange }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value); // 부모 컴포넌트로부터 받은 onChange 호출
  };

  return (
    <CustomFormControl fullWidth variant='outlined' style={style}>
      <Select
        labelId='custom-select-label'
        id='custom-select'
        value={value}
        onChange={handleChange}
        displayEmpty
        input={<OutlinedInput notched={false} />}
        renderValue={(selected) => {
          if (selected === '') {
            return <span>{label}</span>;
          }
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return selectedOption ? selectedOption.label : label;
        }}
      >
        {value === '' && (
          <MenuItem value=''>
            <span>{label}</span>
          </MenuItem>
        )}
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </CustomFormControl>
  );
}

export default CustomSelect;
