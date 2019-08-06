import React, {Component} from 'react';

import { Form, List } from 'semantic-ui-react'
import { SkillValidator } from '../common/Validator';

const repeatPeriods = [
	{ key: 'today', text: 'Today', value: '0' },
	{ key: 'yesterday', text: 'Yesterday', value: '1' },
	{ key: 'week', text: 'On this week', value: '2' },
	{ key: 'twoweek', text: 'Last two week', value: '3' },
	{ key: 'month', text: 'Last month', value: '4' },
];

class NewSkill extends Component {

	state = {
		isChangeNotificationSetting: false,
		isNameError: true,
		isRepeatInLastMonthError: true,
		isPeriodError: true,
		isTimeError: true,
	};

	onChangeFormName = (event) => {
		const name = event.target.value;
		const isNameError = this.state.isNameError;
		if (SkillValidator.skillNameValidate(name)) {
			isNameError && this.setState({isNameError: false});
		} else {
			!isNameError && this.setState({isNameError: true});
		}

		this.props.onChangeName(name, this.props.index);
	};

	onChangeFormPeriod = (event) => {
		const { isPeriodError } = this.state;
		const period = event.target.value;

		if (SkillValidator.skillPeriodValidate(period)) {
			isPeriodError && this.setState({isPeriodError: false});
		} else {
			!isPeriodError && this.setState({isPeriodError: true});
		}

		this.props.onChangePeriod(period, this.props.index);
	};

	onChangeFormTime = (e, {value}) => {
		const { isTimeError } = this.state;

		if (SkillValidator.skillTimeValidate(value)) {
			isTimeError && this.setState({isTimeError: false});
		} else {
			!isTimeError && this.setState({isTimeError: true});
		}

		this.props.onChangeTime(value, this.props.index);
	};

	onChangeFormCheckbox = (e, {checked}) => {
		this.props.onChangeIsRepeat(checked, this.props.index);
	};

	onChangeTerm = (e, {value}) => {
		const { isRepeatInLastMonthError } = this.state;
		if (SkillValidator.skillRepeatInLastMonthValidate(value)) {
			isRepeatInLastMonthError && this.setState({isRepeatInLastMonthError: false});
		} else {
			!isRepeatInLastMonthError && this.setState({isRepeatInLastMonthError: true});
		}

		this.props.onChangeTerm(value, this.props.index);
	};

	onChangeNotificationSetting = (e, {checked}) => {
		this.setState({isChangeNotificationSetting: checked});
	};

	render() {
		const {
			isNameError,
			isRepeatInLastMonthError,
			isPeriodError,
			isTimeError,
			isChangeNotificationSetting,
		} = this.state;

		const {
			skill: {
				name,
				period,
				time,
				isRepeatInLastMonth,
			},
			isValidationError,
		} = this.props;

		return (
			<List.Item>
				<Form>
				<Form.Input
					required
					error={isValidationError && isNameError ? 'Please, fill this field' : undefined}
					value={name}
					onChange={this.onChangeFormName}
					fluid
					label='Skill name'
					placeholder='Java, Python, ...'
				/>
				<Form.Checkbox
					checked={isRepeatInLastMonth}
					onChange={this.onChangeFormCheckbox}
					toggle
					label='Did you repeat it in last month?'
				/>
				{
					isRepeatInLastMonth && (
						<Form.Select
							fluid
							label='How long ago?'
							error={isValidationError && isRepeatInLastMonthError ? 'Please, fill this field' : undefined}
							options={repeatPeriods}
							onChange={this.onChangeTerm}
							placeholder='Today'
						/>
					)
				}
				<Form.Checkbox
					checked={isChangeNotificationSetting}
					onChange={this.onChangeNotificationSetting}
					toggle
					label='Change default notification?'
				/>
				{
					isChangeNotificationSetting && (
						<Form.Group widths='equal'>
							<Form.Input
								value={period}
								onChange={this.onChangeFormPeriod}
								fluid
								error={isValidationError && isPeriodError ? 'Please, fill this field' : undefined}
								label='Days between repeats'
								type='number'
								placeholder='3' />
							<Form.Input
								value={time}
								fluid
								label='Repeat time'
								error={isValidationError && isTimeError ? 'Please, fill this field' : undefined}
								onChange={this.onChangeFormTime}
								type='time'
								placeholder='20:00'
							/>
						</Form.Group>
					)
				}
				</Form>
			</List.Item>
		)
	}
}

export default NewSkill;