import React, {Component} from 'react';
import {Header, List, Label} from 'semantic-ui-react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Url, Utils} from '../../common';
import Action from "../../action";

class Skill extends Component {
	deleteSkill = (id) => {
		this.props.deleteSkill(id);
		this.closeModal();
	};

	render() {
		const {
			skill: {
				id,
				name,
				isNeedRepeat,
				lastRepeat,
				level,
			} = {},
		} = this.props;

		let repeatAgoView = Utils.getDaysAgoFromDate(new Date(lastRepeat.replace(/\++/g, '')));
		return (
			<List.Item as={Link} to={Url.PAGE.SKILL_PAGE(id)} style={{padding: 0, paddingTop: '10px', paddingBottom: '10px'}} key={id}>
				<List.Content floated='right'>
					{repeatAgoView}
				</List.Content>
				<List.Content>
					<Header as='a' style={{display: 'flex', flexDirection: 'row'}}>
						<Label style={{padding: 0, margin: 0}} circular size='huge' color={isNeedRepeat ? 'yellow' : 'green'}>{level}</Label>
						<Header.Content style={{alignSelf: 'center', marginLeft: '14px'}}>{name}</Header.Content>
					</Header>
				</List.Content>
			</List.Item>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	choseSkillId: (skillId) => dispatch(Action.User.choseSkillId(skillId))
});

export default connect(null, mapDispatchToProps)(Skill);