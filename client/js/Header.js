import React from 'react';

export default function Header(props){
  if(props.loggedIn){
    return (
      <header>
        <p className="header__title--in">Trivially</p>
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
        <h3 className="header__title--out">Trivially</h3>
      </header>
    );
  }

}
