import React from 'react';
import axios from 'axios';
import Question from './Question';
import arrayShuffle from 'array-shuffle';

// this component holds the questions and logic for calls to get the questions
export default class QuestionsContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: []
    };
    this.getRandomQuestions = this.getRandomQuestions.bind(this);
  }

  // make call to questions api
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
           this.setState({
             questions: dbQuestions
           })
         })
         .catch(error => {
           console.log('error getting and parsing data');
         })
  }



  componentDidMount(){
    this.getRandomQuestions();
  }
  render(){
    const qS = this.state.questions.map((q, index) =>{
          return (
            <Question key={index} question={q.question} correctAnswer={q.correct_answer} wrongAnswers={q.incorrect_answers} />
          );
        });
    return (
      <div>
        <button onClick={this.getRandomQuestions}>Get More Questions</button>
        <div>
          {qS}
        </div>
        <button onClick={this.getRandomQuestions}>Get More Questions</button>
      </div>
    );
  }
}
