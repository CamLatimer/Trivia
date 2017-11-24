import React from 'react';
import axios from 'axios';
import Question from './Question';
import arrayShuffle from 'array-shuffle';

// this component holds the questions and logic for calls to get the questions
// it makes the call to the questions api and passes the returned data down to
// rendered Question components. It also keeps a boolean property in its state
// and passes down a callback as props for the Question component use in order to render its radio buttons unchecked when new questions are passed down.
export default class QuestionsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  // make call to questions api and update the state
  // add correct answer and incorrect answers into a randomized array
  // to be passed down as props
  getQuestions(){
    axios.get('https://opentdb.com/api.php?amount=10')
         .then((res) => {
           console.log(res.data.results);
           let dbQuestions = res.data.results.map((q) => {
             q.incorrect_answers.push(q.correct_answer);
             q.incorrect_answers = arrayShuffle(q.incorrect_answers);
             return q;
           });
           return dbQuestions;
         })
         .then((dbQuestions) => {
           this.setState((prevState)=>({
             questions: prevState.questions.concat(dbQuestions),
           }))
         })
         .catch(error => {
           console.log('error getting and parsing data');
         })
  }

  componentDidMount(){
    this.getQuestions();
  }
  render(){
    const questionEls = this.state.questions.map((q, index) =>{
          return (
            <Question
              key={index}
              answerIndex={index}
              isRadioChecked={this.state.isRadioChecked}
              checkRadio={this.checkRadio}
              question={q.question}
              correctAnswer={q.correct_answer}
              answersArray={q.incorrect_answers}
              answerReady={this.state.answerReady}
              calcScore={this.props.calcScore}
            />
          );
        });
    return (
      <div>
          <div>
              {questionEls}
          </div>
        <button onClick={this.getQuestions}>Get More Questions</button>
      </div>
    );
  }
}
