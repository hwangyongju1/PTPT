// 리듀서: store에 들어갈 state와 state를 바꿀 함수 정의
// state와 state를 바꿀 함수를 정의하는 곳
const initialState = {
  presetId: null,
  voiceModel: [
    'ko-KR-Standard-A',
    'ko-KR-Standard-B',
    'ko-KR-Standard-C',
    'ko-KR-Standard-D',
  ],
  title: null,
  script: [], // { title: '디폴트', content: '안녕하세요 기본값입니다.' }
  // {title: "", content: "", voiceSetting: {model: 0, tone: 3, speakingRate: 2}} 리스트 형식 -> 불러올 때는 인덱스 사용
  voiceRecord: [], // 내 녹음본
  guideline: [], // 가이드라인
  isRecording: false,
  expectedQuestion: false,
  createdTime: null,
  isCompleted: false,
  presentationSheet: null,
  tempScript: null, // {index, script}, script: {title: , content: } 형식
};

// state 수정하는 방법
const soloReducer = (state = initialState, action) => {
  // STATE를 수정하는 방식을 다 정해둠 -> type : type에 따른 처리
  switch (action.type) {
    case 'REGISTER_GUIDELINE':
      return {
        ...state,
        script: state.script.map((item, index) =>
          index === action.payload.index
            ? {
                ...item,
                guideline: action.payload.guideline,
                voiceSetting: action.payload.setting,
              }
            : item
        ),
      };
    case 'USE_TEMP_SCRIPT':
      return {
        ...state,
        tempScript: action.payload,
      };
    case 'UPDATE_SCRIPT':
      return {
        ...state,
        script: state.script.map((item, index) =>
          index === action.payload.index
            ? {
                ...item,
                ...action.payload.script,
              }
            : item
        ),
      };
    case 'CREATE_SCRIPT':
      return {
        ...state,
        script: [...state.script, action.payload.script], // 새로운 스크립트를 추가
      };
    case 'DELETE_SCRIPT':
      return {
        ...state,
        script: state.script.filter((_, index) => index !== action.index),
      };
    case 'REGISTER_VOICERECORD':
      return {
        ...state,
        voiceRecord: [...state.voiceRecord, action.payload],
      };
    case 'INIT_PRESET':
      if (action.payload === null) {
        return initialState;
      }
      return {
        ...state,
        presetId: action.payload.presetId,
        title: action.payload.title,
        createdTime: action.payload.createdTime,
        isCompleted: action.payload.isCompleted,
        presentationSheet: action.payload.presentationSheet,
        script: action.payload.script,
      };
    case 'ADD_VOICEMODEL':
      return {
        ...state,
        voiceModel: [...state.voiceModel, 'vm' + action.payload + '.pth'],
      };
    case 'REGISTER_PRESENTATION_SHEET':
      return {
        ...state,
        presentationSheet: action.payload,
      };
    default:
      return state;
  }
};

export default soloReducer;
