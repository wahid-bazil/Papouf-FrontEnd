import axios from "axios";
import React, { Component } from "react";
import { RiCheckFill } from 'react-icons/ri';
import queryString from 'query-string';

class Reset_Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activated: false

        }

    }

    componentDidMount() {
        const token = queryString.parse(this.props.location.search).token
        axios
            .get(`http://backendpapouf.herokuapp.com/api/user/email-verify/?token=${token}`



            )
            .then((res) => {
                this.setState({ activated: true })
            })
    }


    render() {
        if (this.state.activated) {
            return (
                
                <div className=" spad main0 verifivation">
                    <div>
    
                    </div>
                    <div className="d-flex justify-content-center ">
    
                        <div className="success ">
                            <h1 className="">Success !</h1>
                            <div className="msg-rest-password ">
                                <RiCheckFill/>
                            </div>
                            <div className="shadow"></div>
                            <p className="message">Your account is successfully activated.</p>
                            <a href="/sign-up">Log in </a>
                        </div>
                    </div>
                </div>
            )
            
        }
        else{
            return(
            <h3>Ops something is wrong!</h3>)
        }
       



    }
}

export default Reset_Password