import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Grid, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Url} from '../../common';
import Action from "../../action";

class ConfirmEmail extends Component {
	componentWillMount() {
		const {
			match: {
				params: {
					hash,
				} = {}
			} = {},
			confirmEmail,
		} = this.props;

		confirmEmail(hash);
	}

	render() {
		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column style={{display: 'flex', alignItems: 'center'}}>
						<Header as='h1'>Confirmed!</Header>
						<Header as='h3'>You will get notifications on your e-mail</Header>
						<Button as={Link} to={Url.PAGE.HOME} positive justify style={{width: '100%', paddingRight: 0}}>Go to Home</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	confirmEmail: (hash) => Action.User.confirmEmail(hash)(dispatch)
});

export default connect(undefined, mapDispatchToProps)(ConfirmEmail);