import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Icon} from 'semantic-ui-react';
import Action from "../../action";

class MessengerPage extends Component {
	onClickTelegram = () => {
		const {
			userId,
			goToTelegram,
		} = this.props;

		goToTelegram(userId);
	};

	render() {
		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
				<Grid.Row>
					<Grid.Column style={{display: 'flex', alignItems: 'center'}}>
						<p>We recommend you to get notifications via messenger.</p>
						<p>Click on icon of messenger, which you prefer</p>
						<p>You can choose several</p>
						<Button onClick={this.onClickTelegram}><Icon name='telegram plane' size='big'/>Telegram</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapStateToProps = (state) => ({
	userId: state.user.user.id,
});

const mapDispatchToProps = (dispatch) => ({
	goToTelegram: (userId) => Action.User.goToTelegram(userId)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessengerPage);