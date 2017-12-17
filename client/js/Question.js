import React from 'react';

// this component shows the trivia question data
export default class Question extends React.Component {

      constructor(props){
        super(props);
        this.state = {};
        this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
        this.cleanEntities = this.cleanEntities.bind(this);
      }

      // run when a trivia answer is selected.
      // enable radio buttons and update the state with the correct answer.
      // when selection is made, state gets updated with correct answer.
      // updating the state with the correct answer signals that a selection has been made.
      // if state is updated with correct answer, disable the radio buttons.
      // (todo: come up with a way to make that less complex?)
      handleAnswerSelection(e){
        if(this.state.correctAnswer === this.props.correctAnswer){
          e.preventDefault();
          e.target.focus = false;
        } else {
          this.setState(() => ({
            correctAnswer: this.props.correctAnswer
          }))
          // check to see if selected answer is same as correct answer
          if(e.target.value === this.props.correctAnswer){
            this.props.calcScore(true);
          } else {
            this.props.calcScore(false);
          }
        }
      }

      componentDidMount(){

      }

      // had to set innerHTML in order to clear out html entities that
      // that come back with api data
      cleanEntities(text){
        let cleanText = text;
        return {__html: cleanText};
      }

      render(){
        let correctAnswer = null;
        // conditonal is a way to check if an answer has been selected
        if(this.state.correctAnswer === this.props.correctAnswer){
          correctAnswer = <div className="correctAnswer" dangerouslySetInnerHTML={this.cleanEntities(this.state.correctAnswer)}></div>
        } else {
          correctAnswer = null;
        }
        // map the answer options out into radio buttons
        let answersArray = this.props.answersArray.map((answer, index) => {
          return (

              <div className="answer" key={index}>
                <label>
                <input
                  className="answer__input"
                  onClick={this.handleAnswerSelection}
                  type="radio" name={`answer${this.props.answerIndex}`} value={answer}
                  />
                  <span className="answer__text" dangerouslySetInnerHTML={this.cleanEntities(answer)}></span>
                  </label>
              </div>
          );
        });

        return(
          <div className="Question">
            <p dangerouslySetInnerHTML={this.cleanEntities(this.props.question)}></p>
            <div className="Question__answers">
              {answersArray}
              {correctAnswer}
            </div>
          </div>
        );
      }

    }
