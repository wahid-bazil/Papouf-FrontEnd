import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";
import axiosInstance from "../auth/axios";
import IconButton from '@material-ui/core/IconButton';




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
                axiosInstance.get('api-order/list')
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
                        <center><h4 className="test-font">Mes commandes</h4></center>
                    
                </div>
                {!isOrdersLoading ? (
                    <div>
                        {orders.length != 0 ? (
                            <div className="orders-list mt-2 p-2">
                                {orders.map(order => (
                                    <div className="mb-5">
                                        <div className="">
                                            {/*<h6 ><span>statut</span> : <span className={order.status === 'Refunded' ? 'text-danger' : 'text-success'}>{order.status}</span></h6>*/}
                                            <h6 ><span>Statut</span> : <span className='text-success'>{order.status}</span></h6>
                                            <h6><span>La date de creation </span>  : {order.created.slice(0, 10)}</h6>{/* Temporary */}
                                            <h6><span>Temps restant pour la livraison  </span> {order.remaining_time_hours} heures</h6>{/* Temporary */}

                                        </div>
                                        <div className="">
                                            <div className="row justify-content-between">
                                               
                                                <h6><span>Total </span> : {order.order_total} Dh </h6>
                                            </div>
                                            <div>
                                                <h6><span>Mode de paiement</span> : Paiement à la livraison</h6>
                                                <h6><span>Mode de laivraison</span> : Livraison Standard
                                                </h6>
                                            </div>
                                        </div>
                                       
                                            <button onClick={()=>this.props.OrderDetail(order.id)} className="details btn btn-secondary ">Voir plus des details</button>
                                       
                                        
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



