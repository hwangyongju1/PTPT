import { Axios } from '../../util/http-commons';
import { SET_AUTH, LOG_OUT, SET_OAUTH_ID } from '../types/authTypes';

const instance = Axios();

// 인증 상태 설정 액션 생성자
export const setAuth = (token, user) => ({
  type: SET_AUTH,
  token,
  user,
});

// oauthId 설정 액션 생성자
export const setOauthId = (oauthId) => ({
  type: SET_OAUTH_ID,
  oauthId,
});

// 로그아웃 액션 생성자
export const logOut = () => ({
  type: LOG_OUT,
});

// 로그인 비동기 액션 생성자
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await instance.post('/member/signin', credentials);
    console.log('Login response:', response.data);
    const { token, user } = response.data;

    if (token && user) {
      dispatch(setAuth(token, user));
    } else {
      console.error('Failed to get token or user from response.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// 로그아웃 비동기 액션 생성자
export const logout = () => async (dispatch) => {
  try {
    await instance.get('/member/signout'); // 로그아웃 엔드포인트 호출

    // 쿠키에서 JWT 토큰 삭제
    document.cookie = 'Authorization=; Max-Age=0; path=/;';

    dispatch(logOut()); // Redux 상태에서 사용자 정보 제거
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Demo 로그인 액션 생성자
export const demoLogin = () => (dispatch) => {
  const demoUser = { oauthId: 'demo-oauth-id', nickname: 'Demo User' };
  dispatch(setAuth('demo-token', demoUser));
};

// Demo 로그아웃 액션 생성자
export const demoLogout = () => (dispatch) => {
  dispatch(logOut());
};
