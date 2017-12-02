import Game from './Game';
import Home from './Home';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';


export default class Routes extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    };
    this.setLogin = this.setLogin.bind(this);
  }

  setLogin(){
    this.setState({
      loggedIn: true
    })
  }

  render(){
    let loggedIn = this.state.loggedIn;
    console.log(this.state.loggedIn);
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            loggedIn ? (
              <Redirect push to="/game"/>
            ) : (
              <Home setLogin={this.setLogin}/>
            )
          )} />
          <Route path="/game" component={Game} />
        </div>
      </Router>
    );
  }

}
