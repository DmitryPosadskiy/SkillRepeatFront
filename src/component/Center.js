import React, { Component } from 'react';
import {connect} from "react-redux";

import Page from '../common/Page';
import User from "./User";
import EmptyPage from "./EmptyPage";
import NewSkills from "./NewSkills";
import CreateUser from './CreateUser';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import ChangeNotification from './ChangeNotification';
import UserSetting from './UserSetting';
import LoginForm from './LoginForm';
import Action from "../action";
import AccountInfo from "./AccountInfo";

class Center extends Component {

	render() {
		const {
			user,
			auth,
			activePage,
			registration,
			forgotPassword,
			changePassword,
			openUserLoginPage,
			openUserCreatePage,
			openUserSettingsPage,
			openUserForgotPasswordPage,
			openUserChangePasswordPage,
		} = this.props;

		switch(activePage) {
			case Page.MAIN: return <User/>;
			case Page.ADD: return <NewSkills/>;
			case Page.USER_CREATE: return <CreateUser registration={registration} openUserLoginPage={openUserLoginPage}/>;
			case Page.USER_LOGIN: return <LoginForm auth={auth} setUserCreatePage={openUserCreatePage} setUserForgotPasswordPage={openUserForgotPasswordPage}/>;
			case Page.USER_FORGOT_PASSWORD: return <ForgotPassword forgotPassword={forgotPassword} openUserLoginPage={openUserLoginPage} />;
			case Page.USER_CHANGE_PASSWORD: return <ChangePassword userId={user.id} changePassword={changePassword} openUserSettingsPage={openUserSettingsPage} />;
			case Page.USER_CHANGE_EMAIL: return <ChangeEmail openUserSettingsPage={openUserSettingsPage} />;
			case Page.USER_CHANGE_NOTIFICATION: return <ChangeNotification openUserSettingsPage={openUserSettingsPage} />;
			case Page.USER_SETTINGS: return <UserSetting openUserChangePasswordPage={openUserChangePasswordPage}/>;
			case Page.USER_ACCOUNT: return <AccountInfo openUserSettingsPage={openUserSettingsPage} />;
			default: return <EmptyPage/>;
		}
	}
}

const mapStateToProps = (state) => ({
	activePage: state.page.activePage,
	user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
	auth: (login, password) => Action.User.auth(login, password)(dispatch),
	registration: (user) => Action.User.registration(user)(dispatch),
	forgotPassword: (email) => Action.User.forgotPassword(email)(dispatch),
	changePassword: (userId, oldPassword, newPassword) => Action.User.changePassword(userId, oldPassword, newPassword)(dispatch),
	openUserLoginPage: () => dispatch(Action.Page.openUserLoginPage()),
	openUserCreatePage: () => dispatch(Action.Page.openUserCreatePage()),
	openUserSettingsPage: () => dispatch(Action.Page.openUserSettingsPage()),
	openUserForgotPasswordPage: () => dispatch(Action.Page.openUserForgotPasswordPage()),
	openUserChangePasswordPage: () => dispatch(Action.Page.openUserChangePasswordPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Center);