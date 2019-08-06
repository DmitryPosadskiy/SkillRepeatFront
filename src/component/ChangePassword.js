import React, {Component} from 'react';
import {Button, Form, Grid, Header} from "semantic-ui-react";
import {ChangePasswordValidator} from "../common/Validator";

class ChangePassword extends Component {

	state = {
		oldPassword: '',
		newPassword: '',
		repeatNewPassword: '',
		isValidationError: false,
		isOldPasswordValidationError: true,
		isNewPasswordValidationError: true,
		isRepeatNewPasswordValidationError: true,
	};

	onChangeOldPassword = (event) => {
		const {isOldPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!ChangePasswordValidator.authPasswordValidate(password)) {
			!isOldPasswordValidationError && this.setState({isOldPasswordValidationError: true})
		} else {
			isOldPasswordValidationError && this.setState({isOldPasswordValidationError: false})
		}

		this.setState({oldPassword: password});
	};

	onChangeNewPassword = (event) => {
		const {isNewPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!ChangePasswordValidator.authPasswordValidate(password)) {
			!isNewPasswordValidationError && this.setState({isNewPasswordValidationError: true})
		} else {
			isNewPasswordValidationError && this.setState({isNewPasswordValidationError: false})
		}

		this.setState({newPassword: password});
	};

	onChangeRepeatNewPassword = (event) => {
		const {isRepeatNewPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!ChangePasswordValidator.authPasswordValidate(password)) {
			!isRepeatNewPasswordValidationError && this.setState({isRepeatNewPasswordValidationError: true})
		} else {
			isRepeatNewPasswordValidationError && this.setState({isRepeatNewPasswordValidationError: false})
		}

		this.setState({repeatNewPassword: password});
	};

	cancel = () => {
		this.props.openUserSettingsPage();
	};

	onClickChangePassword = () => {
		const {
			oldPassword,
			newPassword,
			repeatNewPassword,
			isValidationError,
		} = this.state;

		const {
			userId,
			changePassword,
		} = this.props;

		if (!ChangePasswordValidator.changePasswordValidate({oldPassword, newPassword, repeatNewPassword})) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		changePassword(userId, oldPassword, newPassword);
	};

	render() {
		const {
			oldPassword,
			newPassword,
			repeatNewPassword,
			isValidationError,
			isOldPasswordValidationError,
			isNewPasswordValidationError,
			isRepeatNewPasswordValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Change password
							</Header>
							<Form.Input
								value={oldPassword}
								onChange={this.onChangeOldPassword}
								fluid
								error={isValidationError && isOldPasswordValidationError ? 'Please, fill this field' : undefined}
								placeholder='Old password'
								type='password'
							/>
							<Form.Input
								value={newPassword}
								onChange={this.onChangeNewPassword}
								fluid
								error={isValidationError && isNewPasswordValidationError ? 'Please, fill this field' : undefined}
								placeholder='New password'
								type='password'
							/>
							<Form.Input
								value={repeatNewPassword}
								onChange={this.onChangeRepeatNewPassword}
								fluid
								error={isValidationError && isRepeatNewPasswordValidationError ? 'Please, fill this field' : undefined}
								placeholder='Repeat new password'
								type='password'
							/>
							<Button.Group fluid>
								<Button onClick={this.cancel}>Cancel</Button>
								<Button.Or />
								<Button onClick={this.onClickChangePassword} positive>Save</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default ChangePassword;