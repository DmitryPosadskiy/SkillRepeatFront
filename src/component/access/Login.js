import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header} from 'semantic-ui-react';
import {Url, Validator} from '../../common';
import {Link} from "react-router-dom";
import Action from "../../action";

class Login extends Component {
	state = {
		email: '',
		password: '',
		isValidationError: false,
		isEmailValidationError: true,
		isPasswordValidationError: true,
	};

	onChangeEmail = (event) => {
		const {isEmailValidationError} = this.state;
		const email = event.target.value;

		if (!Validator.AuthValidator.authEmailValidate(email)) {
			!isEmailValidationError && this.setState({isEmailValidationError: true})
		} else {
			isEmailValidationError && this.setState({isEmailValidationError: false})
		}

		this.setState({email});
	};

	onChangePassword = (event) => {
		const {isPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!Validator.AuthValidator.authPasswordValidate(password)) {
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

		if (!Validator.AuthValidator.authValidate({email, password})) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		this.props.auth(email, password);
	};

	render() {
		const {
			email,
			password,
			isValidationError,
			isEmailValidationError,
			isPasswordValidationError,
		} = this.state;

		const {
			REG,
			FORGOT_PASSWORD
		} = Url.PAGE;

		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
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
								<Button onClick={this.props.history.goBack}>Back</Button>
								<Button.Or/>
								<Button onClick={this.onClickLogin} positive>Login</Button>
							</Button.Group>
							<Button.Group widths='2'>
								<Button as={Link} to={REG} fluid basic>Sign up</Button>
								<Button as={Link} to={FORGOT_PASSWORD} fluid basic>Forgot password?</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	auth: (login, password) => Action.User.auth(login, password)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);