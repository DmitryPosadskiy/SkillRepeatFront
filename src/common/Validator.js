const skillsValidate = (skills) => skills.every(skill => skillValidate(skill));

const skillValidate = (skill) => skillNameValidate(skill.name)
	&& skillRepeatInLastMonthValidate(skill.termRepeat)
	&& skillPeriodValidate(skill.period);

const skillNameValidate = (name) => name && name.trim().length > 0;
const skillRepeatInLastMonthValidate = (period) => period;
const skillPeriodValidate = (period) => period;
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