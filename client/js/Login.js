import React from 'react';
import axios from 'axios';
import validator from 'email-validator';


class GameForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitData = this.submitData.bind(this);
  }
  handleInput(e){
    let name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }
  submitData(e){
    e.preventDefault();
    if(validator.validate(this.state.email) === true){
      this.props.handleSubmit(e, this.state.email, this.state.password);
    } else {
      alert('Email not valid. Please try again.')
    }
  }

  render(){
    let isReady = true;
    if(this.state.email.length && this.state.password.length){
      isReady = false;
    }
    return (
      <form className="GameForm">
        <h1 className="GameForm__header">{this.props.formHeader}</h1>
        <div className="GameForm__inputWrapper">
          <label className="GameForm__label">
            email:
          </label>
            <input className="GameForm__input"
              type="text"
              name="email"
              placeholder="email"
              onChange={this.handleInput}/>
              <label>
                password:
              </label>
            <input className="GameForm__input"
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleInput}/>
        </div>
        <button onClick={this.submitData} disabled={isReady}>Submit</button>
      </form>
    );
  }
}

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.sendRegister = this.sendRegister.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }
  sendRegister(e, email, password){
    axios.post('http://localhost:3000/register', {
      email: email,
      password: password
    })
    .then((res) => {
      if(res.status === 200){
        this.props.setLogin(res.data.email, res.data.score);
      }
    })
    .catch((error) => {
      console.log(error.messeage);
    });
  }
  sendLogin(e, email, password){
    axios.put('http://localhost:3000/login', {
      email: email,
      password: password
    })
    .then((res) => {
      console.log(res);
      if(res.status === 200){
        // set user info into the game via callback from Router.js
        this.props.setLogin(res.data.email, res.data.score);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render(){
    return(
      <div className="auth">
        <GameForm
          formHeader={'Register: '} handleSubmit={this.sendRegister} />
        <GameForm
          formHeader={'Login: '} handleSubmit={this.sendLogin} />
      </div>
    );
  }
}
