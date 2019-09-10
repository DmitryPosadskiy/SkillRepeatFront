import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Grid, Header} from "semantic-ui-react";
import {Validator} from "../../common";
import Action from "../../action";

class UserChangeNotification extends Component {

	state = {
		period: this.props.period,
		time: this.props.time,

		isValidationError: false,
		isPeriodValidationError: !this.props.period,
		isTimeValidationError: !this.props.time,

		isModalOpen: false,
	};

	onChangeFormPeriod = (event) => {
		const { isPeriodValidationError } = this.state;
		const period = event.target.value;

		if (Validator.SkillValidator.skillPeriodValidate(period)) {
			isPeriodValidationError && this.setState({isPeriodValidationError: false});
		} else {
			!isPeriodValidationError && this.setState({isPeriodValidationError: true});
		}

		this.setState({period});
	};

	onChangeFormTime = (e, {value}) => {
		const { isTimeValidationError } = this.state;

		if (Validator.SkillValidator.skillTimeValidate(value)) {
			isTimeValidationError && this.setState({isTimeValidationError: false});
		} else {
			!isTimeValidationError && this.setState({isTimeValidationError: true});
		}

		this.setState({time: value});
	};

	onChangeNotification = () => {
		const {
			id,
			changeUserNotification,
		} = this.props;

		const {
			period,
			time,

			isValidationError,
		} = this.state;

		const user = {
			id,
			period,
			time,
		};

		if (!Validator.ChangeNotificationValidator.changeNotificationValidate(user)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		changeUserNotification(user);
	};

	cancel = () => {
		this.props.openUserSettingsPage();
	};

	render() {
		const {
			period,
			time,

			isValidationError,
			isPeriodValidationError,
			isTimeValidationError,
		} = this.state;

		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Change notification
							</Header>
							<Form.Group widths='equal'>
								<Form.Input
									value={period}
									onChange={this.onChangeFormPeriod}
									fluid
									error={isValidationError && isPeriodValidationError ? 'Please, fill this field' : undefined}
									icon='bell'
									iconPosition='left'
									type='number'
									placeholder='Days between repeats'/>
								<Form.Input
									value={time}
									onChange={this.onChangeFormTime}
									fluid
									error={isValidationError && isTimeValidationError ? 'Please, fill this field' : undefined}
									icon='time'
									iconPosition='left'
									type='time'
								/>
							</Form.Group>
							<Button.Group fluid>
								<Button onClick={this.onChangeNotification} positive>Save</Button>
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
	period: state.user.user.period,
	time: state.user.user.time,
});

const mapDispatchToProps = (dispatch) => ({
	changeUserNotification: (user) => Action.User.changeUserNotification(user)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserChangeNotification);