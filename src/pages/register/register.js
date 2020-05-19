import React from 'react';
import firebase from '../../services/firebase';


class Register extends React.Component {

  constructor(props){
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    let auth = firebase.auth();
    let promisse =  auth.createUserWithEmailAndPassword(email,password);
    promisse.catch( e => console.log(e.message) );
  }

  render() {
    return <section className="register-item">
      <form onSubmit={this.handleSubmit}>
        <p> <input type='text' placeholder='Email' name='email' onChange={this.handleInputChange}/> </p>
        <p> <input type='password' placeholder='Password' name='password' onChange={this.handleInputChange}/> </p>
        <p>
          <button className="btn btn-outline-primary">Cadastrar</button>
          <a href="/login" className="btn btn-outline-secondary ml-2">Voltar</a>
        </p>
      </form>
    </section>
  }
}

export default Register;
