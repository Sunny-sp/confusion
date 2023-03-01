import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Leaders } from './leaders';
import { Promotions } from './promotions';
import { Comments } from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './Forms';
import { Auth } from './auth';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      leaders: Leaders,
      promotions: Promotions,
      comments: Comments,
      auth: Auth,
      ...createForms({
        feedback: InitialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
