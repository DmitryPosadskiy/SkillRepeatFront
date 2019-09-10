import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, Header, Image, List, Transition} from "semantic-ui-react";
import {Url, Validator} from '../../common';
import Action from "../../action";
import {Link} from "react-router-dom";

class HelloPage extends Component {
	state = {
		skills: [{name: ''}],
		period: '',
		time: '',
		email: '',
		password: '',

		isValidationError: false,

		isPeriodValidationError: false,
		isTimeValidationError: false,
		isEmailValidationError: true,
		isPasswordValidationError: true,
	};

	onAddSkill = () => {
		this.setState(prevState => ({skills: [...prevState.skills, {}]}))
	};

	onDeleteSkill = () => {
		this.setState(prevState => ({skills: prevState.skills.slice(0, -1)}))
	};

	onChangeSkillName = (event, index) => {
		const name = event.target.value;
		const newSkills = [...this.state.skills];
		newSkills[index].name = name;

		this.setState({skills: newSkills});
	};

	onChangeEmail = (event) => {
		const {isEmailValidationError} = this.state;
		const email = event.target.value;

		if (!Validator.HelloPageValidator.authEmailValidate(email)) {
			!isEmailValidationError && this.setState({isEmailValidationError: true})
		} else {
			isEmailValidationError && this.setState({isEmailValidationError: false})
		}

		this.setState({email});
	};

	onChangePassword = (event) => {
		const {isPasswordValidationError} = this.state;
		const password = event.target.value;

		if (!Validator.HelloPageValidator.authPasswordValidate(password)) {
			!isPasswordValidationError && this.setState({isPasswordValidationError: true})
		} else {
			isPasswordValidationError && this.setState({isPasswordValidationError: false})
		}

		this.setState({password});
	};

	onChangeFormPeriod = (event) => {
		const {isPeriodValidationError} = this.state;
		const period = event.target.value;

		if (Validator.HelloPageValidator.helloPagePeriodValidate(period)) {
			isPeriodValidationError && this.setState({isPeriodValidationError: false});
		} else {
			!isPeriodValidationError && this.setState({isPeriodValidationError: true});
		}

		this.setState({period});
	};

	onChangeFormTime = (e, {value}) => {
		const {isTimeValidationError} = this.state;

		if (Validator.HelloPageValidator.helloPageTimeValidate(value)) {
			isTimeValidationError && this.setState({isTimeValidationError: false});
		} else {
			!isTimeValidationError && this.setState({isTimeValidationError: true});
		}

		this.setState({time: value});
	};

	onClickFormRegistration = () => {
		const {
			email,
			password,
			period,
			time,
			skills,

			isValidationError,
		} = this.state;

		const {
			openMainPage,
			registration,
		} = this.props;

		const user = {
			email,
			password,
		};

		if (!Validator.HelloPageValidator.helloPageValidate(user)) {
			!isValidationError && this.setState({isValidationError: true});
			return;
		}

		isValidationError && this.setState({isValidationError: false});

		if (period) user.period = period;
		if (time) user.time = time;
		if (skills && skills.length > 0) user.skills = skills;

		registration(user);
		openMainPage();
	};

