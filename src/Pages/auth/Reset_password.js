import axios from "axios";
import React, { Component } from "react";
import {MdEmail} from 'react-icons/md';

class Reset_Password extends Component {
    constructor(props){
        super(props);
        this.state={
            email: "",
            issent:false,
            opacity:"",

        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value });
      }
    


    Reset=(e)=>{
        this.setState({opacity:"opacity-2"})
      
        e.preventDefault();
        const user = {
            email: this.state.email.charAt(0).toUpperCase() + this.state.email.slice(1),
        }
        console.log(user.email)
        axios
        .post("https://backendpapouf.herokuapp.com/api/user/request-reset-email/",user,{
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
            
          },
          
        })
        .then((res)=>{
            this.setState({issent:!this.state.issent})
    
           
            
        })
       
}
    render(){
    const{opacity}=this.state
      if (!this.state.issent){
        return(
         <div className="main0 ">
            <div className="Auth-container0 ">        
                    <div className=" Reset-password d-flex justify-content-center  ">
                        <form className="mt-5" action="#" onSubmit={this.Reset} >
                                <h2 className="">Reset Password</h2>
                                <input className="mt-3  " type="email" placeholder="Enter your email " onChange={this.onChange} name="email"  required />
                                <button  className={`mt-4 ${opacity}`} type="submit">Continue</button>
                                <button className={`swap btn-null mt-3 `} type="reset" ><a href="/sign-up">Already have an account ?</a></button>
                        </form> 
                    </div>
                </div>
         </div>
        )}
      return(
          <div>
            <div className=" main0 spad ">
                <div className="d-flex justify-content-center ">
                   
                    <div className="rest-password  ">
                        <h2>Reset Password</h2>
                        <div className="msg-rest-password">
                          <MdEmail/>
                        </div>
                        <div className="shadow "></div>
                        <p className="message ">Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.</p>
                    </div>
                </div>
            
            </div>
          </div>
      )  
    }
}

export default Reset_Password