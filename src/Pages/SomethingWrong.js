import React, { Component } from "react";
import {BiMessageRoundedError} from 'react-icons/bi';



class SomethingWrong extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
     
    }

    render() {

        return (
            <div className="container ">
                <center className="somethingWrong mt-5 p-5 text-info">
                    Ops Something is wrong <span className="icon"><BiMessageRoundedError/></span>
                </center>
    
            </div>
        )
    }


}

export default SomethingWrong