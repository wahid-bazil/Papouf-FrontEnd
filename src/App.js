
import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Container from "./Pages/url-container"
import 'cropperjs/dist/cropper.css';
import axios from 'axios';
import LogIn from './Pages/auth/logIn';
import Validation from './Pages/checkout/validation';
import SignUp from './Pages/auth/SignUp';
import Delivery from './Pages/checkout/delivery';
import Payment from './Pages/checkout/payment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import UserContact from './Pages/checkout/contact';



class App extends Component {
  constructor() {
    super()
    this.state = {
      file: null,
      loading: false,
      imageDestination: "",
      test: null,
      isDialogOpen:false
    }
  }

  componentDidMount() {

    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }



    let device_id = localStorage.getItem('device_id');
    if (device_id == null || device_id == undefined) {
      device_id = uuidv4()
      localStorage.setItem('device_id', device_id);

    }
    const data = {
      "device_id": localStorage.getItem('device_id')
    }
    axios
      .post(`https://papouf-backend-api.herokuapp.com/api-user/is_first_load`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if(res.data){
          this.setState({
            isDialogOpen:true
          })
        }
      })
      .catch((res)=>{
      
      })
  }

  render() {
    const { isDialogOpen } = this.state

    return (
     
    
  
      <div >
        
     
        <Dialog
          className="dialog-content"
          fullWidth

          style={{ position: 'fixed', zIndex: 4001, padding: 0, background: "transparent" }}
          open={isDialogOpen}
          fullWidth={true}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogContent>
            <div className="success">
              <h4>Bonjour chez Papouf</h4>
              <div className=" "> Cette version deployé au serveur Heroku  est uniquement destinée aux tests de fonctionnalités, </div>
              <div className=""> ainsi les images téléchargées depuis le serveur amazon s3 peuvent prendre quelques secondes </div>
              <div className="">Les produits, les prix, les articles ... ont été ajoutés aléatoirement    </div>
            </div>
          </DialogContent>
          <DialogActions><button className="btn btn-primary" onClick={() => this.setState({isDialogOpen:false})}>Terminer</button></DialogActions>

        </Dialog>

        <BrowserRouter forceRefresh={true}>
          <Route exact path="/LogIn" component={LogIn} />
          <Route exact path="/validation" component={Validation} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/checkout" component={UserContact} />
          <Route exact path="/delivery" component={Delivery} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path={["/", "/item", "/collections/:type/:category/:filter", "/collections/:type/:category/", '/Customization/Papouf-Boxes', '/Copy-Customization/Papouf-Boxes/:pack_id', '/item/:type/:id', "/order/:id"]} component={Container} />
        </BrowserRouter>

      </div>
      
    )
  }
}

export default App;
