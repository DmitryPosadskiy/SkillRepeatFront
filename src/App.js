import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Segment } from 'semantic-ui-react';
import Center from './component/Center';
import Footer from './component/Footer';
import ErrorBoundary from './ErrorBoundary';
import Loader from "./component/Loader";

class App extends Component {
  render() {
    return (
	    <ErrorBoundary>
		    <Loader>
					<Segment style={{marginTop: 0, border: 'none'}}>
		        <Center/>
		        <Footer/>
					</Segment>
		    </Loader>
	    </ErrorBoundary>
    );
  }
}

export default App;
