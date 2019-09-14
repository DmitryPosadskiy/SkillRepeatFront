import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Form, Grid, Header, List} from "semantic-ui-react";
import {Validator} from "../../common";
import Action from "../../action";

class ContactUs extends Component {
	state = {
		message: '',

		isValidationError: false,
		isMessageValidationError: true,
	};

	onChangeMessage = (event) => {
		const { isMessageValidationError } = this.state;
		const message = event.target.value;

		if (Validator.ContactUsValidator.contactUsMessageValidate(message)) {
			isMessageValidationError && this.setState({isMessageValidationError: false});
		} else {
			!isMessageValidationError && this.setState({isMessageValidationError: true});
		}

		this.setState({message});
	};

	cancel = () => {
		const {
			cancel,
		} = this.props;

		cancel();
	};

	onClickSendMessage = () => {
		const {
			message,
			isValidationError,
		} = this.state;

		const {
			userId,
			sendMessage,
		} = this.props;

		if (!Validator.ContactUsValidator.contactUsMessageValidate(message)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		sendMessage(userId, message);
	};

	render() {
		const {
			message,
			isValidationError,
			isMessageValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Write us something
							</Header>
							<p>You can here:</p>
							<List bulleted vertical>
								<List.Item>Ask a question</List.Item>
								<List.Item>Report about bug</List.Item>
								<List.Item>Request feature</List.Item>
								<List.Item>Share opinion</List.Item>
								<List.Item>Anything else</List.Item>
							</List>
							<Form.TextArea
								value={message}
								onChange={this.onChangeMessage}
								error={isValidationError && isMessageValidationError ? 'Please, fill this field' : undefined}
								type='text'
								placeholder='Your message'
							/>
							<Button.Group fluid>
								<Button onClick={this.onClickSendMessage} positive>Send</Button>
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
	sendMessage: (userId, message) => Action.User.sendMessage(userId, message)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);