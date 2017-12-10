import React from 'react';
import axios from 'axios';


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
    this.props.handleSubmit(e, this.state.email, this.state.password);
  }

  render(){
    let isReady = true;
    if(this.state.email.length && this.state.password.length){
      isReady = false;
    }
    return (
      <div>
        <p>{this.props.formHeader}</p>
        <form>
          <div>
            <label>
              email:
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={this.handleInput}/>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="text"
                name="password"
                placeholder="password"
                onChange={this.handleInput}/>
            </label>
          </div>
          <button onClick={this.submitData} disabled={isReady}>Submit</button>
        </form>
      </div>
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
        this.props.setLogin(res.data.email);
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
        this.props.setLogin(res.data.email);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render(){
    return(
      <div>
        <GameForm
          formHeader={'Register: '} handleSubmit={this.sendRegister} />
        <GameForm
          formHeader={'Login: '} handleSubmit={this.sendLogin} />
      </div>
    );
  }
}
