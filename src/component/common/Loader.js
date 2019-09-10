import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dimmer, Loader as SemanticLoader} from 'semantic-ui-react';

class Loader extends Component {
	render() {
		const {
			isLoading,
		} = this.props;

		return (
			<div>
					<Dimmer style={{position: 'fixed'}} active={isLoading}>
						<SemanticLoader size='big' content='Loading' indeterminate={true}/>
					</Dimmer>
					{this.props.children}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, undefined)(Loader);