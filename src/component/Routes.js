import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import {Url} from '../common';
import {
	HelloPage,
	Home,
	NewSkills,
	SkillPage,
	SkillEdit,
	UserPage,
	UserEdit,
	UserChangeEmail,
	UserChangeNotification,
	UserChangePassword,
	UserSaveNewPassword,
	ContactUs,
	Login,
	Registration,
	ConfirmEmail,
	ForgotPassword,
	MessengerPage,
	Telegram,
	Page404,
	PrivateRoute,
} from "../component";

class Routes extends Component {
	render() {
		const {
			START,
			HOME,
			AUTH,
			REG,
			CONFIRM_EMAIL,
			MESSENGER_PAGE,
			TELEGRAM,
			LOGOUT,
			FORGOT_PASSWORD,
			USER,
			USER_EDIT,
			USER_NOTIFICATION,
			USER_EMAIL,
			USER_PASSWORD,
			USER_PASSWORD_SAVE,
			CONTACT,
			SKILL_PAGE,
			SKILL_EDIT,
			SKILL_ADD,
		} = Url.PAGE;

		return (
			<Switch>
				<Route path={START} exact component={HelloPage}/>
				<PrivateRoute path={HOME} exact component={Home}/>
				<PrivateRoute exact path={SKILL_ADD} component={NewSkills}/>
				<PrivateRoute path={USER} exact component={UserPage}/>
				<PrivateRoute exact path={USER_EDIT} component={UserEdit}/>
				<PrivateRoute exact path={USER_NOTIFICATION} component={UserChangeNotification}/>
				<PrivateRoute exact path={USER_EMAIL} component={UserChangeEmail}/>
				<PrivateRoute exact path={USER_PASSWORD} component={UserChangePassword}/>
				<Route exact path={USER_PASSWORD_SAVE()} component={UserSaveNewPassword}/>
				<PrivateRoute exact path={LOGOUT} component={HelloPage}/>
				<PrivateRoute exact path={CONTACT} component={ContactUs}/>
				<Route exact path={AUTH} component={Login}/>
				<Route exact path={REG} component={Registration}/>
				<Route exact path={CONFIRM_EMAIL()} component={ConfirmEmail}/>
				<Route exact path={FORGOT_PASSWORD} component={ForgotPassword}/>
				<Route exact path={MESSENGER_PAGE} component={MessengerPage}/>
				<Route exact path={TELEGRAM()} component={Telegram}/>
				<PrivateRoute exact path={SKILL_PAGE()} component={SkillPage}/>
				<PrivateRoute path={SKILL_EDIT()} component={SkillEdit}/>
				<Route component={Page404}/>
			</Switch>
		)
	}
}

export default Routes;