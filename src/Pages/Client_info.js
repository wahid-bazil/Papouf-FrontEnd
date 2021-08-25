import React, { Component } from "react";
import { FaRegWindowClose } from 'react-icons/fa';

import { GrNext } from "react-icons/gr";
import Badge from '@material-ui/core/Badge';
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
import { HiOutlineChevronRight } from "react-icons/hi"
import { FiSave } from "react-icons/fi"
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_email: "",
      name: "",
      phone_number: "",
      edit_name: false,
      edit_phone: false,
      phone_number_err: null,
      is_phone_number_err: false

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
    let phone_number = /^\d+$/.test(this.state.phone_number)
    if (!phone_number || this.state.phone_number.length != 10) {
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



  render() {
    const { client_email, name, phone_number, edit_name, edit_phone, is_phone_number_err, phone_number_err } = this.state
    const { openCart } = this.props
    const { isLoged, ordersLenght } = this.props






    return (
      <div className="client-info-drawer">
        <div className="d-flex mt-3 ">

          <button className="btn1 " onClick={this.props.close}><FaRegWindowClose /></button>

          <h3 className="offset-1">Personal Informations</h3>
        </div>
        <div>
          <div className="topSection mt-5  mb-5 ">
            <div className="row ">
              <i className="inputIcon col-2">
                <HiOutlineMail />
              </i>
              <div className="input text-secondary col-8">
                {client_email}
              </div>

            </div>
            <div className="row  ">
              <div className="inputIcon edited col-2">
                <i><FaRegUserCircle /></i>
              </div>


              <div className="input edited text-secondary col-8">
                {name}
              </div>



            </div>
            <div className="row ">
              <div className="inputIcon edited col-2">
                <i><MdPhone /></i>
              </div>
              {edit_phone ? (<TextField error={is_phone_number_err} helperText={phone_number_err} className="col-8 edit-input p-0" type="text" onChange={this.onChange} name="phone_number" value={phone_number} required />) :

                <div className="input edited text-secondary col-8">
                  {phone_number}

                </div>}
              {!edit_phone ? (
                <IconButton onClick={this.edit} id="edit_phone" className="apdate col-2">
                  <AiOutlineEdit className="icon-small" />
                </IconButton>
              ) :
                <IconButton onClick={this.save_edit} id="edit_phone" className="apdate col-2">
                  <FiSave />
                </IconButton>
              }
            </div>
          </div>




          <div className="botSection d-flex flex-column align-contenu-center mt-5 ">
            <div className="d-flex justify-content-between p-1 mb-5">
              <i>
                <Badge badgeContent={parseInt(ordersLenght)} color="secondary"><FaShippingFast /></Badge>
              </i>
              <h3>
                Orders
              </h3>
              <IconButton onClick={this.props.handleOrdersDrawer}>
                <IconContext.Provider value={{ color: "burlywood" }}>
                  <div>
                    <HiOutlineChevronRight />

                  </div>
                </IconContext.Provider>
              </IconButton>
            </div>
            <div className="d-flex justify-content-between p-1 ">
              <i>
                <IoIosChatboxes />
              </i>
              <h3>
                Contact us
              </h3>
              <IconButton onClick={this.props.orders}>
                <IconContext.Provider value={{ color: "burlywood" }}>
                  <div>
                    <HiOutlineChevronRight />
                  </div>
                </IconContext.Provider>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Client

