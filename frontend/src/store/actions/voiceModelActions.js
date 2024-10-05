import { SET_LOADING } from '../types/voiceModelTypes';

// 음성 모델 데이터 설정 액션 생성자
export const setLoading = (data) => ({
  type: SET_LOADING,
  data,
});
