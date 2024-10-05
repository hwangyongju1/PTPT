import { Axios } from '../util/http-commons';

const axios = Axios();

function savePreset(param, success, fail) {
  axios.post('/preset', param).then(success).catch(fail);
}

function modifyPreset(presetId, param, success, fail) {
  axios.put(`/preset/${presetId}`, param).then(success).catch(fail);
}

function deletePreset(presetId, success, fail) {
  axios.delete(`/preset/${presetId}`).then(success).catch(fail);
}

async function getPresetList(param) {
  try {
    const response = await axios.post('/preset/search', param);
    return response; // 성공 시 응답 반환
  } catch (error) {
    throw error; // 실패 시 에러를 throw
  }
}

export { savePreset, modifyPreset, deletePreset, getPresetList };
