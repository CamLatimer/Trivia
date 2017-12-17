import Login from './Login';
import Header from './Header';
import QuestionsContainer from './QuestionsContainer';
import axios from 'axios';
import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      email: this.props.email,
      attempts: this.props.attempts,
      correct: this.props.correct,
      accuracy: this.props.accuracy,
      saveInProgress: false
    };
    this.setLogin = this.setLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.save = this.save.bind(this);
  }

  // set user info to be passed into the rest of the front end
  setLogin(email, score){
    this.setState({
      loggedIn: true,
      email: email,
      attempts: score.attempts,
      correct: score.correct,
      accuracy: score.accuracy
    })
  }
  // tell server to clear session, then tell front end to clear game and go
  // back to home screen
  logOut(e){
    e.preventDefault();
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

  // calcScore()
  // count the amount of questions answered and get a percentage of
  // which selections match the correct answer.
  // use it as a callback in the Question component.
  // takes the , num, and uses it to calculate percentage
  calcScore(isCorrect){
    if(isCorrect){
      this.setState((prevState) => ({
        attempts: prevState.attempts + 1,
        correct: prevState.correct + 1,
        accuracy: (((prevState.correct + 1) / (prevState.attempts + 1)) * 100).toFixed(2)
      }))
    } else {
      this.setState((prevState) => ({
        attempts: prevState.attempts + 1,
        correct: prevState.correct,
        accuracy: ((prevState.correct / (prevState.attempts + 1)) * 100).toFixed(2)
      }))
    }
  }

  // tell server to update user's stats
  // show that saving is in progress and show that updated stats were saved
  save(e){
    e.preventDefault();

    // show saving in progress
    this.setState({
      saveInProgress: true
    })
    console.log('saving');
    let saveBtn = e.target;
    saveBtn.innerHTML = 'Saving...'
    saveBtn.style.color = 'lightGrey';

    axios.put('http://localhost:3000/accuracyUpdate', this.state)
    .then((res) => {
      // show that data has been saved after res from server is good
      setTimeout(() => {
        saveBtn.innerHTML = 'SAVED!';
        saveBtn.style.color = 'aquamarine';
      }, 1000);
      setTimeout(() => {
        saveBtn.innerHTML = 'Save';
        saveBtn.style.color = '#9b4dca';
        this.setState({
          saveInProgress: false
        });
        console.log('saved');
      }, 2000);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  render(){
    // if loggedIn is set, show Game component, else show login home screen
    console.log('are you logged in?', this.state.loggedIn);
    let frontPage;
    if(!this.state.loggedIn){
      frontPage = <Login setLogin={this.setLogin} />;
    } else {
      frontPage = <QuestionsContainer calcScore={this.calcScore} />;
    };
    return (
      <div>
        <Header loggedIn={this.state.loggedIn}
                email={this.state.email}
                logOut={this.logOut}
                score={this.state.attempts === 0 ? 0 : this.state.accuracy}
                // set save function conditionally so users don't make ajax calls repeatedly
                save={this.state.saveInProgress === false ? this.save : null}/>
        {frontPage}
      </div>
    );
  }

}
