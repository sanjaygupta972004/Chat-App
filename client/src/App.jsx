import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Chatpage from './pages/Chatpage.jsx';

import { image } from './assets/bgcImage.js';

function App() {
  return (
  
    <div className= "bg-center bg-cover flex min-h-[100vh]" style={{backgroundImage: ` url(${image.url3})`}}>
      <Router>
        <Switch>
          <Route path="/" exact component = {Homepage} />
          <Route path="/chat"  component = {Chatpage} />
        </Switch>
      </Router>
      </div>
  );
}

export default App;
