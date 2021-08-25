
import './App.css';
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Container from "./Pages/Container"
import Container_auth from "./Pages/auth/Container_auth"
import Header from './Pages/header';

import Cookies from 'universal-cookie';

import 'cropperjs/dist/cropper.css';
import axios from 'axios';



class App extends Component {
  constructor() {
    super()
    this.state = {
      file: null,
      loading: false,
      imageDestination: "",
      test: null
    }
  }

  componentDidMount() {
 
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    let device_id=localStorage.getItem('device_id');

    if (device_id == null || device_id == undefined) {
       device_id = uuidv4()
      
      localStorage.setItem('device_id', device_id);
    
    }





  }
 
  onCropperInit(cropper) {
    this.cropper = cropper;
  }
  image = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])

    })


  }
  send = () => {
    let formData = new FormData()
    const data = this.state.imageDestination;
    formData.append('image', data)
    const config = { headers: { "Content-Type": "multipart/form-data", } }
    const URL = 'http://localhost:8000/api/variation/test'
    axios.post(URL, formData, config)




  }
  fileUpload = (canvas) => {
    let data = new FormData();
    canvas.toBlob(function (blob) {
      data.append('data', blob);

      axios
        .post(`http://localhost:8000/api/variation/test`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res)
        });
    });
  }
  _imageDestination = (canvasq) => {
    this.setState({ imageDestination: canvasq })
  }

  render() {
    const { loading } = this.state
    return (



      <div >
  
        <BrowserRouter>
          <Route path={["/Acceuil", "/collections", "/Customization","/Copy-Customization" , "/CustomizationFortniture","/DetailsItem/", "/apdate_info","/order", "/something-wrong"]} component={Container} />
          <Route path={["/Reset_Password", "/delivery","/validation" ,"/sign-up","/LogIn", "/verification", "/payment", "/Change_Password", "/checkout", "/verification"]} component={Container_auth} />
        </BrowserRouter>
      </div>

    )
  }
}

export default App;
