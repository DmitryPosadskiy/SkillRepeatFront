import React, { Component } from 'react';

import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class ErrorBoundary extends Component {
	state = {
		hasError: false,
	};

	closeError = () => {
		this.setState({hasError: false, errorInfo: undefined});
	};

	componentDidCatch(error, errorInfo) {
		console.log("error", error);
		console.log("errorInfo", errorInfo);
		this.setState({ hasError: true, errorInfo });
	}

	render() {
		return (
			<Modal
				trigger={this.props.children}
				open={this.state.hasError}
				onClose={this.closeError}
				basic
				size='small'
			>
				<Header icon='browser' content='Cookies policy' />
				<Modal.Content>
					<h3>This website uses cookies to ensure the best user experience.</h3>
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

export default ErrorBoundary;