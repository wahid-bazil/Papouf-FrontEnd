import React, { Component } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { GrFormDown } from 'react-icons/gr';
import { GrFormUp } from 'react-icons/gr';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import axiosInstance from "./auth/axios";
import { FaShoppingCart } from 'react-icons/fa';
import { BiImages } from "react-icons/bi";
import { Link } from "react-router-dom";



class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0,
            order: [],
            cartItemsImages: [],
            expanded: true,
            isOrderLoading: false,
            isCartImagesLoading: false

        };
        window.addEventListener("resize", this.update);
    }
    componentDidMount() {
        this.update();
        let order_id = this.props.match.params.id;
        this.setState({ isOrderLoading: true }, async () => {
            const Order = await axiosInstance.get(`api/order/${order_id}`)
            this.setState({
                order: Order.data,
                isOrderLoading: false,
                isCartImagesLoading: true
            }, () => {
                axiosInstance.get(`api/images/order/${order_id}`)
                    .then((res) => {
                        this.setState({
                            cartItemsImages: res.data.cart_images.cartitems_images,
                            isCartImagesLoading: false
                        })
                    })
            })
        })
    }
    get_itemImages = (item_id) => {
        const cartItemsImages = [...this.state.cartItemsImages]
        let indexOf_item_images = cartItemsImages.findIndex(element => element.cartitem_images.item_id === item_id);
        let images = [];
        cartItemsImages[indexOf_item_images]?.cartitem_images?.images.forEach(element => {
            images.push(element.image)

        });
        return images
    }
    update = () => {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        }, () => {
            if (this.state.width <= 768) {
                this.setState({ expanded: false })
            }
            else {
                this.setState({ expanded: true })
            }
        });
    };
    handleAccordionDetails = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const { order, cartItemsImages, expanded } = this.state
        const { isOrderLoading, isCartImagesLoading } = this.state
        return (
            <div className="order-page container bg-white pb-5 mt-5  ">
                {!isOrderLoading ? (
                    <div>
                        <div className=" pt-3">
                            <h5><span>Statut</span> : <span className="text-success ">{order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}</span></h5>
                            <h5><span>Date</span> : {order.created?.slice(0, 10)}</h5>
                            <h5 className="cart-title"><span>Total </span> : {order.order_total} DH</h5>
                            <h5><span>Mode de Paiement</span> : {order.payment_mode}</h5>
                        </div>
                        <hr />
                        <Accordion expanded={true}>
                        
                            <AccordionDetails className="p-0">
                                <div className="cart-list ">
                                    <div className="row ">
                                        {order.cart?.cartitems?.map(cartitem => (
                                            <div className="col-lg-2 col-md-3 col-12 mt-3  ">
                                                <div className="row">
                                                    {!isCartImagesLoading ? (
                                                        <div className="col-6 col-md-12 border">
                                                            {cartitem.item.type === "custompack" ? (
                                                                <div className=" customizable">
                                                                    
                                                                        <span className="notify-badge">{cartitem.quantity}</span>
                                                                        <img src={this.get_itemImages(cartitem.item.id)[0]} />
                                                                 
                                                                </div>
                                                            ) :
                                                                <div>
                                                                   
                                                                        <span className="notify-badge">{cartitem.quantity}</span>
                                                                        <img alt="" src={this.get_itemImages(cartitem.item.id)[0]} />
                                                                    
                                                                </div>
                                                            }
                                                        </div>
                                                    ) :
                                                        <center className="p-5">
                                                            <div class="lds-spinner "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                                        </center>
                                                    }
                                                    <center className="col-6 col-md-12  ">
                                                        <h6 className="item-title">{cartitem.item.title}</h6>
                                                        <div className="item-price">{cartitem.total} Dhs</div>
                                                    </center>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className="row justify-content-between">
                            <div className="col-lg-5 col-md-5 col-12 livraison-info   mt-4 p-2 ">
                                <h5><span>Laivraison</span> : Standart pour <span>{`(${order.cost}Dhs)`}</span> </h5>
                                <div className="row">
                                    <h6 className="text-secondary">Livré pendant </h6>
                                    <h6 className="text-blury ml-2"> {order.delay} Heures</h6>
                               
                                </div>
                               <div className="text-600"> {order.shipping_address?.city?.title}</div>
                                <p className="text-secondary">{order.shipping_address?.address}</p>
                            </div>
                        </div>
                    </div>
                ) :
                    <center className="pt-5">
                        <div className="loader mt-5 "></div>
                    </center>
                }

            </div>
        )
    }


}

export default Order