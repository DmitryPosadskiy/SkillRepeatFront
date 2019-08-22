import React, { Component } from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react';
import Center from './component/Center';
import Footer from './component/Footer';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  render() {
    return (
	    <ErrorBoundary>
      <Container style={{paddingTop: 14}}>
        <Center />
        <Footer/>
      </Container>
	    </ErrorBoundary>
    );
  }
}

export default App;
