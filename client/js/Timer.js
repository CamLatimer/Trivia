import React from 'react';
import ReactDOM from 'react-dom';

// presenation component for the timer
function Timer(props) {
  let min = props.min;
  let sec = props.sec;
    return (
      <div>
        <span>{min}</span>
        <span>:</span>
        <span>{sec}</span>
      </div>
    );
}

// container component for the time logic
export default class TimerContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      min: '01',
      sec: '00',
      didTimerStart: false
    };
    this.timer = this.timer.bind(this);
    this.timerId;
  };

  timer(){
    this.setState({didTimerStart: true});
    let start = Date.now();

    // setup a countdown timer
    let countdown = () =>{

      // get the number of seconds that have elapsed since
      // startTimer() was called
      let diff = (60 * 1) - (((Date.now() - start) / 1000) | 0);

      // set the state with how many min and sec are left
      let min = (diff / 60) | 0;
      let sec = (diff % 60) | 0;
      this.setState({
        min: min < 10 ? "0" + min : min,
        sec: sec < 10 ? "0" + sec : sec
      })

    }
    // run the timer every second
    this.timerId = setInterval(countdown, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerId);
  }

  render(){
    // clear the countdown and show 'done' when the timer reaches 0
    let timerText;
    if(parseInt(this.state.min) === 0 && parseInt(this.state.sec) === 0){
      clearInterval(this.timerId);
      timerText = <div><h2>Done</h2></div>;
    } else {
      timerText = 'Time Left: '
    }

    return(
      <div>
        <button disabled={this.state.didTimerStart ? 'disabled' : ''} onClick={this.timer}>Start</button>
        <div>
          {timerText}<Timer min={this.state.min} sec={this.state.sec} />
      </div>
      </div>
    )
  }

}
