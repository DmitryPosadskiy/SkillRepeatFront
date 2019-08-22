import React, { Component } from 'react';
import { Button, Form, Grid, Header } from 'semantic-ui-react';
import { AuthValidator } from '../common/Validator';

class LoginForm extends Component {
	state = {
		email: 'test@test.com',
		password: '12345678',
		isValidationError: false,
		isEmailValidationError: true,
		isPasswordValidationError: true,
	};

	onChangeEmail = (event) => {
		const {isEmailValidationError} = this.state;
		const email = event.target.value;

		if (!AuthValidator.authEmailValidate(email)) {
			!isEmailValidationError && this.setState({isEmailValidationError: true})
		} else {
			isEmailValidationError && this.setState({isEmailValidationError: false})
		}

		this.setState({email});
	};

	onChangePassword = (event) => {
		const {isPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!AuthValidator.authPasswordValidate(password)) {
			!isPasswordValidationError && this.setState({isPasswordValidationError: true})
		} else {
			isPasswordValidationError && this.setState({isPasswordValidationError: false})
		}

		this.setState({password});
	};

	onClickLogin = () => {
		const {
			email,
			password,
			isValidationError,
		} = this.state;

		if (!AuthValidator.authValidate({email, password})) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		this.props.auth(email, password);
	};

	cancel = () => {
		this.props.back();
	};

	render() {
		const {
			email,
			password,
			isValidationError,
			isEmailValidationError,
			isPasswordValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Sing in
							</Header>
							<Form.Input
								value={email}
								onChange={this.onChangeEmail}
								fluid
								error={isValidationError && isEmailValidationError ? 'Please, fill this field' : undefined}
								icon='mail'
								iconPosition='left'
								placeholder='E-mail address'
							/>
							<Form.Input
								value={password}
								onChange={this.onChangePassword}
								fluid
								error={isValidationError && isPasswordValidationError ? 'Please, fill this field' : undefined}
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
							/>
							<Button.Group fluid>
								<Button onClick={this.cancel}>Back</Button>
								<Button.Or/>
								<Button onClick={this.onClickLogin} positive>Login</Button>
							</Button.Group>
							<Button.Group widths='2'>
								<Button fluid basic onClick={this.props.openUserCreatePage}>Sign up</Button>
								<Button fluid basic onClick={this.props.openUserForgotPasswordPage}>Forgot password?</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default LoginForm;