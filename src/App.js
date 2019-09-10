import React, {Component} from 'react';

import 'semantic-ui-css/semantic.min.css';
import {Router} from "react-router-dom";
import {Segment} from 'semantic-ui-react';
import {History} from "./common";
import {
	Loader,
	Header,
	Routes,
	Footer,
} from './component/';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
	render() {
		return (
			<Router history={History.history}>
				<ErrorBoundary>
					<Loader>
						<Segment style={{marginTop: 0, paddingTop: '50px', border: 'none', boxShadow: 'none'}}>
							<Header/>
							<Routes/>
							<Footer/>
						</Segment>
					</Loader>
				</ErrorBoundary>
			</Router>
		);
	}
}

export default App;
