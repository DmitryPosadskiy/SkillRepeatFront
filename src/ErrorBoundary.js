import React, { Component } from 'react';
import {connect} from 'react-redux';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import Action from "./action";

class ErrorBoundary extends Component {
	state = {
		hasError: false,
		errorInfo: undefined,
	};

	closeError = () => {
		const {
			hasError,
		} = this.state;

		const {
			error,
			readError,
		} = this.props;

		hasError && this.setState({hasError: false, errorInfo: undefined});
		error && readError();
	};

	componentDidCatch(error, errorInfo) {
		this.setState({ hasError: true, errorInfo });
	}

	render() {
		const {
			hasError,
			errorInfo,
		} = this.state;

		const {
			error,
		} = this.props;

		const errorObject = hasError ? errorInfo : error;
		const title = errorObject ? errorObject.title || errorObject.name : 'Error';
		const message = errorObject ? errorObject.message : 'Something wrong. We already work with it. Please, try again later';

		return (
			<Modal
				trigger={this.props.children}
				open={!!errorObject}
				onClose={this.closeError}
				basic
				size='small'
			>
				<Header icon='browser' content={title} />
				<Modal.Content>
					<h3>{message}</h3>
				</Modal.Content>
				<Modal.Actions>
					<Button color='green' onClick={this.closeError} inverted>
						<Icon name='checkmark' /> Got it
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
	readError: () => dispatch(Action.User.readError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);