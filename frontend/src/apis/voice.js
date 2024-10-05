import { Axios, AxiosMulti, Google } from '../util/http-commons';

const axios = Axios();
const axiosMulti = AxiosMulti();
const google = Google();

function textToSpeechApi(param, success, fail) {
  google.post('', param).then(success).catch(fail);
}

function uploadAudioApi(param, success, fail) {
  axiosMulti.post('/voiceModel/audio', param).then(success).catch(fail);
}

function trainModelApi(param, success, fail) {
  axiosMulti.post('voiceModel/train', param).then(success).catch(fail);
}

function testRVC(param, success, fail) {
  axios.post('/voiceModel/refresh', param).then(success).catch(fail);
}

export { textToSpeechApi, uploadAudioApi, trainModelApi, testRVC };
