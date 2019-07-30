import ActionType from '../common/ActionType';
import Page from '../common/Page';

const defaultState = {
    activePage: Page.MAIN,
};

const page = (state = defaultState, action) => {
    switch (action.type) {
        case ActionType.Page.CHANGE_ACTIVE_PAGE: return {
            ...state,
            activePage: action.page,
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
        case ActionType.Page.USER_SETTINGS_PAGE: return {
            activePage: Page.USER_SETTINGS,
        };
        case ActionType.Common.RESET_STATE: return {
            ...action.state.page,
        };
        default: return state;
    }
};

export default page;