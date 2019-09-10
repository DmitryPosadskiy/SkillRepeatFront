import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header} from "semantic-ui-react";
import {Validator} from "../../common";
import Action from "../../action";

class UserChangePassword extends Component {

	state = {
		password: '',
		isValidationError: false,
		isPasswordValidationError: true,
	};

	onChangePassword = (event) => {
		const {isPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!Validator.ChangePasswordValidator.authPasswordValidate(password)) {
			!isPasswordValidationError && this.setState({isPasswordValidationError: true})
		} else {
			isPasswordValidationError && this.setState({isPasswordValidationError: false})
		}

		this.setState({password});
	};

	onClickChangePassword = () => {
		const {
			password,
			isValidationError,
		} = this.state;

		const {
			userId,
			checkMatchPassword,
		} = this.props;

		if (!Validator.ChangePasswordValidator.authPasswordValidate(password)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		checkMatchPassword(userId, password);
	};

	render() {
		const {
			password,
			isValidationError,
			isPasswordValidationError,
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
								value={password}
								onChange={this.onChangePassword}
								fluid
								error={isValidationError && isPasswordValidationError ? 'Please, fill this field' : undefined}
								placeholder='Old password'
								type='password'
							/>
							<Button.Group fluid>
								<Button onClick={this.onClickChangePassword} positive>Next</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	userId: state.user.user.id,
});

const mapDispatchToProps = (dispatch) => ({
	checkMatchPassword: (userId, password) => Action.User.checkMatchPassword(userId, password)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserChangePassword);