import { SAVE_MULTI_PRESET } from '../types/multiTypes';

// 초기 상태 정의
const initialState = {
  studyRoomTitle: null,
  studyRoomPw: null,
  isPublic: true,
  presentationTime: null,
  subject: null,
  description: null,
  anonymity: null,
};

// 음성 모델 리듀서 정의
const multiReducer = (state = initialState, action) => {
  switch (action.type) {
    // 음성 모델 데이터 설정 액션 처리
    case SAVE_MULTI_PRESET:
      if (action.payload === null) {
        return initialState;
      }
      return {
        ...state,
        studyRoomTitle: action.payload.roomname,
        studyRoomPw: action.payload.roompw,
        isPublic: action.payload.roomopen,
        presentationTime: action.payload.roomtime,
        subject: action.payload.roomtopic,
        description: action.payload.roomcomment,
        anonymity: action.payload.roomhidden,
      };
    default:
      return state;
  }
};

export default multiReducer;
