const SERVER_URL = 'https://server.posadskiy.space/';

const USER_MAIN = SERVER_URL + 'user/';

const USER = {
	USER_ALL: USER_MAIN + 'all/',
	AUTH: USER_MAIN + 'auth/',
	REG: USER_MAIN + 'reg/',
	CONFIRM_EMAIL: (hash) => `${USER_MAIN}confirmEmail/${hash}`,
	FORGOT_PASSWORD: USER_MAIN + 'forgotPass/',
	SAVE: USER_MAIN,
	DELETE: (userId) => `${USER_MAIN}delete/${userId}`,
	CHECK_PASSWORDS_MATCH: (userId) => `${USER_MAIN}${userId}/checkPasswordMatch`,
	CHANGE_PASSWORD: (hash) => `${USER_MAIN}/changePassword/${hash}`,
	CHANGE_EMAIL: (userId) => `${USER_MAIN}${userId}/changeEmail`,
	CHANGE_NOTIFICATION: (userId) => `${USER_MAIN}${userId}/changeNotification`,
	SAVE_SKILL: (userId) => `${USER_MAIN}${userId}/skill/add`,
	EDIT_SKILL: (userId) => `${USER_MAIN}${userId}/skill/edit`,
	DELETE_SKILL: (userId, skillId) => `${USER_MAIN}${userId}/skill/${skillId}`,
	UPDATE: USER_MAIN,
	REPEAT_SKILL: (userId, skillId) =>  USER_MAIN + `${userId}/skill/repeat/${skillId}`,
	SEND_MESSAGE: (userId) =>  USER_MAIN + `${userId}/sendMessage`,
};

const PAGE = {
	START: '/',
	HOME: '/home',
	AUTH: '/auth',
	REG: '/reg',
	CONFIRM_EMAIL: (hash) => hash ? `/confirm-email/${hash}` : '/confirm-email/:hash',
	LOGOUT: '/logout',
	FORGOT_PASSWORD: '/forgot-password',
	SKILL: '/skill',
	SKILL_ADD: '/skill/add',
	SKILL_PAGE: (id) => id ? `/skill/${id}` : '/skill/:id',
	SKILL_EDIT: (id) => id ? `/skill/${id}/edit` : '/skill/:id/edit',
	USER: '/user',
	USER_EDIT: '/user/edit',
	USER_NOTIFICATION: '/user/notification',
	USER_EMAIL: '/user/email',
	USER_PASSWORD: '/user/password',
	USER_PASSWORD_SAVE: (hash) => hash ? `/user/password-save/${hash}` : '/user/password-save/:hash',
	CONTACT: '/contact',
};

const Url = {
	USER,
	PAGE,
};

export default Url;