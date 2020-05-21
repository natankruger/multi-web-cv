import React from 'react';
import firebase from '../../services/firebase';

import Alert from '../../components/alert'

class Register extends React.Component {

  constructor(props){
    super();
    this.state = {
      email: '',
      password: '',
      repassword: '',
      error: null,
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  clearError() {
    this.setState({error: null});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { email, password, repassword } = this.state;

    if (password === repassword) {
      let auth = firebase.auth();
      let promisse =  auth.createUserWithEmailAndPassword(email,password);
      promisse.catch( e => this.setState({ error: <Alert alertType="danger"
                                                         message="Usuário ou senha invalidos!"
                                                         closeCallback={ this.clearError.bind(this) }/> }) );
    }
  }

  render() {
    return <section className="register-item d-flex">
      <form onSubmit={this.handleSubmit} className="w-25 ml-auto mr-auto mt-3">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" placeholder="Enter email" name='email' onChange={this.handleInputChange}/>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" placeholder="Password" name='password' onChange={this.handleInputChange}/>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Re-Password</label>
          <input type="password" class="form-control" placeholder="Re-Password" name='repassword' onChange={this.handleInputChange}/>
        </div>

        <div id="alert-list">
          {this.state.error}
        </div>

        <button className="btn btn-outline-primary">Cadastrar</button>
        <a href="/login" className="btn btn-outline-secondary ml-2">Voltar</a>

      </form>
    </section>
  }
}

export default Register;
