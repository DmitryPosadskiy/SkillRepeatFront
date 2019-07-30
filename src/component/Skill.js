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
			<List.Item key={id}>
				<List.Content floated='right'>
					<Modal
						trigger={(
							<Button onClick={this.openModal} basic color='red'>
								<Button.Content visible>
									<Icon name='delete' />
								</Button.Content>
							</Button>
						)}
						basic
						size='small'
						open={this.state.isModalOpen}
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
					<Button onClick={() => repeatSkill(id)} basic color='green' animated='vertical'>
						<Button.Content hidden>Repeat</Button.Content>
						<Button.Content visible>
							<Icon name='play' />
						</Button.Content>
					</Button>
				</List.Content>
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

export default Skill;