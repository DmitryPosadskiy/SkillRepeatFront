import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppSetting } from './common/settings';
import ActionType from './common/ActionType';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(load, dump)));

store.dispatch({ type: ActionType.Common.INIT });

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();

function load({ getState }) {
	return next => action => {
		const { type } = action;

		if (type === ActionType.Common.INIT) {
			try {
				const state = JSON.parse(localStorage.getItem(AppSetting.APP_NAME));
				if (!state) return;
				store.dispatch({
					type: ActionType.Common.RESET_STATE,
					state,
				});
			} catch (e) {
				console.log("Error loading store from localStorage", e);
			}
		}

		return next(action);
	}
}

function dump({ getState }) {
	return next => action => {
		const returnValue = next(action);
		localStorage.setItem(AppSetting.APP_NAME, JSON.stringify(store.getState()));
		return returnValue;
	}
}