import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Header, Label} from "semantic-ui-react";
import {getDaysAgoFromDate, getDaysBetweenTwoDates} from '../common/Utils';
import Action from "../action";
import '../index.css';

class SkillPage extends Component {

	onClickRepeatSkill = () => {
		const {
			skill: {
				id: skillId,
			} = {},
			userId,
			repeatSkill,
		} = this.props;

		repeatSkill(userId, skillId);
	};

	render() {
		const {
			skill: {
				name,
				period,
				time,
				lastRepeat,
				level,
				isNeedRepeat,
			} = {},
			cancel,
			openSkillEditPage,
		} = this.props;

		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<Header as='h2' icon textAlign='center'>
					{name}
				</Header>
				<Label style={{width: 'fit-content', margin: '0 auto'}}>Last
					repeat {getDaysAgoFromDate(new Date(lastRepeat.replace(/\++/g, '')))}</Label>
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
									<p className='marginZero'>Please, come back after {getDaysBetweenTwoDates(new Date(lastRepeat), period)} days</p>
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
					<Button onClick={cancel}>Back</Button>
					<Button.Or/>
					<Button onClick={openSkillEditPage} basic>Edit</Button>
				</Button.Group>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userId: state.user.user.id,
	skill: state.user.user.skills.filter(skill => state.user.choseSkillId === skill.id)[0],
});

const mapDispatchToProps = (dispatch) => ({
	repeatSkill: (userId, skillId) => Action.User.repeatSkill(userId, skillId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillPage);