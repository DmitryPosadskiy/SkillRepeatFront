import React, { Component } from 'react';

import {
	Container,
	Menu,
	Icon,
} from 'semantic-ui-react';
import Action from "../action";
import {connect} from "react-redux";
import Page from "../common/Page";

class Footer extends Component {
	state = {};

	onClickMenuItem = (e, { name } ) => this.props.changeActivePage(name);

	render() {
		const {
			activePage,
			isAuth,
		} = this.props;

		const userPage = isAuth ? Page.USER_SETTINGS : Page.USER_LOGIN;

		if (!isAuth) return '';
		return (
			<Container style={{paddingTop: 80}}>
				<Menu fixed='bottom' compact icon='labeled' widths={3}>
					<Menu.Item
						name={Page.MAIN}
						active={activePage === Page.MAIN}
						onClick={this.onClickMenuItem}
					>
						<Icon name='home' />
						Home
					</Menu.Item>

					<Menu.Item
						name={Page.ADD}
						active={activePage === Page.ADD}
						onClick={this.onClickMenuItem}
					>
						<Icon name='add' />
						New
					</Menu.Item>

					<Menu.Item
						name={userPage}
						active={activePage === userPage}
						onClick={this.onClickMenuItem}
					>
						<Icon name='user' />
						Account
					</Menu.Item>
				</Menu>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	activePage: state.page.activePage,
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
	changeActivePage: (page) => dispatch(Action.Page.changeActivePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);