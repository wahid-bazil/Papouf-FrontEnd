
import React, { Component } from "react";
import axiosInstance from '../Pages/auth/axios'
import Spinner from 'react-bootstrap/Spinner';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles";
import { AiOutlineSend } from "react-icons/ai";
import { IconContext } from "react-icons";
import { BiArrowBack } from "react-icons/bi";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }





    /*   test = () => {
           axiosInstance.put(`api/customization/1`,
               {
                   "boxe": 2,
                   "arts": [1, 2, 3]
               })
               .then((res) => {
                   console.log(res.data)
               })
   
       }*/



    componentDidMount() {


    }
    render() {
        return (
            <div className="chat ">
                <div className="header_sidebare mt-3">
                    <div className="row">
                        <div className="col-2 ">
                            <button className="btn1 " onClick={this.props.close}> <BiArrowBack /></button>
                        </div>
                        <div className="col-9 d-flex justify-content-center align-items-center"> <h3>Your Chat</h3></div>
                    </div>
                </div>
                <hr/>
                <div className="chat-box">
                    <div className="chat-msg">
                        <div className="me d-flex justify-content-end ">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                        </div>
                        <div className="u">
                            Contrary to popular belief, Lorem Ipsum

                        </div>
                    </div>
                    <div className="chat-input">
                        <input />
                        <button className="btn0">
                            <IconContext.Provider value={{ color: "burlywood" }}>
                                <i className="icon-medium">
                                    <AiOutlineSend />
                                </i>
                            </IconContext.Provider></button>
                    </div>
                </div>
            </div>
        )
    }

}
export default Chat