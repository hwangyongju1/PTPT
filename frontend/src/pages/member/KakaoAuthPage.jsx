import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  kakaoSignin,
  verifyKakaoAccessToken,
  getProfile,
} from '../../apis/auth';
import { setAuth } from '../../store/actions/authActions';

const KakaoAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCode, setAuthCode] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenVerified, setTokenVerified] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      console.log('Authorization code:', code);
      setAuthCode(code);

      kakaoSignin(code)
        .then(async (data) => {
          // data = {accessToken, memberId(oauthId), message, statusCode}
          console.log('Token received:', data);
          setToken(data);

          const verificationResult = await verifyKakaoAccessToken(
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
            console.log('신규 회원입니다. 정보 입력 모달');
            navigate('/userinfo', {
              state: { token: data.accessToken, memberId: data.memberId },
            }); // 신규 회원인 경우 페이지 이동
          }
        })
        .catch((error) => {
          console.error('Error during Kakao sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]);

  return (
    <div>
      <h1>Kakao Processing Authentication...</h1>
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

export default KakaoAuthPage;
