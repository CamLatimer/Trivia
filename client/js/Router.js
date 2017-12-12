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
      attempts: this.props.attempts,
      correct: this.props.correct,
      accuracy: this.props.accuracy
    };
    this.setLogin = this.setLogin.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // set user info to be passed into the rest of the front end
  setLogin(userEmail, score){
    this.setState({
      loggedIn: true,
      userEmail: userEmail,
      attempts: score.attempts,
      correct: score.correct,
      accuracy: score.accuracy
    })
  }
  // tell server to clear session, then tell front end to clear game and go
  // back to home screen
  logOut(){
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
    // if loggedIn is set, show Game component, else show login home screen
    console.log('are you logged in?', this.state.loggedIn);
    let frontPage;
    if(!this.state.loggedIn){
      frontPage = <Home setLogin={this.setLogin} />;
    } else {
      frontPage = <Game
                      email={this.state.userEmail}
                      logOut={this.logOut}
                      attempts={this.state.attempts}
                      correct={this.state.correct}
                      accuracy={this.state.accuracy}/>
    };
    return (
      <div>
        {frontPage}
      </div>
    );
  }

}
