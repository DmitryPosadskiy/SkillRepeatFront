import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Form, Grid, Header, Icon, Modal} from "semantic-ui-react";
import Action from "../action";
import {SkillEditValidator} from '../common/Validator';

class SkillEditPage extends Component {
	state = {
		id: this.props.skill.id,
		name: this.props.skill.name,
		period: this.props.skill.period,
		time: this.props.skill.time,

		isChangeNotificationSetting: false,

		isValidationError: false,
		isNameValidationError: false,
		isPeriodError: true,
		isTimeError: true,

		isModalOpen: false,
	};

	onChangeName = (event) => {
		const {isNameValidationError} = this.state;
		const name = event.target.value;

		if (!SkillEditValidator.skillNameValidate(name)) {
			!isNameValidationError && this.setState({isNameValidationError: true})
		} else {
			isNameValidationError && this.setState({isNameValidationError: false})
		}

		this.setState({name});
	};

	onChangeFormPeriod = (event) => {
		const {isPeriodError} = this.state;
		const period = event.target.value;

		if (SkillEditValidator.skillPeriodValidate(period)) {
			isPeriodError && this.setState({isPeriodError: false});
		} else {
			!isPeriodError && this.setState({isPeriodError: true});
		}

		this.setState({period});
	};

	onChangeFormTime = (e, {value}) => {
		const {isTimeError} = this.state;

		if (SkillEditValidator.skillTimeValidate(value)) {
			isTimeError && this.setState({isTimeError: false});
		} else {
			!isTimeError && this.setState({isTimeError: true});
		}

		this.setState({time: value});
	};

	onChangeNotificationSetting = (e, {checked}) => {
		this.setState({isChangeNotificationSetting: checked});
	};

	openModal = () => {
		this.setState({isModalOpen: true})
	};

	closeModal = () => {
		this.setState({isModalOpen: false})
	};

	deleteSkill = (id) => {
		this.props.deleteSkill(this.props.userId, id);
		this.closeModal();
		this.props.openMainPage();
	};

	onClickSkillEdit = () => {
		const {
			id,
			name,
			period,
			time,
			isValidationError
		} = this.state;

		const {
			userId,
			editSkill,
		} = this.props;

		const skill = {
			id,
			name,
			period,
			time,
		};

		if (!SkillEditValidator.skillEditValidate(skill)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		editSkill(userId, skill);
		this.props.openMainPage();
	};

	render() {
		const {
			id,
			name,
			period,
			time,

			isChangeNotificationSetting,

			isValidationError,
			isNameValidationError,
			isPeriodError,
			isTimeError,

			isModalOpen,
		} = this.state;

		const {
			cancel,
		} = this.props;

		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
				<Grid.Row>
					<Grid.Column>
						<Form>
							<Header as='h2' color='teal' textAlign='center'>
								Skill edit
							</Header>
							<Form.Input
								value={name}
								onChange={this.onChangeName}
								error={isValidationError && isNameValidationError ? 'Please, fill this field' : undefined}
								placeholder='Name'
							/>
							<Form.Checkbox
								checked={isChangeNotificationSetting}
								onChange={this.onChangeNotificationSetting}
								toggle
								label='Change notification'
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
							<Button.Group fluid>
								<Button onClick={cancel}>Cancel</Button>
								<Button.Or/>
								<Button onClick={this.onClickSkillEdit} positive>Save</Button>
							</Button.Group>
							<Divider/>
							<Button.Group vertical fluid>
								<Button onClick={this.openModal} negative>Delete skill</Button>
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
					<Header icon='delete' content={`Delete ${name}?`} />
					<Modal.Content>
						<p>{`If you delete ${name}, you will not restore it!`}</p>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={this.closeModal} basic color='red' inverted>
							<Icon name='remove' /> No
						</Button>
						<Button onClick={() => this.deleteSkill(id)} color='green' inverted>
							<Icon name='checkmark' /> Yes
						</Button>
					</Modal.Actions>
				</Modal>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	skill: state.user.user.skills.filter(skill => state.user.choseSkillId === skill.id)[0],
	userId: state.user.user.id,
});

const mapDispatchToProps = (dispatch) => ({
	editSkill: (userId, skill) => Action.User.editSkill(userId, skill)(dispatch),
	deleteSkill: (userId, skillId) => Action.User.deleteSkill(userId, skillId)(dispatch),
	openMainPage: () => dispatch(Action.Page.openMainPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillEditPage);