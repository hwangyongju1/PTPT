import { Box, Slider } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientSlider = styled(Slider)({
  height: 8,
  '& .MuiSlider-track': {
    height: 12,
    background: 'linear-gradient(90deg, #76AE95, #768FAE)', // 그라데이션 색상
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: 'inherit',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
});

const CustomSlider = ({
  labels,
  max,
  min,
  step,
  defaultValue,
  handleChange,
}) => {
  return (
    <>
      <GradientSlider
        defaultValue={defaultValue}
        valueLabelDisplay='auto'
        step={step}
        onChange={handleChange}
        // marks
        min={min}
        max={max}
      />
      <Box display='flex' justifyContent='space-between'>
        {labels.map((label, index) => (
          <div key={index} className='label-item'>
            {label}
          </div>
        ))}
      </Box>
    </>
  );
};

export default CustomSlider;
