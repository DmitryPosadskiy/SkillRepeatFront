const skillsValidate = (skills) => skills.every(skill => skillValidate(skill));

const skillValidate = (skill) => skillNameValidate(skill.name)
	&& skillRepeatInLastMonthValidate(skill.termRepeat)
	&& skillPeriodValidate(skill.period);

const skillNameValidate = (name) => name && name.trim().length > 0;
const skillRepeatInLastMonthValidate = (period) => period;
const skillPeriodValidate = (period) => period > 0;
const skillTimeValidate = (time) => time && time.trim().length > 0;

export const SkillValidator = {
	skillsValidate,
	skillValidate,
	skillNameValidate,
	skillRepeatInLastMonthValidate,
	skillPeriodValidate,
	skillTimeValidate,
};

const authValidate = (auth) => authEmailValidate(auth.email)
	&& authPasswordValidate(auth.password);

const authEmailValidate = (email) => email && email.includes('@');
const authPasswordValidate = (password) => password && password.length >= 8;

export const AuthValidator = {
	authValidate,
	authEmailValidate,
	authPasswordValidate,
};

const changePasswordValidate = (auth) => authPasswordValidate(auth.oldPassword)
	&& authPasswordValidate(auth.newPassword)
	&& authPasswordValidate(auth.repeatNewPassword)
	&& authPasswordValidate(auth.newPassword, auth.repeatNewPassword);

const authPasswordsAreEquals = (pass, anotherPass) => pass === anotherPass;

export const ChangePasswordValidator = {
	changePasswordValidate,
	authPasswordValidate,
	authPasswordsAreEquals
};

const createUserNameValidate = (name) => true;
const createUserAgreeEmailValidate = (isAgree) => true;
const createUserAgreeTermsValidate = (isAgree) => isAgree;

const createUserValidate = (user) => authEmailValidate(user.email)
	&& authPasswordValidate(user.password)
	&& createUserNameValidate(user.name)
	&& createUserAgreeEmailValidate(user.isAgreeEmails)
	&& createUserAgreeTermsValidate(user.isAgreeTerms);

export const CreateUserValidator = {
	createUserValidate,
	authEmailValidate,
	authPasswordValidate,
	createUserNameValidate,
	createUserAgreeEmailValidate,
	createUserAgreeTermsValidate,
};

export const ChangeEmailValidator = {
	authEmailValidate,
};

const periodValidate = (period) => period > 0;
const changeNotificationValidate = (user) => periodValidate(user.period);

export const ChangeNotificationValidator = {
	changeNotificationValidate,
	periodValidate,
};

const skillEditValidate = (skill) => skillNameValidate(skill.name);
	//&& skillPeriodValidate(skill.period)
	//&& skillTimeValidate(skill.time);

export const SkillEditValidator = {
	skillEditValidate,
	skillNameValidate,
	skillPeriodValidate,
	skillTimeValidate,
};

const helloPagePeriodValidate = (period) => !period || period > 0;
const helloPageTimeValidate = (time) => !time || time.trim().length > 0;
const helloPageValidate = (user) => authEmailValidate(user.email)
	&& authPasswordValidate(user.password);

export const HelloPageValidator = {
	helloPageValidate,
	helloPagePeriodValidate,
	helloPageTimeValidate,
	authEmailValidate,
	authPasswordValidate,
};