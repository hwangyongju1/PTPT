import { Axios } from '../util/http-commons';

const instance = Axios();

// 사용자 통계 조회 함수
export const getMemberStatistics = async (oauthId) => {
  try {
    const response = await instance.post('/member/statistic', {
      oauthId,
    });
    console.log('API response:', response.data); // 콘솔 출력
    return response.data;
  } catch (error) {
    console.error('Error fetching member statistics:', error);
    throw error;
  }
};
