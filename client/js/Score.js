import React from 'react';
import ReactDOM from 'react-dom';

export default function Score(props){
  return (
    <div>
      <h3>Score: {props.score}% of answers attempted</h3>
    </div>
  )
}
