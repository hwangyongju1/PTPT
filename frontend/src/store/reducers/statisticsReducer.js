import {
  STATISTICS_REQUEST,
  STATISTICS_SUCCESS,
  STATISTICS_FAILURE,
} from '../types/statisticsTypes';

const initialState = {
  loading: false,
  statistics: null,
  error: null,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATISTICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: action.payload,
      };
    case STATISTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default statisticsReducer;
