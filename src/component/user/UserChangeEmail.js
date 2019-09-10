import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header} from "semantic-ui-react";
import {Validator} from "../../common";
import Action from "../../action";

class UserChangeEmail extends Component {

	state = {
		email: this.props.email,

		isValidationError: false,
		isEmailValidationError: true,
	};

	onChangeEmail = (event) => {
		const {isEmailValidationError} = this.state;
		const email = event.target.value;

		if (!Validator.CreateUserValidator.authEmailValidate(email)) {
			!isEmailValidationError && this.setState({isEmailValidationError: true})
		} else {
			isEmailValidationError && this.setState({isEmailValidationError: false})
		}

		this.setState({email});
	};

	cancel = () => {
		this.props.openUserSettingsPage();
	};

	onClickChangeEmail = () => {
		const {
			email,

			isValidationError,
		} = this.state;

		const {
			id,
			changeUserEmail,
		} = this.props;

		if (!Validator.ChangeEmailValidator.authEmailValidate(email)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		const auth = {
			id,
			email,
		};

		changeUserEmail(auth);
	};

	render() {
		const {
			email,
			isValidationError,
			isEmailValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Change email
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
							<Button.Group fluid>
								<Button onClick={this.onClickChangeEmail} positive>Save</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	id: state.user.user.id,
	email: state.user.user.email,
});

const mapDispatchToProps = (dispatch) => ({
	changeUserEmail: (email) => Action.User.changeUserEmail(email)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserChangeEmail);