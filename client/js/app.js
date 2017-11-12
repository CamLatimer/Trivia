import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsContainer from './QuestionsContainer';
import TimerContainer from './Timer';

export default class App extends React.Component {
  render(){
  return (
    <div>
      <TimerContainer />
      <QuestionsContainer />
    </div>
    )
  }
}
