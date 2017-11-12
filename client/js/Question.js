import React from 'react';
import ReactDOM from 'react-dom';

export default class Question extends React.Component {

      constructor(props){
        super(props);
        this.state = {
          wasAnswerSubmitted: false
        }
        this.showCorrectAnswer = this.showCorrectAnswer.bind(this);
      }

      showCorrectAnswer(e){
        e.preventDefault();
        console.log(this.props.correctAnswer);
        this.setState({
          wasAnswerSubmitted: true
        })
      }

      render(){
        let correctAnswer = null;
        if(this.state.wasAnswerSubmitted){
          correctAnswer = <div>{this.props.correctAnswer}</div>
        } else {
          correctAnswer = null;
        }
        let wrongAnswers = this.props.wrongAnswers.map((answer, index) => {
          return (
            <label key={index}>
              <div>
                <input type="radio" name="answer" value="answer" />
              {answer}
              </div>
            </label>
          );
        });

        return(
          <form>
            {this.props.question}
            <div>
              {wrongAnswers}
             </div>
             {correctAnswer}
             <button onClick={this.showCorrectAnswer}>SubmitAnswer</button>
          </form>
        );
      }

    }
