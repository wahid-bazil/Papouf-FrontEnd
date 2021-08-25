import React, { Component } from 'react'


import {RiAccountCircleLine} from 'react-icons/ri';

import axios from "axios";
import axiosInstance from "../Pages/auth/axios"

class change_client_infos extends Component{
    constructor(props){
        super(props);
        this.state={
           
            username:"",
            email:"",
            first_name:"",
            last_name:"",
            phone:"",
            adresse:"",
            opacity:"",


        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
       
        const id = localStorage.getItem("id")
        axiosInstance.get(`api/user/${id}`,{
         
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
        })
       
        .then(res => {
           
          this.setState({
                            username   : res.data.name, 
                            email      :  res.data.email,
                            first_name : res.data.first_name,
                            last_name  : res.data.last_name,
                            phone      : res.data.tele,
                            adresse    : res.data.adresse
                            })     
        })
      

    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    apdate=(e)=>{
      
       
        const id =localStorage.getItem("id")
    
       
        axiosInstance
            .put(`api/user/${id}`,
         
           {
            "id"         : id,
            "name"       : this.state.username, 
            "email"      : this.state.email,
            "first_name" : this.state.first_name,
            "last_name"  : this.state.last_name,
            "tele"       : this.state.phone,
            "adresse"    : this.state.adresse
           }
    
              
            )

    }
    
    render(){
        const{opacity}=this.state
       
        const{username,email,first_name,last_name,phone,adresse}=this.state
       
        return(
            <div>
              
                <div className="  mt-5 mb-5 apdate-form d-flex justify-content-center mt-3 p-4">
                    
                    <form action="#"  onSubmit={this.apdate} className="">
               
                        <div className="row">
                            <i className=" "><RiAccountCircleLine/></i>
                            <h1 className="col-11 g-dark">Personal inforamtions</h1>
                        </div>
                        <div className=" row mt-3  ">
                            <div className="fields d-flex flex-column col-lg-4 col-md-4 col-12 mb-2">
                                <label><b>Eamil</b></label>
                                <input  disabled className="" type="email"  onChange={this.onChange} name="email" title="Must provide a valid email adresee" value={email}  required/>
                            </div>
                            <div className="fields d-flex flex-column offset-lg-4 offset-md-4 col-lg-4 col-md-4 col-12  mb-2">
                                <label><b>Username</b></label>
                                <input className="" type="text"  onChange={this.onChange} name="username" title="Must contains 3 or more characters" pattern="[A-Za-z]{3,}" value={username}  required/>
                            </div>
                        </div>
                        <div className="fields row mt-4 ">
                        <div className="fields d-flex flex-column col-lg-4 col-md-4 col-12 mb-2">
                                <label><b>First Name</b></label>
                                <input className="" type="text" placeholder="First Name" onChange={this.onChange} name="first_name"  title="Must contains 3 or more characters" pattern="[A-Za-z]{3,}" value={first_name}  required/>
                            </div>
                            <div className="fields d-flex flex-column offset-lg-4 offset-md-4 col-lg-4 col-md-4 col-12  mb-2">
                                <label><b>Laste Name</b></label>
                                <input className="" type="text" placeholder="Last Name" onChange={this.onChange} name="last_name"  title="Must contains 3 or more characters" pattern="[A-Za-z]{3,}" value={last_name}  required/>
                            </div>
                        </div>
                        <div className="row  mt-4">
                        <div className="fields d-flex flex-column col-lg-4 col-md-4 col-12 mb-2">
                                <label><b>Phone</b></label>
                                <input className="" type="text" placeholder="Phone" onChange={this.onChange} name="phone" title="Must provide a valid phone number"  pattern="(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}" value={phone}  required/>
                        </div>
                        <div className="fields d-flex flex-column offset-lg-4 offset-md-4 col-lg-4 col-md-4 col-12  mb-2">
                                <label><b>Adresse</b></label>
                                <input className="" type="text" placeholder="Adresse" onChange={this.onChange} name="adresse"  title="Must contains 4 or more characters" pattern="[A-Za-z]{4,}" value={adresse}  required/>
                        </div>

                        </div>
                        <button className={`mt-4 ${opacity}`} type="submit">Submit</button>

                    
                  
                
               
              
                  
                
             
                  
                 
                </form>
                
                

                </div>

              </div>
            
        )
    }

}

export default change_client_infos 