import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Divider, Form, Grid, Header, Icon, Modal} from "semantic-ui-react";
import Action from '../action';
import {CreateUserValidator} from "../common/Validator";

class AccountInfo extends Component {

	state = {
		name: this.props.name,
		isAgreeGetEmails: this.props.isAgreeGetEmails,

		isValidationError: false,
		isNameValidationError: false,
		isAgreeGetEmailsValidationError: false,

		isEmailModalOpen: false,
		isDeleteAccountModalOpen: false,
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

	onChangeIsAgreeEmails = (e, value) => {
		const {isAgreeGetEmailsValidationError} = this.state;
		const isAgreeGetEmails = value.checked;

		if (!CreateUserValidator.createUserAgreeEmailValidate(isAgreeGetEmails)) {
			!isAgreeGetEmailsValidationError && this.setState({isAgreeGetEmailsValidationError: true})
		} else {
			isAgreeGetEmailsValidationError && this.setState({isAgreeGetEmailsValidationError: false})
		}

		if (!isAgreeGetEmails) {
			this.setState({isEmailModalOpen: true});
			return;
		}

		this.setState({isAgreeGetEmails: true});
	};

	cancel = () => {
		this.props.openUserSettingsPage();
	};

	onClickChangeAccountInfo = () => {
		const {
			name,
			isAgreeGetEmails,
		} = this.state;

		const {
			id,
		} = this.props;

		const user = {
			id,
			name,
			isAgreeGetEmails,
		};

		this.props.updateUser(user);
	};

	onClickDeleteAccount = () => {
		this.setState({isDeleteAccountModalOpen: true});
	};

	onEmailModalCancel = () => {
		this.setState({isAgreeGetEmails: false});
		this.onEmailModalClose();
	};

	onEmailModalConfirm = () => {
		this.onEmailModalClose();
	};

	onEmailModalClose = () => {
		this.setState({isEmailModalOpen: false});
	};

	onDeleteAccountModalCancel = () => {
		const {
			id,
			deleteUser,
		} = this.props;

		deleteUser(id);

		this.onDeleteAccountModalClose();
	};

	onDeleteAccountModalConfirm = () => {
		this.onDeleteAccountModalClose();
	};

	onDeleteAccountModalClose = () => {
		this.setState({isDeleteAccountModalOpen: false});
	};

	render() {
		const {
			name,
			isAgreeGetEmails,

			isValidationError,
			isNameValidationError,
			isAgreeGetEmailsValidationError,

			isEmailModalOpen,
			isDeleteAccountModalOpen,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Edit my data
							</Header>
							<Form.Input
								value={name}
								onChange={this.onChangeName}
								error={isValidationError && isNameValidationError ? 'Please, fill this field' : undefined}
								icon='user'
								iconPosition='left'
								placeholder='Name'
							/>
							<Form.Checkbox
								checked={isAgreeGetEmails}
								onClick={this.onChangeIsAgreeEmails}
								error={isValidationError && isAgreeGetEmailsValidationError ? 'We cannot service you without it' : undefined}
								label='I agree to get emails'
							/>
							<Button.Group fluid>
								<Button onClick={this.cancel}>Cancel</Button>
								<Button.Or/>
								<Button onClick={this.onClickChangeAccountInfo} positive>Save</Button>
							</Button.Group>
							<Divider/>
							<Button.Group vertical fluid>
								<Button onClick={this.onClickDeleteAccount} negative>Delete account</Button>
							</Button.Group>
						</Form>
					</Grid.Column>
				</Grid.Row>
				<Modal
					open={isEmailModalOpen}
					onClose={this.onEmailModalClose}
					basic
					size='small'
				>
					<Header icon='mail' content='Email notifications'/>
					<Modal.Content>
						<p>Unfortunately, you did not give your consent to receive emails with reminders to repeat the skills. You
							can check the status of the skill only in the application. Perhaps we can send you email alerts?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='red' onClick={this.onEmailModalCancel} inverted>
							I'll check in App
						</Button>
						<Button color='green' onClick={this.onEmailModalConfirm} inverted>
							<Icon name='checkmark'/> Yes, send me
						</Button>
					</Modal.Actions>
				</Modal>
				<Modal
					open={isDeleteAccountModalOpen}
					onClose={this.onDeleteAccountModalClose}
					basic
					size='small'
				>
					<Header icon='mail' content='Delete account'/>
					<Modal.Content>
						<p>Do you want to delete your account with all progress and skill list? You will not can restore it later.</p>
					</Modal.Content>
					<Modal.Actions>
						<Button basic color='red' onClick={this.onDeleteAccountModalCancel} inverted>
							Delete anyway
						</Button>
						<Button color='green' onClick={this.onDeleteAccountModalConfirm} inverted>
							<Icon name='checkmark'/> No, stay it
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	id: state.user.user.id,
	name: state.user.user.name,
	isAgreeGetEmails: state.user.user.isAgreeGetEmails,
});

const mapDispatchToProps = (dispatch) => ({
	updateUser: (user) => Action.User.updateUser(user)(dispatch),
	deleteUser: () => Action.User.deleteUser()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);