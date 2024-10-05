import {
  SET_AUTH,
  LOG_OUT,
  UPDATE_NICKNAME,
  SET_OAUTH_ID,
} from '../types/authTypes';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  oauthId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: !!action.token, // token이 존재하면 true로 설정
        token: action.token,
        user: {
          ...state.user,
          ...action.user,
        },
      };
    case SET_OAUTH_ID:
      console.log('SET_OAUTH_ID Action:', action); // 콘솔 로그 추가
      return {
        ...state,
        oauthId: action.oauthId,
      };
    case LOG_OUT:
      console.log('LOG_OUT Action:', action); // 콘솔 로그 추가
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        oauthId: null,
      };
    case UPDATE_NICKNAME:
      return {
        ...state,
        user: {
          ...state.user,
          nickname: action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
