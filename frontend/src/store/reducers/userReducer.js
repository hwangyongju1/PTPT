/**
 * 사용자 리듀서
 * 초기 상태를 정의하고, 액션 타입에 따라 상태를 업데이트합니다.
 * SET_USER_PROFILE, LOG_OUT, UPDATE_NICKNAME 액션을 처리합니다.
 */

import {
  SET_USER_PROFILE,
  LOG_OUT,
  UPDATE_NICKNAME,
  UPDATE_PROFILE_PICTURE,
  SET_PROFILE_IMAGE,
} from '../types/userTypes';

// 초기 상태 정의
const initialState = {
  isLogin: false, // 사용자의 로그인 상태를 나타냅니다.
  userId: null, // oauth_id
  nickname: null,
  // data: {
  //   userId: null,
  //   nickname: null
  // }
};

// 사용자 리듀서 정의
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // 사용자 프로필 설정 액션 처리
    case SET_USER_PROFILE:
      return {
        ...state, // 기존 상태를 복사
        isLogin: true, // 로그인 상태를 true로 변경
        // data: { ...action.data },
        userId: action.data.oauthId,
        nickname: action.data.nickname,
      };
    // 로그아웃 액션 처리
    case LOG_OUT:
      return {
        ...state, // 기존 상태를 복사
        isLogin: false, // 로그인 상태를 false로 변경
        data: null, // 사용자 정보를 초기화
      };
    // 닉네임 업데이트 액션 처리
    case UPDATE_NICKNAME:
      return {
        ...state, // 기존 상태를 복사
        data: {
          ...state.data, // 기존 사용자 정보를 복사
          nickname: action.payload, // 닉네임만 업데이트
        },
      };
    // 프로필 업데이트 액션 처리
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        data: {
          ...state.data,
          memberPicture: action.payload,
        },
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload,
      };
    // 기본적으로 기존 상태를 반환
    default:
      return state;
  }
};

export default userReducer;
