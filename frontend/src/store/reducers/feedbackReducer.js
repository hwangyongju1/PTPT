import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';

const initialState = {
  loading: false,
  feedbackList: [], // 피드백 데이터를 저장하는 배열
  error: null,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedback: action.payload, // 데이터를 Redux 상태에 저장
        feedbackList: action.payload, // 성공적으로 데이터를 가져왔을 때 상태 업데이트
      };
    case FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
