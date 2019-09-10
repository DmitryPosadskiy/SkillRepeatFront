import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Icon, Menu,} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {Url} from '../../common';

class Footer extends Component {

	render() {
		if (!this.props.isAuth) return '';

		const {
			HOME,
			SKILL_ADD,
			USER,
		} = Url.PAGE;

		return (
			<Container>
				<Menu fixed='bottom' compact icon='labeled' widths={3}>
					<Menu.Item
						as={Link}
						to={HOME}
					>
						<Icon name='home'/>
						Home
					</Menu.Item>

					<Menu.Item
						as={Link}
						to={SKILL_ADD}
					>
						<Icon name='add'/>
						New
					</Menu.Item>

					<Menu.Item
						as={Link}
						to={USER}
					>
						<Icon name='user'/>
						Account
					</Menu.Item>
				</Menu>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);