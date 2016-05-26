import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  form,
  moodPoll: require('./moodPoll').default,
});

export default rootReducer;
