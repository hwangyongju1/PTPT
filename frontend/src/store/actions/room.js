import { SET_ROOM_SESSION, CLEAR_ROOM_SESSION } from '../types/room';
import {
  TOGGLE_SIDEBAR,
  SELECT_TAB,
  CLEAR_TAB,
  TOGGLE_SCRIPT_SELECT,
  EVALUATE_ANONYMOUS,
  IS_START_PRESANTATION,
  PRESENTATION_TIME,
  SET_HOST_NAME,
  IS_RECORDING,
  RECORD_SESSION_ID,
  OPENVIDU_SESSION_ID,
} from '../types/room';

const toggleScriptSelect = (flag) => ({
  type: TOGGLE_SCRIPT_SELECT,
  flag,
});

const setRoomSession = (data) => {
  return {
    type: SET_ROOM_SESSION,
    data,
  };
};

const clearRoomSession = () => {
  return {
    type: CLEAR_ROOM_SESSION,
  };
};

const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};

const selectTab = (index) => {
  return {
    type: SELECT_TAB,
    payload: index,
  };
};

const clearTab = () => {
  return {
    type: CLEAR_TAB,
  };
};

const setAnonymous = (isAnonymous) => {
  return {
    type: EVALUATE_ANONYMOUS,
    payload: isAnonymous,
  };
};

// 지금 안쓰고 있음
const isStartPresantation = () => {
  return {
    type: IS_START_PRESANTATION,
  };
};

const setPresentationTime = (time) => {
  return {
    type: PRESENTATION_TIME,
    payload: time,
  };
};

const setHost = (userId) => {
  return {
    type: SET_HOST_NAME,
    payload: userId,
  };
};

const setIsRecording = () => {
  return {
    type: IS_RECORDING,
  };
};

const setOpenviduSessionId = (openviduSessionId) => {
  return {
    type: OPENVIDU_SESSION_ID,
    payload: openviduSessionId,
  };
};

const setRecordSessionId = (sessionId) => {
  return {
    type: RECORD_SESSION_ID,
    payload: sessionId,
  };
};

export {
  setRoomSession,
  clearRoomSession,
  toggleSidebar,
  selectTab,
  clearTab,
  toggleScriptSelect,
  setAnonymous,
  isStartPresantation,
  setPresentationTime,
  setHost,
  setIsRecording,
  setOpenviduSessionId,
  setRecordSessionId,
};
