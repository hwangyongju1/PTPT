import React, { useState } from 'react';
import { Box, easing } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTab } from '../../store/actions/room';

const IconButton = ({
  icon: IconComponent,
  text,
  handleSidebarToggle,
  isSelected,
}) => {
  const theme = useTheme();
  // const [isClicked, setIsClicked] = useState(false);

  // const handleClicked = () => {
  //   setIsClicked(!isClicked);
  //   handleSidebarToggle();
  // };
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);

  const handleClicked = () => {
    if (isSidebarOpen) {
      handleTabClick();
    }
    handleSidebarToggle();
  };

  const handleTabClick = () => {
    dispatch(clearTab());
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      sx={{
        padding: '12px',
        cursor: 'pointer',
        marginRight: '3px',
        borderRadius: '0 15px 15px 0',
        backgroundColor: isSelected ? 'white' : '#e0e0e0',
        '&:hover': {
          backgroundColor: '#f5f5f5', // 부모 요소가 hover 상태일 때 적용
          '& svg': {
            color: theme.palette.primary.main, // 부모 요소가 hover 상태일 때 자식 svg 요소에 적용
          },
          '& div': {
            color: theme.palette.primary.main, // 부모 요소가 hover 상태일 때 자식 div 요소에 적용
          },
        },
      }}
      onClick={handleClicked}
    >
      <IconComponent
        style={{
          color: isSelected ? theme.palette.primary.main : '#B0B0B0',
          fontSize: 30,
        }}
      />
      <div
        style={{
          color: isSelected ? theme.palette.primary.main : '#B0B0B0',
          fontSize: 14,
          fontWeight: 'bold',
          paddingTop: 3,
        }}
      >
        {text}
      </div>
    </Box>
  );
};

export default IconButton;
