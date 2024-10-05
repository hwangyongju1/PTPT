// src/components/organisms/Sidebar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import IconButton from '../atoms/IconButton';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';

const Sidebar = ({ tabItem }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.room.selectedTab);
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);

  // 탭 클릭 시 호출되는 핸들러
  const handleTabClick = (index) => {
    if (selectedTab === index) {
      dispatch(toggleSidebar());
      // dispatch(clearTab());
    } else {
      dispatch(selectTab(index));
      if (!isSidebarOpen) {
        dispatch(toggleSidebar());
      }
    }
  };

  return (
    <Box
      width={80} // 고정된 너비
      backgroundColor='#e0e0e0'
    >
      {tabItem.map((item, index) => (
        <IconButton
          handleSidebarToggle={() => handleTabClick(index)}
          key={index}
          icon={item.icon}
          text={item.text}
          isSelected={selectedTab === index}
        />
      ))}
      {/* 여기에 세로 탭 컨텐츠 추가 */}
    </Box>
  );
};

export default Sidebar;
