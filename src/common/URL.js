const SERVER_URL = 'http://localhost:8080/';

const USER_MAIN = SERVER_URL + 'user/';

const USER = {
	USER_BY_ID: (id) =>  USER_MAIN + "id/" + id,
	USER_BY_NAME: (name) => `${USER_MAIN}name/${name}`,
	USER_ALL: USER_MAIN + 'all/',
	AUTH: USER_MAIN + 'auth/',
	REG: USER_MAIN + 'reg/',
	FORGOT_PASSWORD: USER_MAIN + 'forgotPass/',
	SAVE: USER_MAIN,
	DELETE: (userId) => `${USER_MAIN}delete/${userId}`,
	CHANGE_PASSWORD: (userId) => `${USER_MAIN}${userId}/changePassword`,
	CHANGE_EMAIL: (userId) => `${USER_MAIN}${userId}/changeEmail`,
	CHANGE_NOTIFICATION: (userId) => `${USER_MAIN}${userId}/changeNotification`,
	SAVE_SKILL: (userId) => `${USER_MAIN}${userId}/skill/add`,
	EDIT_SKILL: (userId) => `${USER_MAIN}${userId}/skill/edit`,
	DELETE_SKILL: (userId, skillId) => `${USER_MAIN}${userId}/skill/${skillId}`,
	UPDATE: USER_MAIN,
	REPEAT_SKILL: (userId, skillId) =>  USER_MAIN + `${userId}/skill/repeat/${skillId}`,
};

const URL = {
	USER,
};

export default URL;