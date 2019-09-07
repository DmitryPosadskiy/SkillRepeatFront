import React, {Component} from 'react';

import {Button, Form, Grid, Header, Modal, Icon} from 'semantic-ui-react'
import {CreateUserValidator, SkillValidator} from "../common/Validator";

class CreateUser extends Component {
	state = {
		email: '',
		password: '',
		name: '',
		period: '',
		time: '',
		isAgreeTerms: false,
		isAgreeGetEmails: false,

		isChangeNotificationSetting: false,

		isValidationError: false,
		isEmailValidationError: true,
		isPasswordValidationError: true,
		isNameValidationError: false,
		isAgreeGetEmailsValidationError: false,
		isAgreeTermsValidationError: true,
		isPeriodError: true,
		isTimeError: true,

		isModalOpen: false,
	};

	onChangeEmail = (event) => {
		const {isEmailValidationError} = this.state;
		const email = event.target.value;

		if (!CreateUserValidator.authEmailValidate(email)) {
			!isEmailValidationError && this.setState({isEmailValidationError: true})
		} else {
			isEmailValidationError && this.setState({isEmailValidationError: false})
		}

		this.setState({email});
	};

	onChangePassword = (event) => {
		const {isPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!CreateUserValidator.authPasswordValidate(password)) {
			!isPasswordValidationError && this.setState({isPasswordValidationError: true})
		} else {
			isPasswordValidationError && this.setState({isPasswordValidationError: false})
		}

		this.setState({password});
	};

	onChangeName = (event) => {
		const {isNameValidationError} = this.state;
		const name = event.target.value;

		if (!CreateUserValidator.createUserNameValidate(name)) {
			!isNameValidationError && this.setState({isNameValidationError: true})
		} else {
			isNameValidationError && this.setState({isNameValidationError: false})
		}

		this.setState({name});
	};

	onChangeNotificationSetting = (e, {checked}) => {
		this.setState({isChangeNotificationSetting: checked});
	};

	onChangeIsAgreeEmails = (e, value) => {
		const {isAgreeGetEmailsValidationError} = this.state;
		const isAgreeGetEmails = value.checked;

		if (!CreateUserValidator.createUserAgreeEmailValidate(isAgreeGetEmails)) {
			!isAgreeGetEmailsValidationError && this.setState({isAgreeGetEmailsValidationError: true})
		} else {
			isAgreeGetEmailsValidationError && this.setState({isAgreeGetEmailsValidationError: false})
		}

		this.setState({isAgreeGetEmails});
	};

	onChangeFormPeriod = (event) => {
		const { isPeriodError } = this.state;
		const period = event.target.value;

		if (SkillValidator.skillPeriodValidate(period)) {
			isPeriodError && this.setState({isPeriodError: false});
		} else {
			!isPeriodError && this.setState({isPeriodError: true});
		}

		this.setState({period});
	};

	onChangeFormTime = (e, {value}) => {
		const { isTimeError } = this.state;

		if (SkillValidator.skillTimeValidate(value)) {
			isTimeError && this.setState({isTimeError: false});
		} else {
			!isTimeError && this.setState({isTimeError: true});
		}

		this.setState({time: value});
	};

	onChangeIsAgreeTerms = (e, value) => {
		const {isAgreeTermsValidationError} = this.state;
		const isAgreeTerms = value.checked;

		if (!CreateUserValidator.createUserAgreeTermsValidate(isAgreeTerms)) {
			!isAgreeTermsValidationError && this.setState({isAgreeTermsValidationError: true})
		} else {
			isAgreeTermsValidationError && this.setState({isAgreeTermsValidationError: false})
		}

		this.setState({isAgreeTerms});
	};

	cancel = () => {
		this.props.back();
	};

