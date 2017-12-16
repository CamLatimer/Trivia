import React from 'react';

export default function Header(props){
  return (
    <header>
      <p className="header__greet">hello, {props.email}</p>

      <p className="header__accuracy">Accuracy: {props.score}%
        <a className="saveWide" onClick={props.save}  href="">Save</a></p>
      <div className="header__btnWrapper">
          <p className="header__btn saveSmall">
            <a onClick={props.save}  href="">Save</a>
          </p>
          <p className="header__btn">
            <a onClick={props.logOut}  href="">Log Out</a>
          </p>
      </div>
    </header>
  )
}
