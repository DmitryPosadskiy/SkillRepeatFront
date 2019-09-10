import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon, Image, Menu} from "semantic-ui-react";
import {Url, History} from "../../common";

class Header extends Component {
	render() {
		if (!this.props.isAuth) return '';

		return (
			<div>
				<Menu fixed='top' borderless secondary>
					<Menu.Item position='left' onClick={History.goBack}>
						<Icon name='chevron left' size='big' style={{marginRight: '10px', width: '20px'}}/>
						<p style={{fontSize: '18px'}}>Back</p>
					</Menu.Item>
					<Menu.Item position='right' style={{display: 'flex'}} onClick={() => History.push(Url.PAGE.HOME)}>
						<p style={{fontSize: '18px', margin: '0 auto', marginRight: '7px'}}>Skill Repeater</p>
						<Image src={'/repeat.png'} size='mini' verticalAlign='bottom'/>
					</Menu.Item>
				</Menu>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);