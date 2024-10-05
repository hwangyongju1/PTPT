import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

const DropdownMenu = ({ Icon, options, onSelect, info }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    onSelect(value); // 부모 컴포넌트로 선택된 값 전달
    handleClose(); // 메뉴 닫기
  };
  return (
    <div>
      <Tooltip title={info}>
        <IconButton
          aria-controls={open ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <Icon />
        </IconButton>
      </Tooltip>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5, // Menu의 최대 높이 설정
            width: '20ch', // Menu의 너비 설정
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
            onClick={() => handleMenuItemClick(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