	render() {
		const {
			skills,
			period,
			time,
			email,
			password,

			isValidationError,
			isEmailValidationError,
			isPasswordValidationError,
			isPeriodValidationError,
			isTimeValidationError,
		} = this.state;

		const {
			REG,
			AUTH,
		} = Url.PAGE;

		return (
			<div>
				<Header as='h1' icon>
					<Image src={'/repeat.png'} size='tiny' verticalAlign='bottom'/> Skill Repeater
				</Header>
				<div style={{marginTop: '20px'}}>
					<Header style={{margin: 0}} as='h2'>Train your skills and do not forget to repeat them.</Header>
				</div>
				<div style={{marginTop: '14px'}}>
					<p style={{fontSize: 'large'}} className='marginZero'>If skills are not trained, they are forgotten.</p>
					<p style={{marginTop: '10px', fontSize: 'medium'}} className='marginZero'>Skill Repeater will remind you about time to repeat skills so as not to lose them.</p>
				</div>
				<div style={{marginTop: '14px'}}>
					<Button.Group>
						<Button as={Link} to={REG} positive>Registration</Button>
						<Button.Or text='|'/>
						<Button as={Link} to={AUTH} positive>Authorization</Button>
					</Button.Group>
				</div>
				<div style={{marginTop: '20px'}}>
					<Header style={{margin: 0}} as='h2'>Try us right now by 3 steps</Header>
				</div>
				<div style={{marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
					<p style={{fontSize: 'large'}} className='marginZero'>1. Create your list of skills</p>
					<Transition.Group as={List} duration={200} size='big' verticalAlign='middle' style={{marginTop: '14px', marginBottom: '5px'}}>
						<Form widths='equal' style={{margin: 0}}>
							{skills.map((skill, index) => (
								<Form.Input
									value={skill.name}
									onChange={(event) => this.onChangeSkillName(event, index)}
									style={{margin: 0}}
									fluid
									placeholder='Java / Python / ...'
								/>
							))}
						</Form>
					</Transition.Group>
					<Button.Group>
						<Button disabled={skills.length === 1} icon='minus' onClick={this.onDeleteSkill}/>
						<Button disabled={skills.length === 5} icon='plus' onClick={this.onAddSkill}/>
					</Button.Group>
				</div>
				<div style={{marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
					<div>
						<p style={{fontSize: 'large'}} className='marginZero'>2. Set a time for repetition</p>
					</div>
					<div style={{marginTop: '14px'}}>
						<Form.Group widths='equal'>
							<Form.Input
								value={period}
								onChange={this.onChangeFormPeriod}
								error={isValidationError && isPeriodValidationError ? 'Please, fill this field' : undefined}
								fluid
								icon='bell'
								iconPosition='left'
								type='number'
								placeholder='Days between repeats'/>
							<Form.Input
								value={time}
								onChange={this.onChangeFormTime}
								error={isValidationError && isTimeValidationError ? 'Please, fill this field' : undefined}
								fluid
								icon='time'
								iconPosition='left'
								type='time'
								placeholder='Time of repetition'
								style={{marginTop: '5px'}}
							/>
						</Form.Group>
					</div>
					<div style={{marginTop: '20px'}}>
						<p style={{fontSize: 'medium'}} className='marginZero'>Get notification when you need to repeat</p>
						<p style={{fontSize: 'medium'}} className='marginZero'>Learn anything and check in in app</p>
					</div>
				</div>
				<div style={{marginTop: '20px', display: 'flex', flexDirection: 'column'}}>
					<div>
						<p style={{fontSize: 'large'}} className='marginZero'>3. Give us your data</p>
					</div>
					<div style={{marginTop: '14px'}}>
						<Form.Group widths='equal'>
							<Form.Input
								value={email}
								onChange={this.onChangeEmail}
								error={isValidationError && isEmailValidationError ? 'You can use "@" in your e-mail' : undefined}
								fluid
								icon='at'
								iconPosition='left'
								type='email'
								placeholder='Email'
							/>
							<Form.Input
								value={password}
								onChange={this.onChangePassword}
								error={isValidationError && isPasswordValidationError ? 'Please, fill this field' : undefined}
								fluid
								icon='spy'
								iconPosition='left'
								type='password'
								placeholder='Password'
								style={{marginTop: '5px'}}
							/>
						</Form.Group>
					</div>
				</div>
				<div style={{marginTop: '14px', marginBottom: '20px'}}>
					<Button onClick={this.onClickFormRegistration} positive>Registration</Button>
				</div>
			</div>

		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	registration: (user) => Action.User.registration(user)(dispatch),
});

export default connect(undefined, mapDispatchToProps)(HelloPage);