import URL from '../common/URL';
import ActionType from '../common/ActionType';
import axios from 'axios';
import hmacSha256 from 'crypto-js/hmac-sha256';
import Action from '../action';
import { RequestConfig } from '../common/settings';

const getUsers = () => (dispatch, getState) => {
	axios.get(URL.USER.USER_ALL, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.USER_ALL_SUCCESS,
			users: result.data,
		}))
		.catch(e => dispatch({
			type: ActionType.User.USER_ALL_ERROR,
			error: e,
		}))
};

const getUserById = (id) => (dispatch) => {
	axios.get(URL.USER.USER_BY_ID(id), RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.USER_BY_ID_SUCCESS,
			user: result.data,
		}))
		.catch(result => console.log(result))
};

const saveSkills = (userId, skills) => dispatch => {
	axios.post(URL.USER.SAVE_SKILL(userId), skills, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER_SUCCESS,
				user: result.data,
			});
		})
};

const editSkill = (userId, skill) => dispatch => {
	axios.post(URL.USER.EDIT_SKILL(userId), skill, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER_SUCCESS,
				user: result.data,
			});
		})
};

const deleteSkill = (userId, skillId) => dispatch => {
	axios.delete(URL.USER.DELETE_SKILL(userId, skillId), RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.UPDATE_USER_SUCCESS,
				user: result.data,
			});
		})
};

const repeatSkill = (userId, skillId) => (dispatch) => {
	axios.get(URL.USER.REPEAT_SKILL(userId, skillId), RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.REPEAT_SKILL_SUCCESS,
			user: result.data,
		}))
};

const save = (user) => dispatch => {
	axios.put(URL.USER.SAVE, user, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.SAVE_USER_SUCCESS,
			user: result.data,
		}));
	dispatch(Action.Page.openMainPage());
};

const updateUserAccount = (user) => dispatch => {
	axios.post(URL.USER.UPDATE, user, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.UPDATE_USER_SUCCESS,
			user: result.data,
		}));
	dispatch(Action.Page.openMainPage());
};

const deleteAccount = (userId) => dispatch => {
	axios.delete(URL.USER.DELETE(userId), RequestConfig)
		.then(() => dispatch({
			type: ActionType.User.DELETE_USER_SUCCESS,
		}));
	dispatch(Action.Page.openMainPage());
};

const changePassword = (userId, oldPassword, newPassword) => dispatch => {
	const auth = {
		oldPassword: hmacSha256(oldPassword, "$!@#$%$#@").toString(),
		password: hmacSha256(newPassword, "$!@#$%$#@").toString(),
	};

	axios.post(URL.USER.CHANGE_PASSWORD(userId), auth, RequestConfig)
		.then(() => dispatch({
			type: ActionType.User.CHANGE_PASSWORD_SUCCESS,
		}));
	dispatch(Action.Page.openMainPage());
};

const changeUserEmail = (auth) => dispatch => {
	axios.post(URL.USER.CHANGE_EMAIL(auth.id), auth, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.CHANGE_EMAIL_SUCCESS,
			user: result.data,
		}));
	dispatch(Action.Page.openMainPage());
};

const changeUserNotification = (auth) => dispatch => {
	axios.post(URL.USER.CHANGE_NOTIFICATION(auth.id), auth, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.CHANGE_NOTIFICATION_SUCCESS,
			user: result.data,
		}));
	dispatch(Action.Page.openMainPage());
};

const auth = (email, password) => dispatch => {
	const user = {
		email,
		password: hmacSha256(password, "$!@#$%$#@").toString(),
	};

	axios.post(URL.USER.AUTH, user, RequestConfig)
		.then(result => {
			dispatch({
				type: ActionType.User.USER_BY_NAME_SUCCESS,
				user: result.data,
			})
		})
		.catch(exception => console.log(exception));

	dispatch(Action.Page.openMainPage());
};

const registration = (user) => dispatch => {
	const userForSave = {
		...user,
		password: hmacSha256(user.password, "$!@#$%$#@").toString(),
	};

	axios.post(URL.USER.REG, userForSave, RequestConfig)
		.then(result => dispatch({
			type: ActionType.User.REG_SUCCESS,
			user: result.data,
		}));

	dispatch(Action.Page.openMainPage());
};

const forgotPassword = (email) => dispatch => {
	const auth = {
		email,
	};

	axios.post(URL.USER.FORGOT_PASSWORD, auth, RequestConfig)
		.then(() => dispatch({
			type: ActionType.User.FORGOT_PASSWORD_SUCCESS,
		}));
};

const logOut = () => (dispatch) => {
	dispatch(clearUser());
	dispatch(Action.Page.openMainPage());
};

const clearUser = () => {
	return {
		type: ActionType.User.CLEAR,
	}
};

const choseSkillId = (skillId) => {
	return {
		type: ActionType.User.CHOSE_SKILL_ID,
		skillId: skillId,
	}
};

const User = {
	getUsers,
	getUserById,
	saveSkills,
	editSkill,
	deleteSkill,
	save,
	updateUserAccount,
	changeUserEmail,
	changeUserNotification,
	deleteAccount,
	changePassword,
	repeatSkill,
	auth,
	registration,
	forgotPassword,
	logOut,
	choseSkillId,
};

export default User;