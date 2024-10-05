import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  googleSignin,
  verifyGoogleAccessToken,
  getProfile,
} from '../../apis/auth';
import { setAuth } from '../../store/actions/authActions';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCode, setAuthCode] = useState(null); // 인가 코드 상태
  const [token, setToken] = useState(null); // 액세스 토큰 및 ID 토큰 상태
  const [tokenVerified, setTokenVerified] = useState(null); // 토큰 검증 상태

  useEffect(() => {
    // URL에서 authorization code를 추출
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      console.log('Authorization code:', code);
      setAuthCode(code); // 인가 코드를 상태에 저장

      // authorization code를 사용하여 백엔드에서 access token과 id token을 요청
      googleSignin(code)
        .then(async (data) => {
          // data = {accessToken, memberId(oauthId), message, statusCode}
          console.log('Token received:', data);
          setToken(data);

          const verificationResult = await verifyGoogleAccessToken(
            data.accessToken
          );
          console.log('Token verification result:', verificationResult);
          setTokenVerified(verificationResult.message === 'Valid Token');

          if (data.message === 'Existing Member') {
            try {
              const profile = await getProfile(data.memberId);
              console.log('Profile data:', profile);

              if (profile) {
                // 기존 회원인 경우
                console.log('기존회원입니다. 메인페이지로 이동');
                dispatch(
                  setAuth(data.accessToken, {
                    oauthId: data.memberId,
                    nickname: profile.nickname,
                  })
                );
                navigate('/');
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
              console.log('신규 회원입니다. 정보 입력 페이지로 이동');
              navigate('/userinfo', {
                state: { token: data.accessToken, memberId: data.memberId },
              }); // 프로필 조회 실패 시에도 페이지 이동
            }
          } else {
            console.log('신규 회원입니다. 정보 입력 페이지로 이동');
            navigate('/userinfo', {
              state: { token: data.accessToken, memberId: data.memberId },
            }); // 신규 회원인 경우 페이지 이동
          }
        })
        .catch((error) => {
          console.error('Error during Google sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]);

  return (
    <div>
      <h1>Google Processing Authentication...</h1>
      {authCode && (
        <div>
          <p>Authorization code: {authCode}</p>
        </div>
      )}
      {token && (
        <div>
          <p>Access Token: {token.accessToken}</p>
          <p>Member Id: {token.memberId}</p>
          <p>ID Token: {token.id_token}</p>
        </div>
      )}
      {tokenVerified !== null && (
        <div>
          <p>Token Verified: {tokenVerified ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
