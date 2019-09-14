import axios from 'axios';
import hmacSha256 from 'crypto-js/hmac-sha256';
import {Url, History, Setting, Utils} from '../common';
import ActionType from '../common/ActionType';

const saveSkills = (userId, skills) => dispatch => {
	dispatch(startLoading());
	axios.post(Url.USER.SAVE_SKILL(userId), skills, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER,
				user: result.data,
			});
			History.push(Url.PAGE.HOME);
		})
		.catch(error => {
			dispatch({
				type: ActionType.User.UPDATE_USER,
				error: Utils.toError(error),
			});
		});
};

const editSkill = (userId, skill) => dispatch => {
	dispatch(startLoading());
	axios.post(Url.USER.EDIT_SKILL(userId), skill, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.EDIT_SKILL,
				user: result.data,
			});
			History.push(Url.PAGE.SKILL_PAGE(skill.id));
		})
		.catch(error => {
			dispatch({
				type: ActionType.User.EDIT_SKILL,
				error: Utils.toError(error),
			});
		});
};

const deleteSkill = (userId, skillId) => dispatch => {
	dispatch(startLoading());
	axios.delete(Url.USER.DELETE_SKILL(userId, skillId), Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.DELETE_SKILL,
				user: result.data,
			});
			History.push(Url.PAGE.HOME);
		})
		.catch(error => dispatch({
			type: ActionType.User.EDIT_SKILL,
			error: Utils.toError(error),
		}));
};

const repeatSkill = (userId, skillId) => (dispatch) => {
	dispatch(startLoading());
	axios.get(Url.USER.REPEAT_SKILL(userId, skillId), Setting.RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.REPEAT_SKILL,
			user: result.data,
		}))
		.catch(error => {
			dispatch({
				type: ActionType.User.REPEAT_SKILL,
				error: Utils.toError(error),
			});
		});
};

const updateUser = (user) => dispatch => {
	dispatch(startLoading());
	axios.post(Url.USER.UPDATE, user, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER,
				user: result.data,
			});
			History.push(Url.PAGE.USER);
		})
		.catch(error => dispatch({
			type: ActionType.User.UPDATE_USER,
			error: Utils.toError(error),
		}));
};

const deleteUser = (userId) => dispatch => {
	dispatch(startLoading());
	axios.delete(Url.USER.DELETE(userId), Setting.RequestConfig)
		.then(() => {
			dispatch({
				type: ActionType.User.DELETE_USER,
			});
			History.push(Url.PAGE.AUTH);
		})
		.catch(error => dispatch({
			type: ActionType.User.DELETE_SKILL,
			error: Utils.toError(error),
		}));
};

const checkMatchPassword = (userId, password) => dispatch => {
	const user = {
		id: userId,
		password: hmacSha256(password, "$!@#$%$#@").toString(),
	};

	dispatch(startLoading());
	axios.post(Url.USER.CHECK_PASSWORDS_MATCH(userId), user, Setting.RequestConfig)
		.then((result) => {
			dispatch({
				type: ActionType.User.CHECK_MATCH_PASSWORD,
			});
			History.push(Url.PAGE.USER_PASSWORD_SAVE(result.data.hash));
		})
		.catch(error => dispatch({
			type: ActionType.User.CHECK_MATCH_PASSWORD,
			error: Utils.toError(error),
		}));
};

const savePassword = (hash, password) => dispatch => {
	const user = {
		password: hmacSha256(password, "$!@#$%$#@").toString(),
	};

	dispatch(startLoading());
	axios.post(Url.USER.CHANGE_PASSWORD(hash), user, Setting.RequestConfig)
		.then((result) => {
			dispatch({
				type: ActionType.User.SAVE_PASSWORD,
				user: result.data,
			});
			History.push(Url.PAGE.USER);
		})
		.catch(error => dispatch({
			type: ActionType.User.SAVE_PASSWORD,
			error: Utils.toError(error),
		}));
};

