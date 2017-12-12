import React from 'react';
import ReactDOM from 'react-dom';

export default function Score(props){
  return (
    <div>
      <h3>Accuracy: {props.score}%</h3>
    </div>
  )
}
