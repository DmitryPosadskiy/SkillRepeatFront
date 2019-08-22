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
import SkillPage from "./SkillPage";
import SkillEditPage from "./SkillEditPage";
import HelloPage from './HelloPage';

class Center extends Component {

	render() {
		const {
			user,
			auth,
			activePage,
			registration,
			forgotPassword,
			changePassword,
			openHelloPage,
			openMainPage,
			openUserLoginPage,
			openUserCreatePage,
			openUserSettingsPage,
			openUserForgotPasswordPage,
			openUserChangePasswordPage,
			openSkillPage,
			openSkillEditPage,
		} = this.props;

		switch(activePage) {
			case Page.HELLO: return <HelloPage/>;
			case Page.MAIN: return <User/>;
			case Page.ADD: return <NewSkills/>;
			case Page.USER_CREATE: return <CreateUser registration={registration} back={openHelloPage}/>;
			case Page.USER_LOGIN: return <LoginForm auth={auth} back={openHelloPage} setUserForgotPasswordPage={openUserForgotPasswordPage}/>;
			case Page.USER_FORGOT_PASSWORD: return <ForgotPassword forgotPassword={forgotPassword} openUserLoginPage={openUserLoginPage} />;
			case Page.USER_CHANGE_PASSWORD: return <ChangePassword userId={user.id} changePassword={changePassword} openUserSettingsPage={openUserSettingsPage} />;
			case Page.USER_CHANGE_EMAIL: return <ChangeEmail openUserSettingsPage={openUserSettingsPage} />;
			case Page.USER_CHANGE_NOTIFICATION: return <ChangeNotification openUserSettingsPage={openUserSettingsPage} />;
			case Page.USER_SETTINGS: return <UserSetting openUserChangePasswordPage={openUserChangePasswordPage}/>;
			case Page.USER_ACCOUNT: return <AccountInfo openUserSettingsPage={openUserSettingsPage} />;
			case Page.SKILL: return <SkillPage cancel={openMainPage} openSkillEditPage={openSkillEditPage} />;
			case Page.SKILL_EDIT: return <SkillEditPage cancel={openSkillPage} />;
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
	openHelloPage: () => dispatch(Action.Page.openHelloPage()),
	openMainPage: () => dispatch(Action.Page.openMainPage()),
	openUserLoginPage: () => dispatch(Action.Page.openUserLoginPage()),
	openUserCreatePage: () => dispatch(Action.Page.openUserCreatePage()),
	openUserSettingsPage: () => dispatch(Action.Page.openUserSettingsPage()),
	openUserForgotPasswordPage: () => dispatch(Action.Page.openUserForgotPasswordPage()),
	openUserChangePasswordPage: () => dispatch(Action.Page.openUserChangePasswordPage()),
	openSkillPage: () => dispatch(Action.Page.openSkillPage()),
	openSkillEditPage: () => dispatch(Action.Page.openSkillEditPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Center);