import React, {Component} from 'react';
import { Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Action from '../action';

class UserSetting extends Component {
	render() {
		const {
			logOut,
			openUserAccountPage,
			openUserChangePasswordPage,
			openUserChangeEmailPage,
			openUserChangeNotificationPage,
		} = this.props;

		return (
			<div>
				<Label color='teal'>
					Account Setting
				</Label>
				<Button.Group basic vertical fluid>
					<Button onClick={openUserAccountPage}>Account Info</Button>
					<Button onClick={openUserChangeNotificationPage}>Notifications</Button>
					<Button onClick={openUserChangeEmailPage}>Change email</Button>
					<Button onClick={openUserChangePasswordPage}>Change password</Button>
					<Button onClick={logOut}>Log out</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => Action.User.logOut()(dispatch),
	openUserAccountPage: () => dispatch(Action.Page.openUserAccountPage()),
	openUserChangeNotificationPage: () => dispatch(Action.Page.openUserChangeNotificationPage()),
	openUserChangePasswordPage: () => dispatch(Action.Page.openUserChangePasswordPage()),
	openUserChangeEmailPage: () => dispatch(Action.Page.openUserChangeEmailPage()),
});

export default connect(null, mapDispatchToProps)(UserSetting);