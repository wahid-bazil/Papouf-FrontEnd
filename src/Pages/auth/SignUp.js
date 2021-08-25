import React, { Component } from "react";
import axios from "axios";
import axiosInstance from './axios';

import { AiOutlineMail } from "react-icons/ai";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';
// import { register } from "./UserFunctions";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // first_name: "",
      // last_name: "",
      email: "",
      password: "",
      name: "",
      second_name: "",
      phone_number: "",
      inSignUp: false,
      is_user_created: false,
      isSubmitting: false,
      is_email_err: false,
      is_phone_number_err: false,
      err_signup: null,
      email_err: null,
      name_err: null,
      phone_number_err: null,
      password_err: null,
      is_password_err: false,
      password_err2: null,
      is_password_err2: false,

      inz: false,


    };
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {

  }

  handleClick = () => {
    this.props.history.push({
      pathname: './LogIn'
    })
  }


  SignUp = (e) => {
    this.setState({ isSubmitting: true })
    if (this.state.is_email_err) {
      this.setState({ name_err: null, is_email_err: false })
    }
    if (this.state.is_name_err) {
      this.setState({ is_name_err: false, name_err: null })
    }
    if (this.state.is_second_name_err) {
      this.setState({ is_second_name_err: false, second_name_err: null })
    }
    if (this.state.is_phone_number_err) {
      this.setState({ is_phone_number_err: false, phone_number_err: null })
    }
    if (this.state.is_password_err) {
      this.setState({ is_password_err: false, password_err: null })
    }
    if (this.state.is_password_err2) {
      this.setState({ password_err2: false, is_password_err2: null})
      
    }
    e.preventDefault();
    let phone_number = /^\d+$/.test(this.state.phone_number)
    if (this.state.name.length === 0) {
      setTimeout(() => {
        this.setState({ name_err: 'Champs requis', is_name_err: true, isSubmitting: false })
      }, 200);
    }
    else if (this.state.name.length <= 3) {
      setTimeout(() => {
        this.setState({ name_err: 'Veuillez entre au mois 3 caractère', is_name_err: true, isSubmitting: false })
      }, 200);
    }
    else if (this.state.email.length === 0) {
      setTimeout(() => {
        this.setState({ is_email_err: 'Champs requis', is_email_err: true, isSubmitting: false })
      }, 200);
    }

    else if (!phone_number || this.state.phone_number.length != 10) {
      setTimeout(() => {
        this.setState({ phone_number_err: 'Numéro de Téléphone invalide', is_phone_number_err: true, isSubmitting: false })
      }, 200);
    }
    else if (this.state.password.length <= 7) {
      setTimeout(() => {
        this.setState({ password_err: 'Veuillez entre au mois 8 caractère', is_password_err: true, isSubmitting: false })
      }, 200);
    }
    else if (this.state.password != this.state.password2) {
      setTimeout(() => {
        this.setState({ password_err2: 'les mots de passe saisis ne sont pas identiques', is_password_err2: true, isSubmitting: false })
      }, 200);
    }


    else {
      this.setState({ isSubmitting: true })
      const user = {
        // first_name: this.state.first_name,
        // last_name: this.state.last_name,
        email: this.state.email.charAt(0).toUpperCase() + this.state.email.slice(1),
        password: this.state.password,
        name: this.state.name,
        second_name: this.state.second_name,
        phone_number: this.state.phone_number
      };
      this.register(user)
    }
  }
  register = (newUser) => {

    axios.post("https://papouf-backend-api.herokuapp.com/api/user/create/",
      {
        "email": newUser.email,
        "password": newUser.password,
        "name": newUser.name,
        "second_name": newUser.second_name,
        "phone_number": newUser.phone_number,

      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "deviceid": localStorage.getItem('device_id')
        },
      }
    )
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        const location = queryString.parse(this.props.location.search).location
        if (location === "checkout") {
          this.props.history.push({
            pathname: '/checkout',

          });
        } else {
          this.props.history.push("/Acceuil");
        }

      })

  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name_err, phone_number_err, email_err, password_err, password_err2 } = this.state
    const { is_name_err, is_phone_number_err, is_email_err, is_password_err, is_password_err2 } = this.state
    const { err_signup, isSubmitting } = this.state


    return (
      <div className="  main0  pt-5">
        <div className="Auth-container right-panel-active">
          <div className=" form-Auth-container sign-up-Auth-container ">
            <form action="#" onSubmit={this.SignUp}>
              <div className="title">Inscription</div>
              <TextField className="input" error={is_name_err} helperText={name_err} label="Nom" variant="outlined" onChange={this.onChange} name="name" />
              <TextField className="input" error={is_email_err} helperText={email_err} type="email" label="Email" variant="outlined" onChange={this.onChange} name="email" />
              <TextField className="input" error={is_phone_number_err} helperText={phone_number_err} label="Téléphone" variant="outlined" onChange={this.onChange} name="phone_number" />
              <TextField className="input" error={is_password_err} helperText={password_err} type="password" label="Mot de passe" variant="outlined" onChange={this.onChange} name="password" />
              <TextField className="input" error={is_password_err2} helperText={password_err2} type="password" label="Mot de passe" variant="outlined" onChange={this.onChange} name="password2" />
              {err_signup ? (<span className="error p-1">{err_signup}</span>) : null}
              {isSubmitting ? (<CircularProgress />) : <button className="mt-4 " type="submit">S'inscrire</button>}
              <button className={`swap btn-null mt-3 `} type="reset" onClick={this.handleClick}>
                Vous avez déjà un compte ?</button>
            </form>
          </div>
          <div className="overlay-Auth-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
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

export default SignUp;
