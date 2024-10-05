const initialState = {
  sessionName: null,
  roomId: null,
  isSidebarOpen: false,
  selectedTab: null,
  isSelectScriptTab: true,
  editFlag: null,
  // 발표 관련
  isAnonymous: 0,
  isStart: false, // 참가자가 등록된 후 버튼 활성화를 위한 상태
  presentationTime: null,
  hostId: null,
  // 녹화관련
  isRecord: false, // true : 녹화중
  openviduSessionId: null, // openvidu에서 제공하는 sesison
  recordSessionId: null, // 녹화 session id
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM_SESSION':
      return {
        ...state,
        ...action.data,
      };
    case 'CLEAR_ROOM_SESSION':
      return {
        ...initialState,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case 'SELECT_TAB':
      return {
        ...state,
        selectedTab: action.payload,
      };
    case 'CLEAR_TAB':
      return {
        ...state,
        selectedTab: null,
      };
    case 'TOGGLE_SCRIPT_SELECT':
      return {
        ...state,
        editFlag: action.flag,
        isSelectScriptTab: !state.isSelectScriptTab,
      };
    case 'EVALUATE_ANONYMOUS':
      return {
        ...state,
        isAnonymous: action.payload,
      };
    case 'IS_START_PRESANTATION':
      return {
        ...state,
        isStart: !state.isStart,
      };
    case 'PRESENTATION_TIME':
      return {
        ...state,
        presentationTime: action.payload,
      };
    case 'SET_HOST_NAME':
      return {
        ...state,
        hostId: action.payload,
      };
    case 'IS_RECORDING':
      return {
        ...state,
        isRecord: !state.isRecord,
      };
    case 'OPENVIDU_SESSION_ID':
      return {
        ...state,
        openviduSessionId: action.payload,
      };
    case 'RECORD_SESSION_ID':
      return {
        ...state,
        recordSessionId: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

// export const store = createStore

export default roomReducer;
