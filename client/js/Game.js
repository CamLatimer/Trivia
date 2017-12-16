import React from 'react';
import Header from './Header';
import QuestionsContainer from './QuestionsContainer';
import axios from 'axios';
import Score from './Score';

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      attempts: this.props.attempts,
      correct: this.props.correct,
      accuracy: this.props.accuracy,
      email: this.props.email
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
  save(e){
    console.log(this.state);
    e.preventDefault();
    axios.put('http://localhost:3000/accuracyUpdate', this.state)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  render(){
  return (
    <div>
      <Header email={this.props.email}
              logOut={this.logOut}
              score={this.state.attempts === 0 ? 0 : this.state.accuracy}
              save={this.save}/>
      <QuestionsContainer calcScore={this.calcScore} />
    </div>
    )
  }
}
