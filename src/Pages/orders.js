import React, { Component } from "react";

import { FaRegWindowClose } from 'react-icons/fa';
import { BiArrowBack } from "react-icons/bi";
import axiosInstance from "./auth/axios";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";



class Orders extends Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            isOrdersLoading: false
        }
    }
    componentDidMount() {
        this.setState({ isOrdersLoading: true }, () => {
            if (localStorage.getItem('access_token')){
                axiosInstance.get('api/order/list')
                .then((res) => {

                    setTimeout(() => {
                        this.setState({
                            orders: res.data,
                            isOrdersLoading: false
                        })
                    }, 500);

                })

            }
            else {
                setTimeout(() => {
                    this.setState({
                        orders: [],
                        isOrdersLoading: false
                    })
                }, 500);

            }
    

        })

    }
    render() {
        const { orders } = this.state
        const { isOrdersLoading } = this.state
        return (

            <div className="orders-drawer">
                <div className=" mb-3">
                    
                        <IconButton component="span" onClick={this.props.close}>
                            <BiArrowBack />
                        </IconButton>
                        <center><h3>Your Orders</h3></center>
                    
                </div>
                {!isOrdersLoading ? (
                    <div>
                        {orders.length != 0 ? (
                            <div className="orders-list mt-2 p-2">
                                {orders.map(order => (
                                    <div className="">
                                        <div className="">
                                            <h6 ><span>statut</span> : <span className={order.status === 'Refunded' ? 'text-danger' : 'text-success'}>{order.status}</span></h6>
                                            <h6><span>Date </span>  : {order.created.slice(0, 10)}</h6>{/* Temporary */}
                                        </div>
                                        <div className="">
                                            <div className="row justify-content-between">
                                               
                                                <h6><span>Total </span> : {order.order_total} Dh </h6>
                                            </div>
                                            <div>
                                                <h6><span>Mode de paiement</span> : {order.payment_mode}</h6>
                                                <h6><span>Mode de laivraison</span> : {order.delivery_mode.title}
                                                </h6>
                                            </div>
                                        </div>
                                        <Link onClick={() => window.location.href = `/Order/${order.id}`}>
                                            <button className="details btn btn-secondary mb-3">Voir plus des details</button>
                                        </Link>
                                        
                                    </div>
                                ))}
                            </div>

                        ) :
                            <div className="null d-flex align-items-center justify-content-center mb-4">
                                0
                            </div>
                        }

                    </div>
                ) :
                    <center>
                        <div className="loader mt-5"></div>
                    </center>
                }
            </div>

        )
    }
}
export default Orders



