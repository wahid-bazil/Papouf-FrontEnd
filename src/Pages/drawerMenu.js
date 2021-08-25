import React, { Component } from "react";
import { FaRegWindowClose } from 'react-icons/fa';

import { GrNext } from "react-icons/gr";

import axios from "axios";
import axiosInstance from "../Pages/auth/axios"
import { FaUserEdit } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { AiOutlineEdit } from "react-icons/ai"
import { FaRegUserCircle } from "react-icons/fa"
import { MdPhone } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"
import { FaShippingFast } from "react-icons/fa"
import { BsInboxesFill } from "react-icons/bs"
import { IoIosChatboxes } from "react-icons/io"
import { IconContext } from "react-icons";

import { FiSave } from "react-icons/fi"
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import DrawerMenuChild from "./DrawerMenuChild";
import { CgClose } from "react-icons/cg"

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_email: "",
      name: "",
      phone_number: "",
      edit_name: false,
      edit_phone: false,
      phone_number_err: null,
      is_phone_number_err: false,
      papoufBoxes: [
        {
          "id": 3,
          "title": "Atay-Box",
          "label": "Atay Box",
          "children": []
        },
        {
          "id": 11,
          "title": "Relaxing-Box",
          "label": "Relaxing Box",
          "children": []
        },
        {
          "id": 4,
          "title": "Café-Box",
          "label": "Café Box",
          "children": []
        },
        {
          "id": 5,
          "title": "Candies-Box",
          "label": "Candies Box",
          "children": []
        },
        {
          "id": 6,
          "title": "Candles-Box",
          "label": "Candles Box",
          "children": []
        },
        {
          "id": 7,
          "title": "Beauty-Box",
          "label": "Beauty Box",
          "children": [
            {
              "id": 8,
              "title": "Hamam-Box",
              "label": "Hamam Box",
              "children": []
            },
            {
              "id": 9,
              "title": "Aaroussa-box",
              "label": "Aaroussa box",
              "children": []
            }
          ]
        },
        {
          "id": 10,
          "title": "Special-Gift-Box",
          "label": "Special Gift Box",
          "children": []
        },
        {
          "id": 12,
          "title": "Picnic-Box",
          "label": "Picnic Box",
          "children": []
        },
        {
          "id": 13,
          "title": "Love-Box",
          "label": "Love Box",
          "children": []
        }
      ],
      papoufFurnitures: [
        {
          "id": 14,
          "title": "category1",
          "label": "category1",
          "children": [],
          "type": "pack"
        },
        {
          "id": 15,
          "title": "category2",
          "label": "category2",
          "children": [],
          "type": "pack"
        },
        {
          "id": 16,
          "title": "category4",
          "label": "category4",
          "children": [],
          "type": "pack"
        },
        {
          "id": 18,
          "title": "category5",
          "label": "category5",
          "children": [],
          "type": "pack"
        },
        {
          "id": 19,
          "title": "category6",
          "label": "category6",
          "children": [],
          "type": "pack"
        },
        {
          "id": 20,
          "title": "category7",
          "label": "category7",
          "children": [],
          "type": "pack"
        }
      ],

      isDrawerOpen: false
    }
    this.onChange = this.onChange.bind(this);

  }



  componentDidMount() {
    if (this.props.isLoged) {
      axiosInstance.get(`api/user/detail`)
        .then((res) => {
          this.setState(
            {
              client_email: res.data.email,
              name: res.data.name + ' ' + res.data.second_name,
              phone_number: res.data.phone_number
            })
        })

    }

  }

  edit = (e) => {
    this.setState({ [e.currentTarget.id]: true })
  }
  save_edit = () => {

    if (this.state.phone_number.length < 10) {
      this.setState({ phone_number_err: 'Numéro de Téléphone invalide', is_phone_number_err: true })
    }
    else {
      axiosInstance.put(`api/user/mini-detail`,
        {
          'phone_number': this.state.phone_number
        }
      )
        .then((res) => {
          this.setState({
            phone_number: res.data.phone_number,
            edit_phone: false
          })
        })

    }

  }

  onChange(e) {
    this.setState({ [e.currentTarget.name]: e.target.value });
  }
  handlMainDrawer = (e) => {

    if (this.state.isDrawerOpen) {

      this.setState({
        isDrawerOpen: false
      })

    } else {
      switch (e.currentTarget.id) {
        case 'papoufBoxes':
          this.setState({
            selectedChild: this.state.papoufBoxes,
            isDrawerOpen: true
          })
          break;
        case 'papoufFurnitures':
          this.setState({
            selectedChild: this.state.papoufFurnitures,
            isDrawerOpen: true
          })
        default:
          break;
      }

    }

  }



  render() {
    const { isDrawerOpen, selectedChild } = this.state

    return (
      <div className="menu-drawer">
        <Drawer open={isDrawerOpen} onClose={this.handlMainDrawer} anchor={'left'} >
          <DrawerMenuChild MainOnClose={this.props.MainOnClose} children={selectedChild} onClose={this.handlMainDrawer} />
        </Drawer>
        <div className="search mb-2">
          Chercher
          <IconButton className="float-right " id='papoufBoxes' onClick={this.props.MainOnClose}>
            <CgClose className="icon" />
          </IconButton>
        </div>
        <div className="">
          <div className="option">
            <div className="title">Des pack personnalisable</div>
            <ul >
              <li>
                <a href="./collections/pack/papouf-Boxes">
                  Papouf Boxes
                </a>
                <a className="float-right ">
                  <IconButton id='papoufBoxes' onClick={this.handlMainDrawer}>
                    <GrNext className="icon" />
                  </IconButton>
                </a>
              </li>
              <li>
                <a href="./collections/pack/Papouf-Fornitures">
                  Meubles, équipements <br />  de Papouf
                </a>
                <a className="float-right ">
                  <IconButton id='papoufFurnitures' onClick={this.handlMainDrawer}>
                    <GrNext className="icon" />
                  </IconButton>
                </a>
              </li>
            </ul>
          </div>
          <div className="option">
            <div className="title">les Produits de Papouf</div>
            <ul className="">
              <li>
                <a href="./collections/product/McClintock">
                  McClintock
                </a>
           
              </li>
              <li>
                <a href="./collections/product/Lorem-Ipsum">
                  Lorem Ipsum
                </a>
              
              </li>
              <li>
              <a href="./collections/product/Specimen">
                  Specimen
                </a>
              
              </li>
              <li>
              <a href="./collections/product/Righteous">
                  Righteous
                </a>
               
              </li>
              <li>
              <a href="./collections/product/Voluptas">
                  Voluptas
                </a>
                
              </li>
              <li>
              <a href="./collections/product/Finibus">
                  Finibus
                </a>
                
              </li>
            </ul>
          </div>
          <div>
          </div>
        </div>
      </div >

    )
  }

}

export default DrawerMenu

