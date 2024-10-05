import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import VoiceIcon from '@mui/icons-material/SpatialAudioOffOutlined';
import ScriptIcon from '@mui/icons-material/DescriptionOutlined';
import CompareIcon from '@mui/icons-material/MicNone';
import SettingIcon from '@mui/icons-material/SettingsOutlined';

import SideTab from '../../components/organisms/SideTab';
import Sidebar from '../../components/organisms/Sidebar';
import VoiceTab from '../../components/organisms/solo/VoiceTab';
import ScriptTab from '../../components/organisms/solo/ScrpitTab';
import CompareTab from '../../components/organisms/solo/CompareTab';
import SettingTab from '../../components/organisms/solo/SettingTab';
import PresentationMain from '../../components/organisms/solo/PresentationMain';
import { toggleSidebar, selectTab } from '../../store/actions/room';
import BottomBar from '../../components/molecules/BottomBar';
import { getProfile } from '../../apis/auth';
import { addVoiceModel } from '../../store/actions/soloActions';

const SoloPage = () => {
  const tabItem = [
    { icon: VoiceIcon, text: '음성', content: <VoiceTab /> },
    { icon: ScriptIcon, text: '스크립트', content: <ScriptTab /> },
    { icon: CompareIcon, text: '비교', content: <CompareTab /> },
    { icon: SettingIcon, text: '설정', content: <SettingTab /> },
  ];

  const dispatch = useDispatch();
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  const selectedTab = useSelector((state) => state.room.selectedTab);

  // 탭 클릭 시 호출되는 핸들러
  const handleTabClick = (index) => {
    if (selectedTab === index) {
      dispatch(toggleSidebar());
    } else {
      dispatch(selectTab(index));
      if (!isSidebarOpen) {
        dispatch(toggleSidebar());
      }
    }
  };

  // 탭 별 content 처리
  const getTabContent = (index) => {
    return index !== null ? tabItem[index] : tabItem[0];
  };

  useEffect(() => {
    // 비동기 함수 정의
    const fetchData = async () => {
      try {
        const profile = await getProfile(oauthId);
        if (profile.voiceModelCreated == 1) dispatch(addVoiceModel(oauthId));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    // 비동기 함수 호출
    fetchData();
  }, [oauthId]); // 의존성 배열에 oauthId 추가

  return (
    <>
      <Box display='flex' flexDirection='row' height='calc(100vh - 64px)'>
        {/* 컨텐츠 영역 */}
        <Box display='flex' flexDirection='column' flexGrow={5}>
          {/* 좌측 컨텐츠 */}
          <Box
            flex={1}
            p={2}
            sx={{
              backgroundColor: '#f0f0f0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PresentationMain />
          </Box>

          <BottomBar src='' />
        </Box>
        {/* 여닫히는 커스텀 사이드바 */}
        <SideTab item={getTabContent(selectedTab)} />
        {/* 우측 고정된 세로탭 */}
        <Sidebar tabItem={tabItem} handleTabClick={handleTabClick} />
      </Box>
    </>
  );
};

export default SoloPage;
