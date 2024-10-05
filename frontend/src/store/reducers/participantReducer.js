const initialState = {
  participants: [],
  isUseParticipants: false,
  evaluateParticipants: [],
};

const participantReducer = (state = initialState, action) => {
  console.log('Action received:', action); // 액션 로그
  switch (action.type) {
    case 'USE_PARTICIPANTS':
      return {
        ...state,
        isUseParticipants: !state.isUseParticipants,
      };
    case 'SET_PARTICIPANTS':
      return {
        ...state,
        participants: action.payload,
      };

    case 'EVAL_PARTICIPANTS':
      return {
        ...state,
        evaluateParticipants: [...state.evaluateParticipants, action.payload],
      };

    case 'CLEAR_PARTICIPANTS':
      return {
        ...state,
        participants: [],
        evaluateParticipants: [],
      };
    default:
      return state;
  }
};

export default participantReducer;