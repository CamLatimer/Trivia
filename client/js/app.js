import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsContainer from './QuestionsContainer';
import TimerContainer from './Timer';
import Score from './Score';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      numAnswered: 0,
      numCorrect: 0
    };
    this.calcScore = this.calcScore.bind(this);

  }

  // count the amount of questions answered and get a percentage of
  // which selections match the correct answer.
  // use it as a callback in the Question component.
  // takes the , num, and uses it to calculate percentage
  calcScore(isCorrect){

    if(isCorrect){
      this.setState((prevState) => ({
        numAnswered: prevState.numAnswered + 1,
        numCorrect: prevState.numCorrect + 1,
      }))
    } else {
      this.setState((prevState) => ({
        numAnswered: prevState.numAnswered + 1,
        numCorrect: prevState.numCorrect,
      }))
    }
  }

  render(){
    let score = ((this.state.numCorrect / this.state.numAnswered) * 100).toFixed(2);
  return (
    <div>
      <TimerContainer />
      <Score score={this.state.numAnswered === 0? 0 : score}/>
      <QuestionsContainer calcScore={this.calcScore} />
    </div>
    )
  }
}
