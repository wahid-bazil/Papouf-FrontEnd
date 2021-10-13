import React, { Component } from "react";
import axios from "axios";
import axiosInstance from './axios';

import { AiOutlineMail } from "react-icons/ai";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';

// import { register } from "./UserFunctions";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      // first_name: "",
      // last_name: "",
      email: "",
      password: "",
      name: "",
      second_name: "",
      phone_number: "",
      isSubmitting: false,
      is_email_err: false,
      is_name_err: false,
      is_second_name_err: false,
      is_phone_number_err: false,
      is_password_err: false,
      is_password_login_err: false,
      err_login: null,
      email_login_err: null,
      password_login_err: null

    };
    this.onChange = this.onChange.bind(this);
  }

  handleClick = () => {
    this.props.history.push({
      pathname: './sign-up'
    })
  }

  Login = (e) => {
    this.setState({ isSubmitting: true })
    if (this.state.is_email_login_err) {
      this.setState({ name_login_err: null, is_email_login_err: false })
    }
    if (this.state.is_password_login_err) {
      this.setState({ is_password_login_err: false, password_login_err: null })
    }
    e.preventDefault();
    if (this.state.email.length === 0) {
      setTimeout(() => {
        this.setState({ name_err: 'Champs requis', is_email_err: true, isSubmitting: false })
      }, 200);
    }
    else if (this.state.password.length <= 7) {
      setTimeout(() => {
        this.setState({ password_login_err: 'Veuillez entre au mois 8 caractère', is_password_login_err: true, isSubmitting: false })
      }, 200);
    }
    else {
      const user = {
        email: this.state.email.charAt(0).toUpperCase() + this.state.email.slice(1),
        password: this.state.password
      };
      console.log(user)
      axios
        .post("https://papouf-backend-api.herokuapp.com/api-user/log-in/", user,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem('access_token', res.data.tokens.access);
          localStorage.setItem('refresh_token', res.data.tokens.refresh);

          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token');

          const location = queryString.parse(this.props.location.search).location
          if (location === 'checkout') {
            this.props.history.push("/checkout");
          } else {
            this.props.history.push("/");
          }

        })

        .catch((err) => {
          this.setState({ err_login: err.response.data.detail[0], isSubmitting: false },()=>{
          })
          
        });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email_login_err, password_login_err ,err_login } = this.state
    const { is_email_login_err, is_password_login_err } = this.state
    const { isSubmitting } = this.state


    return (
      <div className="  main0  pt-5">
        <div className="Auth-container" >
          <div className="form-Auth-container sign-in-Auth-container">
            <form action="#" onSubmit={this.Login}>
              <div className="title">Connexion</div>
              <TextField className="input" error={is_email_login_err} helperText={email_login_err} type="email" label="Email" variant="outlined" onChange={this.onChange} name="email" />
              <TextField className="input" error={is_password_login_err} helperText={password_login_err} type="password" label="Mot de passe" variant="outlined" onChange={this.onChange} name="password" />
              {err_login ? (<span className="error p-1">{err_login}</span>) : null}
              <a className="opacity-5 avoid-clicks" href="#">Forgot your password?</a>
              {isSubmitting ? (<CircularProgress />) : <button className="mt-4 btn" type="submit">Connexion</button>}
              <button type="reset" className={`swap btn-null mt-3 `} onClick={this.handleClick}>
                Créer un compte</button>
            </form>
          </div>
          <div className="overlay-Auth-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Papouf</h1>
                <p>From our hands to your soul</p>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Papouf</h1>
                <p>From our hands to your soul</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;