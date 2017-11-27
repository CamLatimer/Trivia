import React from 'react';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e){
    let name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
  }
  render(){
    console.log(this.state);
    let isReady = true;
    if(this.state.email.length && this.state.password.length){
      isReady = false;
    }
    return (
      <div>
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
          <button onClick={this.handleSubmit} disabled={isReady}>Submit</button>
        </form>
      </div>
    );
  }

}
