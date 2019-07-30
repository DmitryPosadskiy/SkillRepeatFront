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

const hoursAtDay = [
	{ key: '00', text: '00:00', value: '0' },
	{ key: '01', text: '01:00', value: '1' },
	{ key: '02', text: '02:00', value: '2' },
	{ key: '03', text: '03:00', value: '3' },
	{ key: '04', text: '04:00', value: '4' },
	{ key: '05', text: '05:00', value: '5' },
	{ key: '06', text: '06:00', value: '6' },
	{ key: '07', text: '07:00', value: '7' },
	{ key: '08', text: '08:00', value: '8' },
	{ key: '09', text: '09:00', value: '9' },
	{ key: '10', text: '10:00', value: '10' },
	{ key: '11', text: '11:00', value: '11' },
	{ key: '12', text: '12:00', value: '12' },
	{ key: '13', text: '13:00', value: '13' },
	{ key: '14', text: '14:00', value: '14' },
	{ key: '15', text: '15:00', value: '15' },
	{ key: '16', text: '16:00', value: '16' },
	{ key: '17', text: '17:00', value: '17' },
	{ key: '18', text: '18:00', value: '18' },
	{ key: '19', text: '19:00', value: '19' },
	{ key: '20', text: '20:00', value: '20' },
	{ key: '21', text: '21:00', value: '21' },
	{ key: '22', text: '22:00', value: '22' },
	{ key: '23', text: '23:00', value: '23' },
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
								placeholder='3' />
							<Form.Select
								value={time}
								fluid
								label='Repeat time'
								error={isValidationError && isTimeError ? 'Please, fill this field' : undefined}
								options={hoursAtDay}
								onChange={this.onChangeFormTime}
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