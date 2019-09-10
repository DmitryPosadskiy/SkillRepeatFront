import React, {Component} from 'react';
import {Validator} from "../../common";
import {Button, Form, Grid, Header} from "semantic-ui-react";
import Action from "../../action";
import {connect} from "react-redux";

class UserSaveNewPassword extends Component {
	state = {
		newPassword: '',
		repeatNewPassword: '',
		isValidationError: false,
		isNewPasswordValidationError: true,
		isRepeatNewPasswordValidationError: true,
	};

	onChangeNewPassword = (event) => {
		const {isNewPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!Validator.ChangePasswordValidator.authPasswordValidate(password)) {
			!isNewPasswordValidationError && this.setState({isNewPasswordValidationError: true})
		} else {
			isNewPasswordValidationError && this.setState({isNewPasswordValidationError: false})
		}

		this.setState({newPassword: password});
	};

	onChangeRepeatNewPassword = (event) => {
		const {isRepeatNewPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!Validator.ChangePasswordValidator.authPasswordValidate(password)) {
			!isRepeatNewPasswordValidationError && this.setState({isRepeatNewPasswordValidationError: true})
		} else {
			isRepeatNewPasswordValidationError && this.setState({isRepeatNewPasswordValidationError: false})
		}

		this.setState({repeatNewPassword: password});
	};

	onClickChangePassword = () => {
		const {
			newPassword,
			repeatNewPassword,
			isValidationError,
		} = this.state;

		const {
			savePassword,
			match: {
				params: {
					hash,
				} = {}
			} = {},
		} = this.props;

		if (!Validator.SavePasswordValidator.savePasswordValidate({password: newPassword, repeat: repeatNewPassword})) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		savePassword(hash, newPassword);
	};

	render() {
		const {
			newPassword,
			repeatNewPassword,
			isValidationError,
			isNewPasswordValidationError,
			isRepeatNewPasswordValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Input my new password
							</Header>
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
								<Button onClick={this.onClickChangePassword} positive>Save</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
	savePassword: (hash, password) => Action.User.savePassword(hash, password)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSaveNewPassword);