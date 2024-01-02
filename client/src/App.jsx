import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Chatpage from './pages/Chatpage.jsx';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component = {Homepage} />
          <Route path="/chat"  component = {Chatpage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
