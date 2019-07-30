import ActionType from '../common/ActionType';

const changeActivePage = (page) => ({
    type: ActionType.Page.CHANGE_ACTIVE_PAGE,
    page,
});

const setMainPage = () => ({
    type: ActionType.Page.MAIN_PAGE,
});

const setAddPage = () => ({
    type: ActionType.Page.ADD_PAGE,
});

const goToUserCreatePage = () => ({
    type: ActionType.Page.USER_CREATE_PAGE,
});

const goToUserForgotPasswordPage = () => ({
    type: ActionType.Page.USER_FORGOT_PASSWORD_PAGE,
});

const goToUserLoginPage = () => ({
    type: ActionType.Page.USER_LOGIN_PAGE,
});

const goToUserSettingsPage = () => ({
    type: ActionType.Page.USER_SETTINGS_PAGE,
});

const Page = {
    changeActivePage,
    setMainPage,
    setAddPage,
    goToUserCreatePage,
    goToUserForgotPasswordPage,
    goToUserLoginPage,
    goToUserSettingsPage,
};

export default Page;