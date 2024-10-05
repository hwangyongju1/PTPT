import { Axios } from '../../util/http-commons';
import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';

const instance = Axios();

export const fetchFeedbackDetail =
  (oauthId, studyRoomId) => async (dispatch) => {
    dispatch({ type: FEEDBACK_REQUEST });

    try {
      const response = await instance.post('/evaluation/feedBack', {
        oauthId,
        studyRoomId,
      });

      console.log('Feedback Detail Response:', response.data); // 서버로부터의 응답 데이터 확인

      dispatch({ type: FEEDBACK_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
      console.error('Failed to fetch feedback details:', error);
    }
  };

export const fetchFeedback = (oauthId, page) => async (dispatch) => {
  dispatch({ type: FEEDBACK_REQUEST });
  console.log('Using OAuth ID:', oauthId); // 요청 전에 oauthId 값을 확인합니다.

  try {
    const studyRoomResponse = await instance.post(
      '/studyRoom/search',
      { oauthId } // 페이징 파라미터 제거
    );

    const studyRooms = studyRoomResponse.data.content;
    console.log('Study Room Response:', studyRooms);

    if (studyRooms.length === 0) {
      console.log('No study rooms found for this user.');
      dispatch({ type: FEEDBACK_SUCCESS, payload: [] });
      return;
    }

    const feedbackPromises = studyRooms.map(async (room) => {
      const feedbackResponse = await instance.post('/evaluation/feedBack', {
        oauthId,
        studyRoomId: room.studyRoomId,
      });

      console.log(
        'Feedback Response for StudyRoomId:',
        room.studyRoomId,
        feedbackResponse.data
      );

      const feedbackData = feedbackResponse.data.map((feedback) => ({
        ...feedback,
        studyRoomTitle: room.studyRoomTitle,
        subject: room.subject,
      }));

      return feedbackData;
    });

    const allFeedback = (await Promise.all(feedbackPromises)).flat();
    console.log('All Feedback:', allFeedback);

    dispatch({ type: FEEDBACK_SUCCESS, payload: allFeedback });
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // 500 에러가 발생한 경우
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: '저장된 스터디룸이 없습니다.',
      });
    } else {
      dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
    }
    console.error('Failed to fetch feedback:', error);
  }
};
