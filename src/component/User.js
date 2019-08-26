import React, {Component} from 'react';

import {Grid, Header, Image, List} from 'semantic-ui-react';
import Skill from "./Skill";
import {connect} from 'react-redux';

class User extends Component {

	render() {
		const {
			skills = [],
		} = this.props;

		const repeatedSkills = skills.filter(skill => !skill.isNeedRepeat);
		const needRepeatSkills = skills.filter(skill => skill.isNeedRepeat);

		return (
			<div>
				<Header as='h2' icon textAlign='center'>
					<Image src={'/repeat.png'} size='tiny' verticalAlign='bottom'/> Skill Repeater
				</Header>
				{
					skills.length > 0 ? (
						<div>
							<List>
								{
									needRepeatSkills && needRepeatSkills.map((skill) => (
										<Skill
											key={skill.id}
											skill={skill}
										/>
									))
								}
							</List>
							<List>
								{
									repeatedSkills && repeatedSkills.map((skill) => (
										<Skill
											key={skill.id}
											skill={skill}
										/>
									))
								}
							</List>
						</div>
					) : (
						<Grid verticalAlign='middle' style={{ height: '80vh'}} columns={1} centered>
							<Grid.Row>
								<Grid.Column>
									<Header
										as='h1'
										content='You list is empty'
										subheader='Add skill that you would like to train'
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	skills: state.user.user.skills,
	isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, undefined)(User);