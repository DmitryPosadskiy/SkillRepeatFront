import URL from '../common/URL';
import ActionType from '../common/ActionType';
import axios from 'axios';
import hmacSha256 from 'crypto-js/hmac-sha256';
import Action from '../action';
import {RequestConfig} from '../common/settings';

const saveSkills = (userId, skills) => dispatch => {
	dispatch(startLoading());
	axios.post(URL.USER.SAVE_SKILL(userId), skills, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER,
				user: result.data,
			});
		})
		.catch(error => {
			dispatch({
				type: ActionType.User.UPDATE_USER,
				error,
			});
		});
};

const editSkill = (userId, skill) => dispatch => {
	dispatch(startLoading());
	axios.post(URL.USER.EDIT_SKILL(userId), skill, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.EDIT_SKILL,
				user: result.data,
			});
		})
		.catch(error => {
			dispatch({
				type: ActionType.User.EDIT_SKILL,
				error,
			});
		});
};

const deleteSkill = (userId, skillId) => dispatch => {
	dispatch(startLoading());
	axios.delete(URL.USER.DELETE_SKILL(userId, skillId), RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.DELETE_SKILL,
			user: result.data,
		}))
		.catch(error => dispatch({
			type: ActionType.User.EDIT_SKILL,
			error,
		}));
};

const repeatSkill = (userId, skillId) => (dispatch) => {
	dispatch(startLoading());
	axios.get(URL.USER.REPEAT_SKILL(userId, skillId), RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.REPEAT_SKILL,
			user: result.data,
		}))
		.catch(error => {
			dispatch({
				type: ActionType.User.REPEAT_SKILL,
				error,
			});
		});
};

const save = (user) => dispatch => {
	dispatch(startLoading());
	axios.put(URL.USER.SAVE, user, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.SAVE_USER,
			user: result.data,
		}))
		.catch(error => dispatch({
			type: ActionType.User.SAVE_USER,
			error,
		}));
};

const updateUser = (user) => dispatch => {
	dispatch(startLoading());
	axios.post(URL.USER.UPDATE, user, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER,
				user: result.data,
			});
			dispatch(Action.Page.openMainPage());
		})
		.catch(error => dispatch({
			type: ActionType.User.UPDATE_USER,
			error,
		}));
};

const deleteUser = (userId) => dispatch => {
	dispatch(startLoading());
	axios.delete(URL.USER.DELETE(userId), RequestConfig)
		.then(() => {
			dispatch({
				type: ActionType.User.DELETE_USER,
			});
			dispatch(Action.Page.openMainPage())
		})
		.catch(error => dispatch({
			type: ActionType.User.DELETE_SKILL,
			error,
		}));
};

const changePassword = (userId, oldPassword, newPassword) => dispatch => {
	const auth = {
		oldPassword: hmacSha256(oldPassword, "$!@#$%$#@").toString(),
		password: hmacSha256(newPassword, "$!@#$%$#@").toString(),
	};

	dispatch(startLoading());
	axios.post(URL.USER.CHANGE_PASSWORD(userId), auth, RequestConfig)
		.then(() => {
			dispatch({
				type: ActionType.User.CHANGE_PASSWORD,
			});
			dispatch(Action.Page.openMainPage());
		})
		.catch(error => dispatch({
			type: ActionType.User.CHANGE_PASSWORD,
			error,
		}));
};

const changeUserEmail = (auth) => dispatch => {
	dispatch(startLoading());
	axios.post(URL.USER.CHANGE_EMAIL(auth.id), auth, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.CHANGE_EMAIL,
				user: result.data,
			});
			dispatch(Action.Page.openMainPage());
		})
		.catch(error => dispatch({
			type: ActionType.User.CHANGE_EMAIL,
			error,
		}));
};

const changeUserNotification = (auth) => dispatch => {
	dispatch(startLoading());
	axios.post(URL.USER.CHANGE_NOTIFICATION(auth.id), auth, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.CHANGE_NOTIFICATION,
				user: result.data,
			});
			dispatch(Action.Page.openMainPage());
		})
		.catch(error => dispatch({
			type: ActionType.User.CHANGE_NOTIFICATION,
			error,
		}));
};

const auth = (email, password) => dispatch => {
	const user = {
		email,
		password: hmacSha256(password, "$!@#$%$#@").toString(),
	};
	dispatch(startLoading());
	axios.post(URL.USER.AUTH, user, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.USER_BY_NAME,
				user: result.data,
			});
			dispatch(Action.Page.openMainPage());
		})
		.catch(error => dispatch({
			type: ActionType.User.USER_BY_NAME,
			error,
		}));
};

const registration = (user) => dispatch => {
	const userForSave = {
		...user,
		password: hmacSha256(user.password, "$!@#$%$#@").toString(),
	};

	dispatch(startLoading());
	axios.post(URL.USER.REG, userForSave, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.REG,
				user: result.data,
			});
			dispatch(Action.Page.openMainPage());
		})
		.catch(error => dispatch({
			type: ActionType.User.REG,
			error,
		}));
};

const registrationWithSkills = (user) => dispatch => {
	const userForSave = {
		...user,
		password: hmacSha256(user.password, "$!@#$%$#@").toString(),
	};

	dispatch(startLoading());
	axios.post(URL.USER.REG_WITH_SKILLS, userForSave, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.REG,
			user: result.data,
		}))
		.catch(error => dispatch({
			type: ActionType.User.REG,
			error,
		}));
};

const forgotPassword = (email) => dispatch => {
	const auth = {
		email,
	};

	dispatch(startLoading());
	axios.post(URL.USER.FORGOT_PASSWORD, auth, RequestConfig)
		.then(() => dispatch({
			type: ActionType.User.FORGOT_PASSWORD,
		}))
		.catch(error => dispatch({
			type: ActionType.User.FORGOT_PASSWORD,
			error,
		}));
};

const logOut = () => (dispatch) => {
	dispatch(clearUser());
	dispatch(Action.Page.openHelloPage());
};

const clearUser = () => {
	return {
		type: ActionType.User.CLEAR,
	}
};

const startLoading = () => {
	return {
		type: ActionType.User.START_LOADING,
	}
};

const choseSkillId = (skillId) => {
	return {
		type: ActionType.User.CHOSE_SKILL_ID,
		skillId: skillId,
	}
};

const readError = () => {
	return {
		type: ActionType.User.CLEAR_ERROR,
	}
};

const User = {
	saveSkills,
	editSkill,
	deleteSkill,
	save,
	updateUser,
	changeUserEmail,
	changeUserNotification,
	deleteUser,
	changePassword,
	repeatSkill,
	auth,
	registration,
	registrationWithSkills,
	forgotPassword,
	logOut,
	startLoading,
	choseSkillId,
	readError,
};

export default User;