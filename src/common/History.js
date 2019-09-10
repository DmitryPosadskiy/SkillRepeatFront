import {createBrowserHistory} from 'history';
export const history = createBrowserHistory();

export const push = (url) => {
	history.push(url);
};

export const goBack = () => {
	history.goBack();
};