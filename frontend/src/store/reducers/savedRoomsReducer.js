import { SET_SAVED_ROOMS } from '../types/savedRoomsTypes';

// 초기 상태 정의
const initialState = {
  data: [], // 저장한 스터디룸 데이터를 저장합니다.
  error: null, // 에러 정보를 저장합니다.
};

// 저장한 스터디룸 리듀서 정의
const savedRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAVED_ROOMS:
      return {
        ...state, // 기존 상태를 복사
        data: action.payload, // 새로운 저장한 스터디룸 데이터로 업데이트
        error: null, // 에러 상태 초기화
      };
    default:
      return state;
  }
};

export default savedRoomsReducer;
