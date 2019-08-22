import React, {Component} from 'react';

import { Button, Form, Transition, List } from 'semantic-ui-react'
import NewSkill from "./NewSkill";
import Action from "../action";
import {connect} from "react-redux";
import { SkillValidator } from '../common/Validator';

class NewSkills extends Component {
	state = {
		newSkills: [{}],
		isValidationError: false,
	};

	onChangeName = (value, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].name = value;
		this.setState({newSkills: newSkillTemp})
	};

	onChangePeriod = (value, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].period = value;
		this.setState({newSkills: newSkillTemp})
	};

	onChangeTime = (value, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].time = value;
		this.setState({newSkills: newSkillTemp})
	};

	onChangeIsRepeat = (checked, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].isRepeatInLastMonth = checked;
		this.setState({newSkills: newSkillTemp})
	};

	onChangeTerm = (value, i) => {
		const newSkillTemp = [...this.state.newSkills];
		newSkillTemp[i].termRepeat = value;
		this.setState({newSkills: newSkillTemp})
	};

	onAddSkill = () => {
		this.setState(prevState => ({newSkills: [...prevState.newSkills, {}]}))
	};

	onDeleteSkill = () => {
		this.setState(prevState => ({newSkills: prevState.newSkills.slice(0, -1)}))
	};

	saveSkill = () => {
		const {
			newSkills,
			isValidationError,
		} = this.state;

		if (!SkillValidator.skillsValidate(newSkills)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		} else {
			isValidationError && this.setState({isValidationError: false});
		}

		this.props.saveSkills(this.props.user.id, this.state.newSkills);
		this.props.openMainPage();
	};

	render() {
		const {
			newSkills,
			isValidationError
		} = this.state;

		return (
			<Form>
				<Transition.Group as={List} duration={200} size='big' verticalAlign='middle'>
					{newSkills.map((skill, i) => (
						<NewSkill
							key={i}
							index={i}
							skill={skill}
							isValidationError={isValidationError}
							onChangeName={this.onChangeName}
							onChangePeriod={this.onChangePeriod}
							onChangeTime={this.onChangeTime}
							onChangeIsRepeat={this.onChangeIsRepeat}
							onChangeTerm={this.onChangeTerm}
						/>
					))}
				</Transition.Group>
				<Button.Group>
					<Button disabled={newSkills.length === 1} icon='minus' onClick={this.onDeleteSkill} />
					<Button disabled={newSkills.length === 3} icon='plus' onClick={this.onAddSkill} />
					<Button onClick={this.saveSkill} positive>Add</Button>
				</Button.Group>
			</Form>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
	saveSkills: (user, skills) => Action.User.saveSkills(user, skills)(dispatch),
	openMainPage: () => dispatch(Action.Page.openMainPage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSkills);