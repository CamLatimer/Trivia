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
      isRadioChecked: false,
    };
    this.getRandomQuestions = this.getRandomQuestions.bind(this);
    this.start = this.start.bind(this);
    this.checkRadio = this.checkRadio.bind(this);
  }

  // enables radio buttons
  checkRadio(e){
    e.target.checked = true;
    if(this.state.isRadioChecked !== null){
      this.setState(() => ({
        isRadioChecked: null
      }))
    }
  }

  // make call to questions api and update the state
  // add correct answer and incorrect answers into a randomized array
  // to be passed down as props
  getRandomQuestions(){
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
           this.setState(()=>({
             questions: dbQuestions,
             isRadioChecked: false,
           }))
         })
         .catch(error => {
           console.log('error getting and parsing data');
         })
  }
  start(){
    this.getRandomQuestions();
  }

  componentDidMount(){
    this.start();
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
            />
          );
        });
    return (
      <div>
        <button onClick={this.start}>Get More Questions</button>
          <div>
              {questionEls}
          </div>
        <button onClick={this.start}>Get More Questions</button>
      </div>
    );
  }
}
