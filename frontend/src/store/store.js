import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore } from 'redux-persist';

const store = createStore(rootReducer, applyMiddleware(thunk)); // Redux Thunk 미들웨어 추가
export const persistor = persistStore(store);
export default store;
