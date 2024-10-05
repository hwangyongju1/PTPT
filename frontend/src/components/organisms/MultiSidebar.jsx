// src/components/organisms/Sidebar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import IconButton from '../atoms/IconButton';
import { toggleSidebar, selectTab, clearTab } from '../../store/actions/room';
import { adminParticipants } from '../../apis/room';
import useInterval from '../../util/useInterval';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import MultiStartModal from '../molecules/MultiStartModal';
import { isStartPresantation } from '../../store/actions/room';

const MultiSidebar = ({ tabItem }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector((state) => state.room.selectedTab);
  const isSidebarOpen = useSelector((state) => state.room.isSidebarOpen);
  // 현재 시간을 저장하기 위함 -> Date library 이용
  const [realTime, setRealTime] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const studyRoomId = useSelector((state) => state.room.roomId);
  const presentationTime = useSelector((state) => state.room.presentationTime);
  const participants = useSelector((state) => state.participant.participants);
  const hostNickname = useSelector((state) => state.room.hostId);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const hasExecuteRef = useRef(false);

  // 시간 호출
  useEffect(() => {
    setRealTime(new Date());
  }, [presentationTime]);
  
  useInterval(() => {
    setRealTime(new Date());
    if (
      !hasExecuteRef.current &&
      realTime.getTime() - new Date(presentationTime).getTime() >= 0
    ) {
      // 시간이 지나면 참가자 등록 modal 표시
      if(hostNickname === nickname){
        adminParticipants(studyRoomId, participants)
    }
    setModalOpen(true);
    dispatch(isStartPresantation()); // 시작 시간이 되면 평가가 되도록 구현
      hasExecuteRef.current = true; // default로 시간 지나면 검사 X
    }
  }, 5000); // 1초마다 확인


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
      {modalOpen && (
        <MultiStartModal
        open={modalOpen}
        onClose={() => 
          setModalOpen(false)
        }
        />
      )}
    </Box>
  );
};

export default MultiSidebar;
