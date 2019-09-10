import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header} from "semantic-ui-react";
import {Validator} from '../../common';
import Action from "../../action";

class ForgotPassword extends Component {
	state = {
		email: '',
		isValidationError: false,
		isEmailValidationError: true,
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

	onClickForgotPassword = () => {
		const {
			email,
			isValidationError,
		} = this.state;

		if (!Validator.AuthValidator.authEmailValidate(email)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		this.props.forgotPassword(email);
	};

	render() {
		const {
			email,
			isValidationError,
			isEmailValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Forgot password
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
							<Button.Group fluid>
								<Button onClick={this.onClickForgotPassword} positive>Request new password</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	forgotPassword: (email) => Action.User.forgotPassword(email)(dispatch),
});

export default connect(undefined, mapDispatchToProps)(ForgotPassword);