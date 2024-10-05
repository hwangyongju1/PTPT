import React from 'react';
import styled from 'styled-components';
import KakaoButton from '../../components/atoms/KakaoButton';
import GoogleButton from '../../components/atoms/GoogleButton';

// 컨테이너 스타일 정의
const Container = styled.div`
  display: flex;
  min-height: 80vh;
  margin: 20px 150px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

// 좌측 이미지 스타일 정의
const LeftSide = styled.div`
  flex: 1;
  padding-left: 50px;
  background-color: rgba(0, 0, 0, 0.3); /* 반투명한 검은색 배경 */
  background-image: url('/loginbutton.svg');
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

// 우측 콘텐츠 스타일 정의
const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

// 버튼 그룹 스타일 정의
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledHr = styled.hr`
  width: 70%;
  border: 0.5px solid #ccc;
  margin: 25px 0;
`;

const LoginPage = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const KAKAO_LINK = `${VITE_API_URL}/oauth2/authorization/kakao`;
  const GOOGLE_LINK = `${VITE_API_URL}/oauth2/authorization/google`;

  // 카카오 로그인 핸들러 함수
  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_LINK;
  };

  // 구글 로그인 핸들러 함수
  const googleLoginHandler = () => {
    window.location.href = GOOGLE_LINK;
  };

  return (
    <Container>
      <LeftSide />
      <RightSide>
        <h1>Login</h1>
        간편하게 로그인하고 발표 준비를 시작하세요!
        <StyledHr />
        <ButtonGroup>
          <GoogleButton
            onClick={googleLoginHandler}
            symbolSize='24px'
            symbolMargin='8px'
          >
            Sign in with Google
          </GoogleButton>
          <KakaoButton
            onClick={kakaoLoginHandler}
            symbolSize='24px'
            symbolMargin='8px'
          >
            Sign in with Kakao
          </KakaoButton>
        </ButtonGroup>
      </RightSide>
    </Container>
  );
};

export default LoginPage;
