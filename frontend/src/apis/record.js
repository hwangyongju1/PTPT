import { RecordOV } from '../util/http-commons';
const axios = RecordOV();
const { VITE_NODE_API_URL } = import.meta.env;
const { VITE_API_URL } = import.meta.env;

// start recording
export const startRecording = async (sessionName) => {
  try {
    const response = await axios.post(
      // var SERVE R_PORT = process.env.SERVER_PORT || 5002;
      `${VITE_API_URL}/api/recording/start`,
      {
        session: sessionName, // sessionId
        outputMode: 'COMPOSED',
        hasAudio: true,
        hasVideo: true,
      }
    );
    console.log('start record : ' + response.data)
    return response;
  } catch (error) {
    console.log('start recording error : ' + error);
  }
};

export const stopRecording = async (recordSessionId) => {
  try {
    const response = await axios.post(
      // zip 형식으로 저장
      `${VITE_API_URL}/api/recording/stop`,
      {
        // start response의 id 값(not sessionId) -> id가 영상마다 고유한 id
        recording: recordSessionId,
      }
    );
    console.log('stop record : ' + response.data)
    return response;
  } catch (error) {
    console.log('stop recording error : ' + error);
  }
};

export const getRecording = (recordSessionId) => {
  try {
    const response = axios.get(
      `${VITE_API_URL}/api/recording/get/${recordSessionId}`
    );
    console.log('get record : ' + response.data)
    return response;
  } catch (error) {
    console.log('get recording error : ' + error);
  }
};
