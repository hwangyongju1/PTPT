import axios from 'axios';
import {
  SET_EVALUATIONS,
  FETCH_EVALUATIONS_ERROR,
} from '../types/evaluationTypes';

// 평가 데이터 설정 액션 생성자
export const setEvaluations = (data) => ({
  type: SET_EVALUATIONS,
  data,
});

// 평가 데이터 가져오기 비동기 액션 생성자
export const fetchEvaluations = (memberId) => async (dispatch) => {
  try {
    const response = await axios.get(`/evaluation/${memberId}`);
    dispatch(setEvaluations(response.data));
  } catch (error) {
    dispatch({
      type: FETCH_EVALUATIONS_ERROR,
      error,
    });
    console.error('Error fetching evaluations:', error);
  }
};
