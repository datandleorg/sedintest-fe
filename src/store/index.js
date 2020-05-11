import { createBrowserHistory as createHistory } from "history";
import ReduxThunk from "redux-thunk";
// import { connectRouter } from 'connected-react-router';
import { combineReducers } from "redux";
import { applyMiddleware, createStore, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import appReducer from "../action-reducer/appReducer";
// import * as globalReducerConstants from "../constants/globalReducerConstants";

export const history = createHistory();
const middlewareRouter = [ReduxThunk, routerMiddleware(history)];

const reducer = combineReducers({
  ...appReducer,
  router: connectRouter(history)
});

/*
This function applies any middleware action like resetting the state,
i.e, actions that will apply to the whole state.

const rootReducer = (state, action) => {
  if (action.type === globalReducerConstants.RESET_STATE) {
    state = {
      router: state.router
    };
  }
  return reducer(state, action);
};
*/
const rootReducer = reducer;

// eslint-disable-next-line dot-notation
const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewareRouter)));

export default store;
