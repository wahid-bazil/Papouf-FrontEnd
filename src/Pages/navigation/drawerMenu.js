import React, { Component } from "react";
import { GrNext } from "react-icons/gr";
import axiosInstance from "../auth/axios"
import IconButton from '@material-ui/core/IconButton';
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
          "id": 11,
          "title": "relaxing-box",
          "label": "Relaxing Box",
          "children": [
            {
              "id": 4,
              "title": "cafe-box",
              "label": "Café Box",
              "children": []
            },
            {
              "id": 3,
              "title": "atay-box",
              "label": "Atay Box",
              "children": []
            },
          ]
        },
        {
          "id": 7,
          "title": "beauty-box",
          "label": "Beauty Box",
          "children": [
            {
              "id": 8,
              "title": "hamam-box",
              "label": "Hamam Box",
              "children": []
            },
            {
              "id": 9,
              "title": "aaroussa-box",
              "label": "Aaroussa box",
              "children": []
            }
          ]
        },

        {
          "id": 5,
          "title": "candies-box",
          "label": "Candies Box",
          "children": []
        },
        {
          "id": 6,
          "title": "candles-box",
          "label": "Candles Box",
          "children": []
        },

        {
          "id": 10,
          "title": "special-gift-box",
          "label": "Special Gift Box",
          "children": []
        },
        {
          "id": 12,
          "title": "picnic-box",
          "label": "Picnic Box",
          "children": []
        },
        {
          "id": 13,
          "title": "love-box",
          "label": "Love Box",
          "children": []
        }
      ],
      papoufFurnitures: [
        {
          "id": 14,
          "title": "canape-traditionnel",
          "label": "Canapé traditionnel",
          "children": [],
          "type": "pack"
        },
     
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
                <a href="./collections/pack/papouf-boxes">
                  Papouf Boxes
                </a>
                <a className="float-right ">
                  <IconButton id='papoufBoxes' onClick={this.handlMainDrawer}>
                    <GrNext className="icon" />
                  </IconButton>
                </a>
              </li>
              <li>
                <a href="./collections/pack/meubles-et-equipements">
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
                <a href="./collections/product/maison-et-decoration">
                  Maison et décoration
                </a>

              </li>
              <li>
                <a href="./collections/product/mariage-et-fetes">
                  Mariage et fêtes
                </a>

              </li>
              <li>
                <a href="./collections/product/art-et-collections">
                  Art et collections
                </a>

              </li>
              <li>
                <a href="./collections/product/fournitures-creatives-et-outils">
                  Fournitures créatives et outils
                </a>

              </li>
              <li>
                <a href="./collections/product/plantes">
                  Plantes
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