const goToTelegram = (userId) => dispatch => {
	dispatch(startLoading());
	axios.get(Url.USER.GET_TELEGRAM_LINK(userId), Setting.RequestConfig)
		.then((result) => {
			dispatch({
				type: ActionType.User.GET_TELEGRAM_LINK,
			});
			History.push(Url.PAGE.TELEGRAM(result.data.hash));
		})
		.catch(error => dispatch({
			type: ActionType.User.GET_TELEGRAM_LINK,
			error: Utils.toError(error),
		}));
};

const changeUserEmail = (auth) => dispatch => {
	const authForSave = {
		...auth,
		email: auth.email.toLowerCase(),
	};

	dispatch(startLoading());
	axios.post(Url.USER.CHANGE_EMAIL(authForSave.id), authForSave, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.CHANGE_EMAIL,
				user: result.data,
			});
			History.push(Url.PAGE.USER);
		})
		.catch(error => dispatch({
			type: ActionType.User.CHANGE_EMAIL,
			error: Utils.toError(error),
		}));
};

const changeUserNotification = (auth) => dispatch => {
	dispatch(startLoading());
	axios.post(Url.USER.CHANGE_NOTIFICATION(auth.id), auth, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.CHANGE_NOTIFICATION,
				user: result.data,
			});
			History.push(Url.PAGE.USER);
		})
		.catch(error => dispatch({
			type: ActionType.User.CHANGE_NOTIFICATION,
			error: Utils.toError(error),
		}));
};

const auth = (email, password) => dispatch => {
	const user = {
		email: email.toLowerCase(),
		password: hmacSha256(password, "$!@#$%$#@").toString(),
	};
	dispatch(startLoading());
	axios.post(Url.USER.AUTH, user, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.AUTH,
				user: result.data,
			});
			History.push(Url.PAGE.HOME);
		})
		.catch(error => dispatch({
			type: ActionType.User.AUTH,
			error: Utils.toError(error),
		}));
};

const registration = (user) => dispatch => {
	const userForSave = {
		...user,
		email: user.email.toLowerCase(),
		password: hmacSha256(user.password, "$!@#$%$#@").toString(),
	};

	dispatch(startLoading());
	axios.post(Url.USER.REG, userForSave, Setting.RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.REG,
				user: result.data,
			});
			History.push(Url.PAGE.HOME);
		})
		.catch(error => dispatch({
			type: ActionType.User.REG,
			error: Utils.toError(error),
		}));
};

const forgotPassword = (email) => dispatch => {
	const auth = {
		email: email.toLowerCase(),
	};

	dispatch(startLoading());
	axios.post(Url.USER.FORGOT_PASSWORD, auth, Setting.RequestConfig)
		.then(() => dispatch({
			type: ActionType.User.FORGOT_PASSWORD,
		}))
		.catch(error => dispatch({
			type: ActionType.User.FORGOT_PASSWORD,
			error: Utils.toError(error),
		}));
};

const sendMessage = (userId, message) => dispatch => {
	const messageForSend = {
		message,
	};

	dispatch(startLoading());
	axios.post(Url.USER.SEND_MESSAGE(userId), messageForSend, Setting.RequestConfig)
		.then(() => {
			dispatch({
				type: ActionType.User.SEND_MESSAGE,
			});
			History.push(Url.PAGE.USER);
		})
		.catch(error => dispatch({
			type: ActionType.User.SEND_MESSAGE,
			error: Utils.toError(error),
		}));
};

const confirmEmail = (hash) => dispatch => {
	dispatch(startLoading());
	axios.get(Url.USER.CONFIRM_EMAIL(hash), Setting.RequestConfig)
		.then((result) => {
			dispatch({
				type: ActionType.User.CONFIRM_EMAIL,
				user: result.data,
			});
			History.push(Url.PAGE.HOME);
		})
		.catch(error => dispatch({
			type: ActionType.User.CONFIRM_EMAIL,
			error: Utils.toError(error),
		}));
};

const logOut = () => (dispatch) => {
	dispatch(clearUser());
	History.push(Url.PAGE.AUTH);
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
	updateUser,
	changeUserEmail,
	changeUserNotification,
	deleteUser,
	checkMatchPassword,
	savePassword,
	repeatSkill,
	auth,
	registration,
	forgotPassword,
	logOut,
	startLoading,
	choseSkillId,
	sendMessage,
	confirmEmail,
	goToTelegram,
	readError,
};

export default User;