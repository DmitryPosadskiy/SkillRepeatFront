import ActionType from '../common/ActionType';

const defaultUser = {
	skills: [],
};

const defaultState = {
	isAuth: false,
	user: defaultUser,
	choseSkillId: undefined,
};

const user = (state = defaultState, action) => {
	const {
		type,
		error,
	} = action;

	if (error) return {
		...state,
		error,
		isLoading: false,
	};

	switch (type) {
		case ActionType.User.SAVE_USER: return {
			...state,
			user: action.user,
			isAuth: true,
			isLoading: false,
		};
		case ActionType.User.UPDATE_USER: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.CHANGE_PASSWORD: return {
			...state,
			isLoading: false,
		};
		case ActionType.User.CHANGE_EMAIL: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.CHANGE_NOTIFICATION: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.DELETE_USER: return {
			...state,
			user: undefined,
			isAuth: false,
			isLoading: false,
		};
		case ActionType.User.EDIT_SKILL: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.SAVE_SKILL: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.DELETE_SKILL: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.REPEAT_SKILL: return {
			...state,
			user: action.user,
			isLoading: false,
		};
		case ActionType.User.USER_BY_NAME: return {
			...state,
			user: action.user,
			isAuth: true,
			isLoading: false,
		};
		case ActionType.User.REG: return {
			...state,
			user: action.user,
			isAuth: true,
			isLoading: false,
		};
		case ActionType.User.CHOSE_SKILL_ID: return {
			...state,
			choseSkillId: action.skillId,
		};
		case ActionType.User.CLEAR: return {
			...state,
			user: defaultUser,
			isAuth: false,
		};
		case ActionType.User.START_LOADING: return {
			...state,
			isLoading: true,
		};
		case ActionType.User.FORGOT_PASSWORD: return {
			...state,
			isLoading: false,
		};
		case ActionType.User.SEND_MESSAGE: return {
			...state,
			isLoading: false,
		};
		case ActionType.Common.RESET_STATE: return {
			...action.state.user,
		};
		case ActionType.User.CLEAR_ERROR: return {
			...state,
			error: undefined,
		};
		default: return state;
	}
};

export default user;