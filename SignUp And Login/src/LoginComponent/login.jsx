import React, { Component } from 'react'
import alertify from 'alertifyjs'


const emailRegExp = RegExp(/^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const formValid = formError => {
  let valid = true;
  Object.values(formError).forEach(val => {
    val.length > 0 && (valid = false)
  });
  return valid;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formError: {
        email: "",
        password: ""
      }
    }
  }



  handleChange = (e) => {
  const { name, value } = e.target;
  
  // Use destructuring to get formError from state
  const { formError } = this.state;
  
  // Create a copy of formError to avoid mutating the state directly
  const updatedFormError = { ...formError };

  // Update formError based on the field name
  switch (name) {
    case "email":
      updatedFormError.email = emailRegExp.test(value) ? '' : 'Invalid email address';
      break;
    case "password":
      updatedFormError.password = value.length < 3 ? 'Minimum 3 characters required' : '';
      break;
    default:
      break;
  }

  // Use a single setState call to update both the value and formError
  this.setState({ [name]: value, formError: updatedFormError }, () => console.log(this.state));
};

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email.value === '') {
      alertify.error('Login Error');
    } else if (this.state.password.value === '') {
      alertify.error('Login Error');
    }
    let result = JSON.parse(localStorage.getItem('SignUp'))
    console.log(this.state.email)
    console.log(result.email)
    if (result.email === this.state.email && result.password === this.state.password) {
      alertify.success('Login Successfully');
      setTimeout(() => {
        this.props.history.push('/home')
      }, 2000);
    }
    else {
      console.error('invalid')
      alertify.error('Login Error');
    }
  };

  render() {
    return (<div className="wrapper">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={this.state.email}
              placeholder="Email"
              name="email"
              noValidate
            ></input>
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              noValidate
            ></input>
          </div>
          <div className="createAccount">
            <button type="submit">Submit</button>
          </div>
          <p className='AlreadySignup'>Create Account?<a href="/login"> Signup</a></p>
        </form>
      </div>
    </div>)
  }
}

export default Login
