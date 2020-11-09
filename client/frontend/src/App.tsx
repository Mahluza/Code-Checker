import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './modules/HomePage/HomePage'
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Switch>
          <Route path="/home" component={HomePage} exact />
        </Switch>
        
      </header>
    </div>
  );
}

export default App;
