import React, {Component} from 'react';
import {Button, Grid, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Url} from '../../common';

class Page404 extends Component {

	render() {
		return (
			<Grid verticalAlign='middle' style={{ height: '100vh' }} columns={1} centered>
				<Grid.Row>
					<Grid.Column style={{display: 'flex', alignItems: 'center'}}>
						<Header as='h1'>404</Header>
						<Header as='h3'>Page does not exist</Header>
						<Button as={Link} to={Url.PAGE.HOME} positive justify style={{width: '100%', paddingRight: 0}}>Go to Home</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Page404;