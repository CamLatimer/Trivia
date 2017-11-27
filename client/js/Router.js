import Game from './Game';
import Home from './Home';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


export default function Routes() {
  return (
    <Router>
      <div>
        <li><Link to="/play">Play</Link></li>
        <li><Link to="/">Home</Link></li>
        <Route exact path="/" component={Home}/>
        <Route path="/play" component={Game}/>
      </div>
    </Router>
  );
}
