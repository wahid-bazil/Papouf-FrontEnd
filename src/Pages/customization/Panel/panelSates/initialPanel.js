import React, { Component } from "react";
import { CgAddR } from 'react-icons/cg';
import Checkbox from '@material-ui/core/Checkbox';
import { GrAdd } from "react-icons/gr";
import axiosInstance from "../../../auth/axios"



class InitialPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:[]
        }
    }
 
    render() {
        const {handlePanelStates} = this.props
        return (
            <div >
         
  

            </div>
        )
    }
}
export default InitialPanel