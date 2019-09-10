import React, {Component} from 'react';

import {Grid, Header, List} from 'semantic-ui-react';
import {Skill} from "../component";
import {connect} from 'react-redux';

class Home extends Component {

	render() {
		const {
			skills = [],
		} = this.props;

		const repeatedSkills = skills.filter(skill => !skill.isNeedRepeat);
		const needRepeatSkills = skills.filter(skill => skill.isNeedRepeat);

		return (
			<div>
				{
					skills.length > 0 ? (
						<div>
							<List selection verticalAlign='middle' divided relaxed>
								{
									needRepeatSkills && needRepeatSkills.map((skill) => (
										<Skill
											key={skill.id}
											skill={skill}
										/>
									))
								}
							</List>
							<List selection verticalAlign='middle'>
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
										content='My list is empty'
										subheader='Add skill you would like to train'
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

export default connect(mapStateToProps, undefined)(Home);