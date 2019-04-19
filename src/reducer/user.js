import ActionType from '../common/ActionType';

const defaultState = {
	isAuth: false,
	user: {
		skills: [],
	},
};

const user = (state = defaultState, action) => {
	switch (action.type) {
		case ActionType.User.USER_ALL_SUCCESS: return {
			...state,
			users: action.users,
		};
		case ActionType.User.USER_ALL_ERROR: return {
			...state,
			error: action.error,
		};
		case ActionType.User.USER_BY_ID_SUCCESS: return {
			...state,
			user: action.user,
		};
		case ActionType.User.SAVE_USER_SUCCESS: return {
			...state,
			user: action.user,
			isAuth: true,
		};
		case ActionType.User.UPDATE_USER_SUCCESS: return {
			...state,
			user: action.user,
		};
		case ActionType.User.REPEAT_SKILL_SUCCESS: return {
			...state,
			user: action.user,
		};
		case ActionType.User.USER_BY_NAME_SUCCESS: return {
			...state,
			user: action.user,
			isAuth: true,
		};
		case ActionType.User.REG_SUCCESS: return {
			...state,
			user: action.user,
			isAuth: true,
		};
		case ActionType.User.CLEAR: return {
			...state,
			user: undefined,
			isAuth: false,
		};
		default: return state;
	}
};

export default user;