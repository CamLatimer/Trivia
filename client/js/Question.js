import React from 'react';
import ReactDOM from 'react-dom';

// this component shows the trivia question data
export default class Question extends React.Component {

      constructor(props){
        super(props);
        this.state = {};
        this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
      }

      // run when a trivia answer is selected.
      // enable radio buttons and update the state with the correct answer.
      // when selection is made, state gets updated with correct answer.
      // updating the state with the correct answer signals that a selection has been made.
      // if state is updated with correct answer, disable the radio buttons.
      // (todo: come up with a way to make that less complex?)
      handleAnswerSelection(e){
        this.props.checkRadio(e);
        if(this.state.correctAnswer === this.props.correctAnswer){
          e.preventDefault();
          e.target.disabled = true;
        } else {
          this.setState(() => ({
            correctAnswer: this.props.correctAnswer
          }))
        }
      }

      componentDidMount(){

      }

      render(){
        let correctAnswer = null;
        // conditonal is a way to check if an answer has been selected
        if(this.state.correctAnswer === this.props.correctAnswer){
          correctAnswer = <div>{this.state.correctAnswer}</div>
        } else {
          correctAnswer = null;
        }

        // map the answer options out into radio buttons
        let answersArray = this.props.answersArray.map((answer, index) => {
          return (
            <label key={index}>
              <div>
                <input
                  checked={this.props.isRadioChecked}
                  onClick={this.handleAnswerSelection}
                  type="radio" name={`answer${this.props.answerIndex}`} value={answer} />
              {answer}
              </div>
            </label>
          );
        });

        return(
          <div>
              {this.props.question}
            <div>
              {answersArray}
            </div>
              {correctAnswer}
          </div>
        );
      }

    }
