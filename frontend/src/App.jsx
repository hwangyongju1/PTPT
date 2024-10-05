import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import MainPage from './pages/MainPage';
import LoginPage from './pages/member/LoginPage';
import AuthPage from './pages/member/AuthPage';
import KakaoAuthPage from './pages/member/KakaoAuthPage';
import UserInfoPage from './pages/member/UserInfoPage';
import PracticePage from './pages/presentation/PracticePage';
import VoiceTestPage from './pages/VoiceTestPage';
import SoloPage from './pages/presentation/SoloPage';
import MultiPage from './pages/presentation/MultiPage';
import MyInfoPage from './pages/member/MyInfoPage';
import StatisticsPage from './components/organisms/myInfo/StatisticsPage';
import FeedbackDetail from './components/organisms/myInfo/FeedbackDetail'; // 피드백 상세 페이지 추가
import Nav from './components/organisms/Navbar';
// import VideoRoomComponent from './components/room/openVidu/VideoRoomComponent';
import CreateRoom from './pages/room/CreateRoom';
import VideoRoomComponent from './pages/room/openVidu/VideoRoomComponent';
import RoomListPage from './pages/RoomListPage';
import RoomDetail from './pages/room/RoomDetail';
import { setOauthId, setAuth } from './store/actions/authActions'; // 추가된 부분
import PrivateRoute from './routes/PrivateRoute';
import { getProfile } from './apis/auth';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  // oauthId 값을 추출
  const paramOauthId = params.get('oauthId');

  useEffect(() => {
    console.log(paramOauthId);
    const fetchData = async () => {
      try {
        const profile = await getProfile(paramOauthId);
        const user = {
          oauthId: paramOauthId,
          nickname: profile.nickname,
          memberPicture: profile.memberPicture,
          voiceModelCreated: profile.voiceModelCreated,
        };
        dispatch(setAuth('token', user));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (paramOauthId) {
      fetchData();
    }
  }, [paramOauthId]);

  useEffect(() => {
    let user = null;
    let oauthId = null;

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('Authorization='))
      ?.split('=')[1];

    const logined = document.cookie
      .split('; ')
      .find((row) => row.startsWith('logined='))
      ?.split('=')[1];

    console.log(logined);
    console.log('Extracted JWT Token:', token);
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );

        console.log(base64Url);
        user = JSON.parse(jsonPayload);
        oauthId = user.oauthId; // OAuth ID 추출
        console.log('Decoded User Info:', user);
        console.log('OAuth ID:', oauthId); // OAuth ID 출력
      } catch (error) {
        console.error('Failed to decode JWT token:', error);
      }
    }

    if (oauthId) {
      console.log('Dispatching OAuth ID:', oauthId); // 추가된 로그
      dispatch(setOauthId(oauthId)); // 상태에 OAuth ID 저장
    }
    // if (token) {
    //   dispatch(setAuth(token, user)); // 상태에 JWT 토큰과 사용자 정보 저장
    // }

    console.log(token, oauthId);
  }, [dispatch]);

  return (
    <div className='App' style={{ paddingTop: '64px' }}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/auth/kakao' element={<KakaoAuthPage />} />
        <Route path='/userinfo' element={<UserInfoPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/practice' element={<PracticePage />} />
          <Route path='/solo' element={<SoloPage />} />
          <Route path='/multi/:roomId' element={<MultiPage />} />
          <Route path='/myinfo/*' element={<MyInfoPage />} />
          <Route path='/createroom' element={<CreateRoom />} />
          <Route path='/room/detail' element={<VideoRoomComponent />} />
          <Route path='room/list' element={<RoomListPage />} />
          <Route path='/room/:roomId' element={<RoomDetail />} />
          <Route path='/test' element={<VoiceTestPage />} />
        </Route>
        {/* 피드백 상세 페이지 라우트 */}
      </Routes>
    </div>
  );
}

export default App;
