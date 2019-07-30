import React, {Component} from 'react';
import { Button, Divider, Label } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Action from '../action';

class UserSetting extends Component {
	render() {
		const {
			logOut,
			deleteAccount,
			goToUserChangePasswordPage,
		} = this.props;

		return (
			<div>
				<Label color='teal'>
					Repeat Setting
				</Label>
				<Button.Group basic vertical fluid>
					<Button>Change password</Button>
					<Button onClick={logOut}>Log out</Button>
				</Button.Group>
				<Divider />
				<Label color='teal'>
					Account Setting
				</Label>
				<Button.Group basic vertical fluid>
					<Button>Account Info</Button>
					<Button>Change photo</Button>
					<Button onClick={goToUserChangePasswordPage}>Change password</Button>
					<Button onClick={logOut}>Log out</Button>
				</Button.Group>
				<Divider />
				<Button.Group vertical fluid>
					<Button onClick={deleteAccount} negative>Delete account</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => Action.User.logOut()(dispatch)
});

export default connect(null, mapDispatchToProps)(UserSetting);