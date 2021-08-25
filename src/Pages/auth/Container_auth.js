import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Address from "../payment";
import verify_email from "./verify_email";
import change_password from "./change-password";
import Reset_Password from "./Reset_password";
import SignUp from "./SignUp";
import Delivery from "../checkout/delivery";
import Payment from "../checkout/payment"
import Validation from "../checkout/validation";
import LogIn from "./logIn";


class Container_auth extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div>
                <BrowserRouter forceRefresh={true}>
                    <Route exact path="/LogIn" component={LogIn}/>
                    <Route exact path="/validation" component={Validation} />
                    <Route exact path="/Reset_Password" component={Reset_Password} />
                    <Route exact path="/sign-up" component={SignUp} />
                    <Route exact path="/verification" component={verify_email} />
                    <Route exact path="/Change_Password" component={change_password} />
                    <Route exact path="/checkout" component={Address} />
                    <Route exact path="/delivery" component={Delivery} />
                    <Route exact path="/payment" component={Payment} />
                    
       
         </BrowserRouter>
        

            </div>
        )
    }
}
export default Container_auth