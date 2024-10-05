import {
  SET_SAVED_ROOMS,
  SAVED_ROOMS_SUCCESS,
  SAVED_ROOMS_FAILURE,
} from '../types/savedRoomsTypes';

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
        ...state,
        loading: true,
      };
    case SAVED_ROOMS_SUCCESS:
      return {
        ...state,
        savedStudyRooms: action.payload, // 상태 이름 변경
        loading: false,
      };
    case SAVED_ROOMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default savedRoomsReducer;
