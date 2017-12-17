import React from 'react';
import Header from './Header';
import QuestionsContainer from './QuestionsContainer';
import axios from 'axios';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      attempts: this.props.attempts,
      correct: this.props.correct,
      accuracy: this.props.accuracy,
      email: this.props.email,
      saveInProgress: false
    };
    this.calcScore = this.calcScore.bind(this);
    this.logOut = this.logOut.bind(this);
    this.save = this.save.bind(this);
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
  logOut(e){
    e.preventDefault();
    this.props.logOut();
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
  return (
    <div className="Game">
      <Header email={this.props.email}
              logOut={this.logOut}
              score={this.state.attempts === 0 ? 0 : this.state.accuracy}
              // set save function conditionally so users don't make ajax calls repeatedly
              save={this.state.saveInProgress === false ? this.save : null}/>
      <QuestionsContainer calcScore={this.calcScore} />
    </div>
    )
  }
}
