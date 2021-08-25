import React, { Component } from "react";
import queryString from 'query-string';
import axios from "axios";
import { RiCheckFill } from 'react-icons/ri';
class change_password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password1: "",
            password2: "",
            token_valid: true,
            token: "",
            uidb64: "",
            password_changed: false,
            opacity: "",


        }
        this.onChange = this.onChange.bind(this);

    }
    componentDidMount() {

        const token = queryString.parse(this.props.location.search).token
        const uidb64 = queryString.parse(this.props.location.search).uidb64
        this.setState({ token: token })
        this.setState({ uidb64: uidb64 })
        axios
            .get(`https://backendpapouf.herokuapp.com/api/user/password-reset/${uidb64}/${token}/`


            )

            .catch((res) => {
                console.log(res.data)
                this.setState({ token_valid: !this.state.token_valid })

            })




    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    Reset = (e) => {
        this.setState({ opacity: "opacity-2" })
        e.preventDefault();
        if (this.state.password1 === this.state.password2) {
            const password = {
                "password": this.state.password1,
                "token": this.state.token,
                "uidb64": this.state.uidb64

            }

            axios
                .post(`https://backendpapouf.herokuapp.com/api/user/password-reset-complete/`, password, {

                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        // "Access-Control-Allow-Origin": "*",

                    },
                })
                .then((res) => {
                    this.setState({ password_changed: true })
                })
        }
        else {
            console.log("none")
        }



    }
    render() {
        const { opacity } = this.state

        if (this.state.token_valid) {

            if (!this.state.password_changed) {
                return (
                    <div className="main0 ">
                        <div className="Auth-container0 ">
                            <div className=" Reset-password d-flex justify-content-center  ">
                                <form className="mt-5" onSubmit={this.Reset}  >
                                    <h2 className="">Reset Password</h2>
                                    <input className="mt-3  " type="password" placeholder="Enter your new password   " onChange={this.onChange} name="password1" required />
                                    <input className="mt-3  " type="password" placeholder="Enter your new password  " onChange={this.onChange} name="password2" required />
                                    <button className={`mt-4 ${opacity}`} type="submit">Continue</button>
                                    <button className={`swap btn-null mt-3 `} type="reset" ><a href="/sign-up">Already have an account ?</a></button>

                                </form>


                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className=" spad main0 verifivation">
                    <div>

                    </div>
                    <div className="d-flex justify-content-center ">

                        <div className="success ">
                            <h1 className="">Success !</h1>
                            <div className="msg-rest-password ">
                                <RiCheckFill />
                            </div>
                            <div className="shadow"></div>
                            <p className="message">Your password has successfully been changed.</p>
                            <a href="/sign-up">Log in </a>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <h1>
                Ops something is wrong
            </h1>
        )
    }



}
export default change_password;