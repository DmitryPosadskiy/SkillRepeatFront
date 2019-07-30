import React, { Component } from 'react';

import Page from '../common/Page';
import User from "./User";
import EmptyPage from "./EmptyPage";
import {connect} from "react-redux";
import NewSkills from "./NewSkills";
import CreateUser from './CreateUser';
import ForgotPassword from './ForgotPassword';
import UserSetting from './UserSetting';
import LoginForm from './LoginForm';
import Action from "../action";

class Center extends Component {

	render() {
		const {
			user,
			auth,
			activePage,
			registration,
			forgotPassword,
			goToUserLoginPage,
			goToUserCreatePage,
			goToUserForgotPasswordPage,
			deleteAccount,
		} = this.props;

		const deleteAcc = () => deleteAccount(user.id);

		switch(activePage) {
			case Page.MAIN: return <User/>;
			case Page.ADD: return <NewSkills/>;
			case Page.USER_CREATE: return <CreateUser registration={registration} goToUserLoginPage={goToUserLoginPage}/>;
			case Page.USER_LOGIN: return <LoginForm auth={auth} setUserCreatePage={goToUserCreatePage} setUserForgotPasswordPage={goToUserForgotPasswordPage}/>;
			case Page.USER_FORGOT_PASSWORD: return <ForgotPassword forgotPassword={forgotPassword} goToUserLoginPage={goToUserLoginPage} />;
			case Page.USER_SETTINGS: return <UserSetting deleteAccount={deleteAcc}/>;
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
	goToUserLoginPage: () => dispatch(Action.Page.goToUserLoginPage()),
	goToUserCreatePage: () => dispatch(Action.Page.goToUserCreatePage()),
	goToUserForgotPasswordPage: () => dispatch(Action.Page.goToUserForgotPasswordPage()),
	deleteAccount: () => Action.User.deleteAccount()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Center);