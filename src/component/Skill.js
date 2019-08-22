import React, {Component} from 'react';

import {Header, Icon, List, Button, Label, Modal} from 'semantic-ui-react';
import { getDaysAgoFromDate } from '../common/Utils';

class Skill extends Component {
	state = {
		isModalOpen: false,
	};

	openModal = () => {
		this.setState({isModalOpen: true})
	};

	closeModal = () => {
		this.setState({isModalOpen: false})
	};

	deleteSkill = (id) => {
		this.props.deleteSkill(id);
		this.closeModal();
	};

	onClickOpenSkillPage = () => {
		const {
			skill,
			openSkillPage,
			choseSkillId,
		} = this.props;

		choseSkillId(skill.id);
		openSkillPage(skill);
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
			repeatSkill,
		} = this.props;

		let repeatAgoView = getDaysAgoFromDate(new Date(lastRepeat));
		return (
			<List.Item key={id} onClick={this.onClickOpenSkillPage}>
				<List.Content>
					<Header as='h4'>
						<Label circular size='huge' color={isNeedRepeat ? 'yellow' : 'green'}>{level}</Label>
						<Header.Content>{name}
							<Header.Subheader>{repeatAgoView}</Header.Subheader>
						</Header.Content>
					</Header>
				</List.Content>
			</List.Item>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	openSkillPage: () => dispatch(Action.Page.openSkillPage()),
	choseSkillId: (skillId) => dispatch(Action.User.choseSkillId(skillId))
});

export default connect(null, mapDispatchToProps)(Skill);