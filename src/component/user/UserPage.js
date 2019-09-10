import React, {Component} from 'react';
import {Button, Label} from 'semantic-ui-react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

import Action from '../../action';
import {version} from '../../../package.json';
import {Url} from '../../common';

class UserPage extends Component {
	render() {
		const {
			logOut,
		} = this.props;

		const {
			USER_EDIT,
			USER_NOTIFICATION,
			USER_EMAIL,
			USER_PASSWORD,
			START,
			CONTACT,
		} = Url.PAGE;

		return (
			<div>
				<Label color='teal'>
					Account Setting
				</Label>
				<Button.Group basic vertical fluid>
					<Button as={Link} to={USER_EDIT}>Account Info</Button>
					<Button as={Link} to={USER_NOTIFICATION}>Notifications</Button>
					<Button as={Link} to={USER_EMAIL}>Change email</Button>
					<Button as={Link} to={USER_PASSWORD}>Change password</Button>
					<Button as={Link} to={START} onClick={logOut}>Log out</Button>
				</Button.Group>

				<Label style={{marginTop: '14px'}} color='teal'>
					Support
				</Label>
				<Button.Group basic vertical fluid>
					<Button as={Link} to={CONTACT}>Contact</Button>
				</Button.Group>
				<p style={{marginTop: '14px'}}>App version: {version}</p>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => Action.User.logOut()(dispatch),
});

export default connect(null, mapDispatchToProps)(UserPage);