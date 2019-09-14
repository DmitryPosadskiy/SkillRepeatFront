import React, {Component} from 'react';
import {Button, Grid, List} from "semantic-ui-react";
import {Url} from '../../common';

class Telegram extends Component {
	render() {
		const {
			match: {
				params: {
					hash,
				} = {}
			} = {},
		} = this.props;
		return (
			<Grid verticalAlign='middle' style={{height: '100vh'}} columns={1} centered>
				<Grid.Row>
					<Grid.Column style={{display: 'flex', alignItems: 'center'}}>
						<p>Instruction</p>
						<List bulleted vertical>
							<List.Item>Click on button below - Telegram website will open</List.Item>
							<List.Item>Click on button "Send message" there - It will redirect you to Telegram app</List.Item>
							<List.Item>Click on "Start"</List.Item>
							<List.Item>Done!</List.Item>
						</List>
						<Button as='a' href={Url.USER.TELEGRAM(hash)} target="_blank">Add Telegram</Button>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default Telegram;