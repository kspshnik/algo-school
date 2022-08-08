import { Action, ActionCreator, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import Sentry from '../sentry';
import viewReducer from './view-slice';
import formsReducer from './forms-slice';

export const rootReducer = combineReducers({
  view: viewReducer,
  forms: formsReducer,

});

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [sentryReduxEnhancer],
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, RootState, unknown, Action>
>;

export default store;
