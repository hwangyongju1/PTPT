import React from 'react';
import { Box } from '@mui/material';
import MultiSidebar from '../../components/organisms/MultiSidebar';
import SideTab from '../../components/organisms/SideTab';
import VideoRoomComponent from '../room/openVidu/VideoRoomComponent';
import PersonIcon from '@mui/icons-material/Person';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';
import EvaluteTab from '../../components/organisms/multi/EvaluateTab';
import ParticipantsTab from '../../components/organisms/multi/ParticipantsTab';
import SettingsPage from '../../components/molecules/MultiSettingSide';

const MultiPage = () => {
  const tabItem = [
    { icon: PersonIcon, text: '참가자', content: <ParticipantsTab /> },
    { icon: ChecklistIcon, text: '평가', content: <EvaluteTab /> },
    { icon: SettingsIcon, text: '설정', content: <SettingsPage /> },
  ];
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  const selectedTab = useSelector((state) => state.room.selectedTab);
  console.log('selec : ' + selectedTab + ' isside : ' + isSidebarOpen);
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

  // 탭 별 content 처리
  const getTabContent = (index) => {
    console.log(index !== null ? tabItem[index] : tabItem[0]);
    return index !== null ? tabItem[index] : tabItem[0];
  };

  return (
    <>
      <Box display='flex' flexDirection='row' height='calc(100vh - 64px)'>
        <Box
          flex={1}
          p={2}
          sx={{
            backgroundColor: '#f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box
            flex={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <VideoRoomComponent
              sx={{
                width: '100%',
                height: '100%',
                maxWidth: `calc(100% - 240px)`, // Sidebar 너비를 고려하여 조정
              }}
            />
          </Box>
        </Box>
        {/* 여닫히는 커스텀 사이드바 */}
        <SideTab
          item={getTabContent(selectedTab)}
          // isSidebarOpen={isSidebarOpen}
        />
        {/* 우측 고정된 세로탭 */}
        <MultiSidebar
          tabItem={tabItem}
          handleTabClick={handleTabClick}
          // selectedTab={selectedTab}
        />
      </Box>
    </>
  );
};

export default MultiPage;
