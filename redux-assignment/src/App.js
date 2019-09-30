import React, { Component } from 'react';
import './App.css';
import Persons from './Container/Persons/Persons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Persons />
      </div>
    );
  }
}

export default App;
