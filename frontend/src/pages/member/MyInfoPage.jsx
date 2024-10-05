// MyInfoPage.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyInfoSidebar from '../../components/organisms/myInfo/MyInfoSidebar';
import StatisticsPage from '../../components/organisms/myInfo/StatisticsPage';
import SavedRoomsPage from '../../components/organisms/myInfo/SavedRoomsPage';
import VoiceModelPage from '../../components/organisms/myInfo/VoiceModelPage';
import FeedbackDetail from '../../components/organisms/myInfo/FeedbackDetail';

const Container = styled.div`
  display: flex;
  margin: 0px 150px;
  margin-top: 30px; /* 상단 여백 추가 */
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */

  @media (max-width: 1200px) {
    margin: 0px 100px;
  }
  @media (max-width: 768px) {
    margin: 0px 50px;
  }
  @media (max-width: 480px) {
    margin: 0px 20px;
  }
`;

const WelcomeMessage = styled.div`
  font-size: 18px;
  line-height: 1.5;
  color: #333;
  text-align: center;
  margin-top: 20px;

  br {
    margin-bottom: 10px;
  }
`;

const MyInfoContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
`;

const MyInfoPage = () => {
  return (
    <Container>
      <MyInfoSidebar /> {/* 고정된 사이드바 */}
      <MyInfoContent>
        <Routes>
          <Route path='statistics' element={<StatisticsPage />} />
          <Route
            path='statistics/evaluation/feedBack/:studyRoomId'
            element={<FeedbackDetail />}
          />
          <Route path='saved-rooms' element={<SavedRoomsPage />} />
          <Route path='voice-model' element={<VoiceModelPage />} />
          <Route
            path='/'
            element={
              <WelcomeMessage>
                <h3>Welcome to My Info</h3>
                <br /> 좌측 탭을 선택해주세요!
              </WelcomeMessage>
            }
          />
        </Routes>
      </MyInfoContent>
    </Container>
  );
};

export default MyInfoPage;
