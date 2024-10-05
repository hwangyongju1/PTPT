import { Axios } from '../util/http-commons';
const { VITE_API_URL } = import.meta.env;
const axios = Axios();

// 엑세스 토큰 요청 함수
// export const fetchAccessToken = async (authorizationCode, provider) => {
//   try {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/oauth/${provider}`,
//       {
//         code: authorizationCode,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching access token:', error);
//     throw error;
//   }
// };

export const createStudyRoom = async (userId, roomInfo) => {
  try {
    const response = await axios.post(`/studyRoom`, {
      studyRoomTitle: roomInfo.roomname,
      studyRoomPw: roomInfo.roompw,
      oauthId: userId, // 방장 아이디(host) -> oauth_id로 수정 필요
      isPublic: roomInfo.roomopen,
      presentationTime: roomInfo.roomtime,
      subject: roomInfo.roomtopic,
      description: roomInfo.roomcomment,
      anonymity: roomInfo.roomhidden,
      entryList: [], // 사용자 추가
    });
    // response.data == roomId
    return response.data;
  } catch (error) {
    console.log('create study room error : ' + error);
  }
};

export const detailStudyRoom = async (path) => {
  try {
    const response = await axios.get(`/studyRoom/${path}`);
    return response.data;
  } catch (error) {
    console.log('room detail get error : ' + error);
  }
};

export const loadRoomList = async (page) => {
  try {
    await Axios.post;
    const response = await axios.get(`/studyRoom`, {
      params: {
        page: page,
        size: 10,
        sort: 'studyRoomId',
      },
    });
    return response;
  } catch (error) {
    console.log('list error : ', error);
  }
};

export const searchByStudyRoomName = async (studyRoomTitle, page) => {
  try {
    const response = await axios.get(`/studyRoom/search/${studyRoomTitle}`, {
      params: {
        page: page,
        size: 10,
        sort: 'studyRoomId',
      },
    });
    return response;
  } catch (error) {
    console.log('searchByStudyRoomTitle error : ' + error);
  }
};

// 비밀번호가 틀렸을 때의 response를 RoomListItem으로 어떻게 가져오지?
export const checkStudyRoomPW = async (studyRoomId, studyRoomPw) => {
  try {
    const response = await axios.post(`/studyRoom/pwCheck`, {
      studyRoomId: studyRoomId,
      studyRoomPw: studyRoomPw,
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log('checkPW error : ' + error);
    return error;
  }
};

// 평가 관련 함수
// user oauth id도 입력값으로 받아오기
export const submitEvaluate = async (evaluateInfo, studyRoomId) => {
  try {
    const response = await axios.post(`/evaluation `, {
      delivery: evaluateInfo.delivery,
      expression: evaluateInfo.expression,
      preparation: evaluateInfo.preparation,
      logic: evaluateInfo.logic,
      suitability: evaluateInfo.suitability,
      master: evaluateInfo.master, // 평가 주는 사람 : null 가능
      slave: evaluateInfo.slave, // 평가 당하는 사람
      commentContent: evaluateInfo.commentContent,
      isAnonymous: evaluateInfo.isAnonymous,
      studyRoomId: studyRoomId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const takeMyEvaluate = async (studyRoomId, userId) => {
  try {
    const response = await axios.post(`/evaluation/feedBack`, {
      studyRoomId: studyRoomId,
      oauthId: userId,
    });
    return response.data;
  } catch (error) {
    console.log('take my evaluate info error : ' + error);
  }
};

// 참가자 등록 api
export const adminParticipants = async (studyRoomId, participants) => {
  try {
    const response = await axios.post(`/studyRoom/entry`, {
      studyRoomId: studyRoomId,
      nicknameList: participants,
    });
  } catch (error) {
    console.log('admin participants error : ' + error);
  }
};

// 참가자 신고 및 발표자 지정 api
// 참가자 신고
export const reportParticipants = async (nickname) => {
  try {
    const response = await axios.post(`member/report`, {
      nickname: nickname,
    });
  } catch (error) {
    console.log('report error : ' + error);
  }
};

// 발표자 등록
export const assignationParticipants = async (studyRoomId, nickname) => {
  try {
    const response = await axios.post(`studyRoom/assignation`, {
      studyRoomId: studyRoomId,
      nickname: nickname,
    });
  } catch (error) {
    console.log('assignation error : ' + error);
  }
};

// 스터디룸 퇴장 및 종료
// 스터디룸 퇴장 -> 개인이 나갈 때
export const exitRoom = (studyRoomId, nickname) => {
  try {
    const response = axios.delete(`studyRoom/exit`, {
      data: { studyRoomId: studyRoomId, nickname: nickname },
    });
    console.log('------------exit room response---------- ');
    console.log(response.data);
    return response;
  } catch (error) {
    console.log('exit room error : ' + error);
  }
};

// 종료 -> 참가자가 0명일 때
export const clearRoom = (studyRoomId) => {
  try {
    const response = axios.post(`studyRoom/clear`, {
      studyRoomId: studyRoomId,
    });
    console.log('------------clear room response---------- ');
    console.log(response.data);
  } catch (error) {
    console.log('clear room error : ' + error);
  }
};

// 방 정보 수정
export const modifyStudyRoomInfo = (studyRoomId, studyRoomInfo) => {
  try {
    const response = axios.put(`studyRoom/${studyRoomId}`, {
      isPublic: studyRoomInfo.isPublic,
      studyRoomPw: studyRoomInfo.studyRoomPw,
      presentationTime: studyRoomInfo.presentationTime,
      subject: studyRoomInfo.subject,
      description: studyRoomInfo.description,
      anonymity: studyRoomInfo.anonymity,
      studyRoomTitle: studyRoomInfo.studyRoomTitle,
    });
    return response;
  } catch (error) {
    console.log('modify room error : ' + error);
  }
};
