// store/actions/userActions.js
import axios from 'axios';
import {
  SET_USER_PROFILE,
  LOG_OUT,
  UPDATE_NICKNAME,
  UPDATE_PROFILE_PICTURE,
  SET_PROFILE_IMAGE,
} from '../types/userTypes';

// 사용자 프로필 설정 액션 생성자
export const setUserProfile = (data) => ({
  type: SET_USER_PROFILE,
  data,
});

// 로그아웃 액션 생성자
export const logOut = () => ({
  type: LOG_OUT,
});

// 닉네임 업데이트 액션 생성자
export const updateNickname = (nickname) => ({
  type: UPDATE_NICKNAME,
  payload: nickname,
});

// 프로필 업데이트 액션 생성자
export const updateProfilePicture = (profilePicture) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: profilePicture,
});

// 프로필 이미지 관리 액션 생성자
export const setProfileImage = (profileImageUrl) => ({
  type: SET_PROFILE_IMAGE,
  payload: profileImageUrl,
});

// 사용자 정보를 가져오는 비동기 액션 생성자
export const fetchUserProfile = (oauthId) => async (dispatch) => {
  try {
    const response = await axios.get(`/member/profile/${oauthId}`);
    dispatch(setUserProfile(response.data));
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
};
