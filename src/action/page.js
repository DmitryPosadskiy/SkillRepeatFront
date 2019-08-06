import ActionType from '../common/ActionType';

const changeActivePage = (page) => ({
    type: ActionType.Page.CHANGE_ACTIVE_PAGE,
    page,
});

const openMainPage = () => ({
    type: ActionType.Page.MAIN_PAGE,
});

const openAddPage = () => ({
    type: ActionType.Page.ADD_PAGE,
});

const openUserCreatePage = () => ({
    type: ActionType.Page.USER_CREATE_PAGE,
});

const openUserForgotPasswordPage = () => ({
    type: ActionType.Page.USER_FORGOT_PASSWORD_PAGE,
});

const openUserChangePasswordPage = () => ({
    type: ActionType.Page.USER_CHANGE_PASSWORD_PAGE,
});

const openUserChangeEmailPage = () => ({
    type: ActionType.Page.USER_CHANGE_EMAIL_PAGE,
});

const openUserChangeNotificationPage = () => ({
    type: ActionType.Page.USER_CHANGE_NOTIFICATION_PAGE,
});

const openUserLoginPage = () => ({
    type: ActionType.Page.USER_LOGIN_PAGE,
});

const openUserSettingsPage = () => ({
    type: ActionType.Page.USER_SETTINGS_PAGE,
});

const openUserAccountPage = () => ({
    type: ActionType.Page.USER_ACCOUNT_PAGE,
});

const Page = {
    changeActivePage,
    openMainPage,
    openAddPage,
    openUserCreatePage,
    openUserForgotPasswordPage,
    openUserChangePasswordPage,
    openUserChangeEmailPage,
    openUserChangeNotificationPage,
    openUserLoginPage,
    openUserSettingsPage,
    openUserAccountPage,
};

export default Page;