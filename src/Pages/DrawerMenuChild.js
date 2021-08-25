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
import { CgClose } from "react-icons/cg";
import {FaChevronLeft} from "react-icons/fa";

class DrawerMenuChild extends Component {
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
            selectedChild: [],
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
    handMenulDrawer = (e) => {
        if (this.state.isDrawerOpen) {
            this.setState({ isDrawerOpen: false })
        } else {
            const child_id = parseInt(e.currentTarget.id)
            var indexOf_child = this.props.children.findIndex(child => child.id === child_id)

            this.setState({
                selectedChild: this.props.children[indexOf_child].children,
                isDrawerOpen: true
            })

        }

    }

    render() {
        const { selectedChild, isDrawerOpen } = this.state
        const { children } = this.props;

        return (

            <div className="menu-drawer">

                <Drawer open={isDrawerOpen} onClose={this.handMenulDrawer} anchor={'left'} >
                    <DrawerMenuChild MainOnClose={this.props.MainOnClose} children={selectedChild} onClose={this.handMenulDrawer} />
                </Drawer>
            
                <div className="main-close d-flex justify-content-between">    
                        <IconButton onClick={this.props.onClose}>
                            <FaChevronLeft className="icon" />
                        </IconButton>
                        <IconButton onClick={this.props.MainOnClose}>
                            <CgClose className="icon" />
                        </IconButton>
                   

                    </div>
                <div className="option">
            
               
                    <ul className="">
                        {children.map(child => (
                            <li key={child.id}>
                                <a href={`./collections/pack/${child.title}`}>
                                    {child.title}
                                </a>
                                {child.children.length != 0 ? (
                                    <a className="float-right">
                                        <IconButton id={child.id} onClick={this.handMenulDrawer}>
                                            <GrNext className="icon" />
                                        </IconButton>
                                    </a>
                                ) :
                                    null}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

}

export default DrawerMenuChild

