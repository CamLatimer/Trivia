import React from 'react';

export default function Header(props){
  if(props.loggedIn){
    return (
      <header>
        <p>Trivially</p>
        <p className="header__greet">hello, {props.email}</p>
        <p className="header__accuracy">
          Accuracy: {props.score}%
          <a className="save saveWide" onClick={props.save}>Save</a>
        </p>
        <div className="header__btnWrapper">
              <a className="save saveSmall" onClick={props.save}>Save</a>
              <a onClick={props.logOut}  href="">Log Out</a>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <h3 style={{alignSelf: 'center', paddingTop:'1.5rem'}}>Trivially</h3>
      </header>
    );
  }

}
