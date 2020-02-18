import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header.js';
import Landing from './Landing.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container h-100">
          <Header />
          <Route component={Landing} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
