// store/reducers/voiceModelReducer.js

/**
 * 음성 모델 리듀서
 * 초기 상태를 정의하고, 액션 타입에 따라 상태를 업데이트합니다.
 * SET_VOICE_MODEL, FETCH_VOICE_MODEL_ERROR, UPLOAD_VOICE_MODEL_SUCCESS, UPLOAD_VOICE_MODEL_ERROR 액션을 처리합니다.
 */

import { SET_LOADING } from '../types/voiceModelTypes';

// 초기 상태 정의
const initialState = {
  loading: false,
};

// 음성 모델 리듀서 정의
const voiceModelReducer = (state = initialState, action) => {
  switch (action.type) {
    // 음성 모델 데이터 설정 액션 처리
    case SET_LOADING:
      return { loading: action.data };
    default:
      return state;
  }
};

export default voiceModelReducer;
