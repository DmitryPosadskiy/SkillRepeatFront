import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Header, Label} from "semantic-ui-react";
import {Utils, Url} from '../../common';
import Action from "../../action";
import '../../index.css';
import {Link} from "react-router-dom";

class SkillPage extends Component {

	onClickRepeatSkill = () => {
		const {
			skills = [],
			userId,
			repeatSkill,
			match: {
				params: {
					id,
				} = {}
			} = {},
		} = this.props;

		const skill = skills.filter(skill => id === skill.id)[0];

		repeatSkill(userId, skill.id);
	};

	render() {
		const {
			skills = [],
			match: {
				params: {
					id,
				} = {}
			} = {},
		} = this.props;

		const skill = skills.filter(skill => id === skill.id)[0];

		const {
			name,
			period,
			time,
			lastRepeat,
			level,
			isNeedRepeat,
		} = skill;

		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<Header as='h2' icon textAlign='center'>
					{name}
				</Header>
				<Label style={{width: 'fit-content', margin: '0 auto'}}>Last
					repeat {Utils.getDaysAgoFromDate(new Date(lastRepeat.replace(/\++/g, '')))}</Label>
				{
					isNeedRepeat && (
						<div style={{paddingTop: '14px', paddingBottom: '10px', textAlign: 'center'}}>
							<div style={{paddingTop: '14px', paddingBottom: '10px', textAlign: 'center'}}>
								<p className='marginZero'>If you would like to save learn progress for this skill, repeat it as soon as possible</p>
							</div>
							<Button onClick={this.onClickRepeatSkill} size='huge' fluid positive>Repeated!</Button>
						</div>
					)
				}
				{
					!isNeedRepeat && (
						<div style={{paddingTop: '14px', paddingBottom: '10px', textAlign: 'center'}}>
							<p className='marginZero'>Congratulations!</p>
							<p className='marginZero'>You already have repeated your skill</p>
							{
								period && (
									<p className='marginZero'>Please, come back after {Utils.getDaysBetweenTwoDates(new Date(lastRepeat), period)} days</p>
								)
							}
						</div>
					)
				}
				{
					period && time && (
						<div style={{paddingTop: '14px', paddingBottom: '10px', textAlign: 'center'}}>
							<p className='marginZero'>We will send you notifications</p>
							<p className='marginZero'>every {period} days at {time}</p>
						</div>
					)
				}
				<Button.Group fluid>
					<Button as={Link} to={Url.PAGE.SKILL_EDIT(id)} basic>Edit</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userId: state.user.user.id,
	skills: state.user.user.skills,
});

const mapDispatchToProps = (dispatch) => ({
	repeatSkill: (userId, skillId) => Action.User.repeatSkill(userId, skillId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillPage);