const SERVER_URL = 'http://192.168.100.7:8080/';

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
	SAVE_SKILL: (userId) => `${USER_MAIN}${userId}/skill/add`,
	DELETE_SKILL: (userId, skillId) => `${USER_MAIN}${userId}/skill/${skillId}`,
	UPDATE: USER_MAIN,
	REPEAT_SKILL: (userId, skillId) =>  USER_MAIN + `${userId}/skill/repeat/${skillId}`,
};

const URL = {
	USER,
};

export default URL;