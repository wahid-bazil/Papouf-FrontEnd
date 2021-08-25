import React, { Component } from "react";

import {FaRegWindowClose} from 'react-icons/fa';
import {CgAddR} from 'react-icons/cg';
import axiosInstance from './auth/axios'


class Boxes extends Component{
    constructor(props){
        super(props);
        this.state={
            boxes:[],
            is_loading:false
        }
    }
    componentDidMount(){
        this.setState({is_loading:true},() =>{
            axiosInstance.get(`api/variation/boxes`)
            .then(res => {
                this.setState({boxes:res.data} ,()=>{
                    this.setState({is_loading:false})
    
                })     
            })
        }) 
      }
      swap=(e,boxe)=>{
        this.props.handlechange_boxe(boxe)
        this.props.closse(e)

      }
    render(){
        const {boxes,is_loading}=this.state
       
 

        return(
            <div className="Boxes col-sm-12  col-md-5 col-lg-4 ">
                
                <div className="d-flex justify-content-between mt-2">
                    <div>
                        <h3>Boxes</h3>
                    </div>
                    <button title="box" className="btn1" onClick={this.props.closse}><FaRegWindowClose/></button>
                </div>
                <div className="mt-3">
                    <div className="container">
                        <div className="row">
               
                                {!is_loading?(boxes.map(boxe=>(
                                        <div key={boxe.id} className="boxes boxe-img col-4 p-3">
                                             <img alt=""  src={boxe.img}/>
                                             <div className="middle">
                                                <button className="btn0" title="box" onClick={(e)=>this.swap(e,boxe)} ><CgAddR/></button>
                                            </div>
                                        </div>
                                    ))):<div className="loader"></div>

                                }


                        </div>
                    </div>
                        
                       
                </div>
                
            </div>
        )
    }
}
export default Boxes

