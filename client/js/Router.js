import Game from './Game';
import Home from './Home';
import axios from 'axios';
import React from 'react';


export default class Routes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      userEmail: this.props.email,
    };
    this.setLogin = this.setLogin.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  setLogin(userEmail){
    // set user info to be passed into the rest of the front end
    this.setState({
      loggedIn: true,
      userEmail: userEmail
    })
  }
  logOut(){
    // tell server to clear session, then tell front end to clear game and go
    // back to home screen
    axios.put('http://localhost:3000/logout')
    .then((res) => {
      console.log(res);
      this.setState({
        loggedIn: res.data.loggedIn
      })
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render(){
    // login to the game if there is a session id set in backend
    console.log('are you logged in?', this.state.loggedIn);
    let frontPage;
    if(!this.state.loggedIn){
      frontPage = <Home setLogin={this.setLogin} />;
    } else {
      frontPage = <Game email={this.state.userEmail} logOut={this.logOut} />
    };
    return (
      <div>
        {frontPage}
      </div>
    );
  }

}