	onRegistration = () => {
		const {
			registration,
		} = this.props;

		const {
			email,
			password,
			name,
			period,
			time,
			isAgreeGetEmails,
			isAgreeTerms,

			isValidationError,
		} = this.state;

		const user = {
			email,
			password,
			name,
			period,
			time,
			isAgreeGetEmails,
			isAgreeTerms,
		};

		if (!CreateUserValidator.createUserValidate(user)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		if (!isAgreeGetEmails) {
			this.setState({isModalOpen: true});
			return;
		}

		registration(user);
	};

	onModalClick = (isAgreeGetEmails) => {
		const {
			registration,
		} = this.props;

		const {
			email,
			password,
			name,
		} = this.state;

		const user = {
			email,
			password,
			name,
			isAgreeGetEmails,
		};

		this.setState({isModalOpen: false});

		registration(user);
	};

	render() {
		const {
			email,
			password,
			name,
			period,
			time,
			isAgreeTerms,
			isAgreeGetEmails,

			isChangeNotificationSetting,

			isValidationError,
			isNameValidationError,
			isEmailValidationError,
			isPasswordValidationError,
			isAgreeGetEmailsValidationError,
			isAgreeTermsValidationError,
			isPeriodError,
			isTimeError,

			isModalOpen,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Sign up
							</Header>
							<Form.Input
								value={email}
								onChange={this.onChangeEmail}
								error={isValidationError && isEmailValidationError ? 'You can use "@" in your e-mail' : undefined}
								icon='at'
								iconPosition='left'
								type='email'
								placeholder='Email'
							/>
							<Form.Input
								value={password}
								onChange={this.onChangePassword}
								error={isValidationError && isPasswordValidationError ? 'You can use non-empty password' : undefined}
								icon='spy'
								iconPosition='left'
								type='password'
								placeholder='Password'
							/>
							<Form.Input
								value={name}
								onChange={this.onChangeName}
								error={isValidationError && isNameValidationError ? 'Please, fill this field' : undefined}
								icon='user'
								iconPosition='left'
								placeholder='Name'
							/>
							<Form.Checkbox
								checked={isChangeNotificationSetting}
								onChange={this.onChangeNotificationSetting}
								toggle
								label='Change default notification'
							/>
							{
								isChangeNotificationSetting && (
									<Form.Group widths='equal'>
										<Form.Input
											value={period}
											onChange={this.onChangeFormPeriod}
											fluid
											error={isValidationError && isPeriodError ? 'Please, fill this field' : undefined}
											icon='bell'
											iconPosition='left'
											type='number'
											placeholder='Days between repeats'/>
										<Form.Input
											value={time}
											onChange={this.onChangeFormTime}
											fluid
											error={isValidationError && isTimeError ? 'Please, fill this field' : undefined}
											icon='time'
											iconPosition='left'
											type='time'
										/>
									</Form.Group>
								)
							}
							<Form.Checkbox
								checked={isAgreeGetEmails}
								onClick={this.onChangeIsAgreeEmails}
								error={isValidationError && isAgreeGetEmailsValidationError ? 'We cannot service you without it' : undefined}
								label='I agree to get emails'
							/>
							<Form.Checkbox
								checked={isAgreeTerms}
								onClick={this.onChangeIsAgreeTerms}
								error={isValidationError && isAgreeTermsValidationError ? 'We cannot service you without it' : undefined}
								required
								label='I agree to the Terms and Conditions'
							/>
							<Button.Group fluid>
								<Button onClick={this.cancel}>Cancel</Button>
								<Button.Or/>
								<Button onClick={this.onRegistration} positive>Sign up</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
				<Modal
					open={isModalOpen}
					onClose={() => this.onModalClick(false)}
					basic
					size='small'
				>
					<Header icon='mail' content='Email notifications'/>
					<Modal.Content>
						<p>Unfortunately, you did not give your consent to receive emails with reminders to repeat the skills. You
							can check the status of the skill only in the application. Perhaps we can send you email alerts?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='red' onClick={() => this.onModalClick(false)} inverted>
							I'll check in App
						</Button>
						<Button color='green' onClick={() => this.onModalClick(true)} inverted>
							<Icon name='checkmark'/> Yes, send me
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid>
		);
	}
}

export default CreateUser;