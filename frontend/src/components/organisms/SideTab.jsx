import React from 'react';
import { useSelector } from 'react-redux';
import { Divider, Box } from '@mui/material';

const SideTab = ({ item }) => {
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  const selectedTab = useSelector((state) => state.room.selectedTab);

  return (
    <Box
      sx={{
        display: isSidebarOpen ? 'block' : 'none',
        top: 64, // 내비게이션 바 높이만큼 마진을 줌
        right: isSidebarOpen ? 80 : -300, // 열렸을 때는 고정된 세로탭 바로 옆, 닫혔을 때는 화면 밖으로 이동
        width: 300,
        height: 'calc(100vh - 64px)',
        backgroundColor: 'white',
        borderLeft: '1px solid #ddd', // 왼쪽 테두리
      }}
    >
      <Box display='flex' flexDirection='column' height='100%'>
        <div
          style={{ padding: '25px 15px', fontSize: '20px', fontWeight: 'bold' }}
        >
          {item.text}
        </div>
        <Divider />
        <div style={{ padding: '15px', overflowY: 'auto', flex: 1 }}>
          {item.content}
        </div>
      </Box>
    </Box>
  );
};

export default SideTab;
