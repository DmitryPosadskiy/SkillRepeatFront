import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {Url} from '../common';

class PrivateRoute extends Component {
	render() {
		const {
			component: Component,
			isAuth,
			...rest
		} = this.props;

		return (
			<Route {...rest} render={(props) => (
				isAuth ? <Component {...props} /> : <Redirect to={Url.PAGE.START} />
			)} />
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, null)(PrivateRoute);