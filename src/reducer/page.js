import ActionType from '../common/ActionType';
import Page from '../common/Page';

const defaultState = {
    activePage: Page.HELLO,
};

const page = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.Page.CHANGE_ACTIVE_PAGE: return {
            ...state,
            activePage: action.page,
        };
        case ActionType.Page.HELLO_PAGE: return {
            activePage: Page.HELLO,
        };
        case ActionType.Page.MAIN_PAGE: return {
            activePage: Page.MAIN,
        };
        case ActionType.Page.ADD_PAGE: return {
            activePage: Page.ADD,
        };
        case ActionType.Page.USER_PAGE: return {
            activePage: Page.USER,
        };
        case ActionType.Page.USER_LOGIN_PAGE: return {
            activePage: Page.USER_LOGIN,
        };
        case ActionType.Page.USER_CREATE_PAGE: return {
            activePage: Page.USER_CREATE,
        };
        case ActionType.Page.USER_FORGOT_PASSWORD_PAGE: return {
            activePage: Page.USER_FORGOT_PASSWORD,
        };
        case ActionType.Page.USER_CHANGE_PASSWORD_PAGE: return {
            activePage: Page.USER_CHANGE_PASSWORD,
        };
        case ActionType.Page.USER_CHANGE_EMAIL_PAGE: return {
            activePage: Page.USER_CHANGE_EMAIL,
        };
        case ActionType.Page.USER_CHANGE_NOTIFICATION_PAGE: return {
            activePage: Page.USER_CHANGE_NOTIFICATION,
        };
        case ActionType.Page.USER_SETTINGS_PAGE: return {
            activePage: Page.USER_SETTINGS,
        };
        case ActionType.Page.USER_ACCOUNT_PAGE: return {
            activePage: Page.USER_ACCOUNT,
        };
        case ActionType.Page.SKILL_PAGE: return {
            activePage: Page.SKILL,
        };
        case ActionType.Page.SKILL_EDIT_PAGE: return {
            activePage: Page.SKILL_EDIT,
        };
        case ActionType.Page.CONTACT_US_PAGE: return {
            activePage: Page.CONTACT_US,
        };
        case ActionType.Common.RESET_STATE: return {
            ...action.state.page,
        };
        default: return state;
    }
};

export default page;