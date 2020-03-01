import { combineReducers } from 'redux';

import TheBallReducer from './TheBallReducer';
import TheBallAnimation from './TheBallAnimation';

const Reducers = combineReducers({
  Ball: TheBallReducer,
  BallAnime: TheBallAnimation
});

export default Reducers;
