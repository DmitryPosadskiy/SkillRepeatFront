import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import {ActionType} from './common';
import {name} from '../package.json';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(load, dump)));

store.dispatch({type: ActionType.Common.INIT});

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

serviceWorker.unregister();

function load({getState}) {
	return next => action => {
		const {type} = action;

		if (type === ActionType.Common.INIT) {
			try {
				const state = JSON.parse(localStorage.getItem(name));
				if (!state) return;

				state.user.isLoading = false;
				state.user.error = undefined;

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

function dump({getState}) {
	return next => action => {
		const returnValue = next(action);
		localStorage.setItem(name, JSON.stringify(store.getState()));
		return returnValue;
	}
}