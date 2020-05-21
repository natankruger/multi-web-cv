import React from 'react';
import firebase from '../../services/firebase';

import Alert from '../../components/alert';

class Login extends React.Component {
  constructor(props){
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  alert = (alertType, message) => {
    return <div className={`alert alert-${ alertType } alert-dismissible`}>
      <span className="close pt-2" aria-label="close" onClick={ () => this.setState({error: null}) }>&times;</span>
      { message }
    </div>
  }

  clearError() {
    this.setState({error: null});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { email, password } = this.state;
    let auth = firebase.auth();
    auth.signInWithEmailAndPassword(email,password).then(obj =>{
      console.log(obj);
    }).catch( e => {
      this.setState({error: <Alert alertType="danger"
                                   message="Usuário ou senha invalidos!"
                                   closeCallback={ this.clearError.bind(this) } /> });
    });
  }

  render() {
    return <section className="d-flex">
      <form onSubmit={this.handleSubmit} className="w-25 ml-auto mr-auto mt-3">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input type="email" className={`form-control ${ this.state.error ? "alert-danger" : "" }`} placeholder="Enter email" name='email' onChange={this.handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className={`form-control ${ this.state.error ? "alert-danger" : "" }`} placeholder="Password" name='password' onChange={this.handleInputChange}/>
        </div>

        <div id="alert-list">
          {this.state.error}
        </div>

        <button className="btn btn-outline-primary">Login</button>
        <a href="/register" className="btn btn-outline-secondary ml-2">Registrar</a>
      </form>
    </section>
  }
}

export default Login;
