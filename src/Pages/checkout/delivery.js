import React, { Component } from "react";


import queryString from 'query-string';


import { HiOutlineChevronRight } from "react-icons/hi";
import axiosInstance from "../auth/axios"
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import { FaShippingFast } from 'react-icons/fa';
import { GrFormUp } from 'react-icons/gr';
import { BiSupport } from 'react-icons/bi';
import { GiReceiveMoney } from 'react-icons/gi';
import { IconContext } from "react-icons";
import { GrFormDown } from 'react-icons/gr';
import { HiOutlineMail } from 'react-icons/hi';
import { RiUser3Fill } from 'react-icons/ri';
import { MdLocalPhone } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { VscAccount } from "react-icons/vsc";
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import RadioGroup from '@material-ui/core/RadioGroup';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

class Delivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartitems: [],
            cartitemsImages: [],
            subtotal: 0,
            isLoged: true,
            name: "",
            phone_number: "",
            address: "",
            city: null,
            deliveryOptions: [
                { value: 'Standart', label: ' Livraison Standard' },
            ],
            selectedOptionDelivery: { value: 'Standart', label: 'Livraison Standard' },
            isUserInfoLoading: false,
            isCartInfoLoading: false,
            isCartImagesLoading: false,
            expanded: false,
            height: 0,
            width: 0,
            delay: null,
            cost: null,
            modeShipping: 'Livraison standard',
            modePayment: 'Paiement à la livraison',
            isDataSaving: false,
            isDataLoading: true
        }
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

    async componentDidMount() {
        this.update();
        window.scrollTo(0, 0);
        this.setState({
            isUserInfoLoading: false,
            isCartInfoLoading: false,
        }, async () => {
            try {
                const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
                    axiosInstance.get('api/user/detail'),
                    axiosInstance.get('api/cart/detail'),
                ]);
                if (firstResponse.data.address_details == null || firstResponse.data.address_details == undefined) {
                    this.props.history.push("./checkout");
                }
                else if (secondResponse.data.cartitems.length === 0) {
                    this.props.history.push("./Acceuil")
                }
                else {
                    console.log('here')
                    axiosInstance.post('api/delivery/delay-cost',
                        {
                            city: firstResponse.data.address_details.city.title,
                            shipping_mode: this.state.modeShipping,
                            total :secondResponse.data.subtotal
                        })
                        .catch((res)=> {
                            console.log(res)
                        })
                        .then((res) => {
                            console.log('here1')
                            console.log(res)
                            this.setState({
                                name: firstResponse.data.name,
                                second_name: firstResponse.data.second_name,
                                phone_number: firstResponse.data.phone_number,
                                address: firstResponse.data.address_details.address,
                                city: firstResponse.data.address_details.city.title,
                                cartitems: secondResponse.data.cartitems,
                                subtotal: secondResponse.data.subtotal,
                                delay: res.data.delay_per_hour,
                                cost: res.data.shipping_price,
                                isUserInfoLoading: false,
                                isCartInfoLoading: false,
                                isCartImagesLoading: true,
                                isDataLoading: false
                            }, () => {
                                axiosInstance.get(`api/images/cartitems`)
                                    .then((res) => {
                                        this.setState({
                                            cartitemsImages: res.data,
                                            isCartImagesLoading: false
                                        })
                                    })

                            })
                        })
                }
            }
            catch {

            }

        })
    }
    get_articleImages = (item_id) => {
        console.log('here', this.state.cartitemsImages, item_id)
        let indexOf_cartitem_images = this.state.cartitemsImages.findIndex(element => element.cartitem_images.item_id === item_id);
        let images = [];
        this.state.cartitemsImages[indexOf_cartitem_images]?.cartitem_images?.images.forEach(element => {
            images.push(element.image)

        });
        console.log(images)
        return images
    }

    continue = () => {
        this.setState({ isDataSaving: true })
        this.props.history.push({
            pathname: '/payment',
            state: { modeShipping: this.state.modeShipping }
        })

    }
    handleAccordionDetails = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const { cartitems, subtotal } = this.state
        const { delay, cost, isDataSaving } = this.state
        const { name, second_name, phone_number, address, city, expanded } = this.state
        const { isUserInfoLoading, isCartInfoLoading, isCartImagesLoading, isDataLoading } = this.state
        const { selectedOptionDelivery } = this.state
        return (
            <div className="checkout  pb-5">
                {!isDataLoading ? (
                    <div>
                        <div className="header mb-3 d-flex ">
                            <div className="logo  col-12 col-lg-6 ">
                                <div className=" d-flex flex-column align-items-center justify-content-center p-3 ">
                                    <a href='./'><div className="logo-title ">Papouf</div></a>
                                    <div className="logo-subtitle">From Our Hand To Your Soul</div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-delivery-content container   ">
                            <div className=" row">
                                <div className=" col-md-8 col-12 phases container  p-0">
                                    <div className="mb-2">
                                        <div className="row justify-content-between pr-3 ">
                                            <div>
                                                <Checkbox checked color={"primary"} />
                                                <span className="title">1.ADRESSE</span>
                                            </div>
                                            <div className="edit text-blury1">
                                                Modifier
                                            </div>
                                        </div>
                                        <hr className="p-0 m-0" />
                                        <div className="pl-5 pt-2 pb-2">
                                            <div className="text-700">{name} {second_name}</div>
                                            <div className="text-secondary">
                                                {`${city} ${address}`}
                                            </div>
                                            <div className="text-secondary">
                                                {phone_number}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form">
                                        <Checkbox disabled checked color={"primary"} />
                                        <span className="title">2.MODE DE LIVRAISON</span>
                                        <hr className="p-0 m-0" />
                                        <div className="p-3">
                                            <div className=" question text-600">Comment voulez-vous que votre commande soit livrée ?</div>
                                            <FormControl className="mt-3" component="fieldset">
                                                <div>
                                                    <FormControlLabel
                                                        checked
                                                        control={<Radio color="secondary" />}
                                                        labelPlacement="end"
                                                    />
                                                    <label><span className="text-600">Livraison standard </span></label>
                                                    <div className="pl-5 sous-label"><span className="text-secondary text-shippori">Livré pendant : </span><span className="text-600 text-shippori">{delay}H </span><span className="text-shippori"> pour </span><span className="text-blury1 text-700 text-shippori">{cost}Dhs.</span></div>
                                                </div>
                                                <div className="pl-5">
                                                    <p className="border p-3 text-700">Dans le cas d’une commande composée (plus d’un article), la livraison pourrait se faire de façon séparée (colis livrés à des périodes différentes).</p>
                                                </div>
                                                <div className="">
                                                    <FormControlLabel
                                                        value="top"
                                                        control={<Radio color="primary" />}
                                                        labelPlacement="end"
                                                        value="disabled" disabled
                                                    />
                                                    <label className="text-600">Livraison en point relais </label>
                                                    <div className="pl-5 sous-label text-error"><span className=" text-shippori ">pas disponible pour le moment</span></div>
                                                </div>

                                            </FormControl>
                                            <div className="border shipping-detail p-2">
                                                <div className="border title pt-2 pb-2">
                                                    DÉTAILS DE LIVRAISON
                                                </div>
                                                <div>
                                                    <p>
                                                        {cartitems.map(cartitem => (

                                                            <div><span className="text-600">Qté : {cartitem.quantity} </span> <span className="item-title text-secondary">{` ${cartitem.item.title}`}</span></div>
                                                        ))}
                                                    </p>
                                                    <div>
                                                        <span className="text-secondary">Livré pendant : </span><span className="text-700">{delay}h</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="total-description mt-3">
                                                <div className="row justify-content-between">
                                                    <div className="text-600">
                                                        Sous-total
                                                    </div>
                                                    <div className="text-600">
                                                        {`${parseInt(subtotal)} Dhs`}
                                                    </div>

                                                </div>
                                                <div className="row justify-content-between">
                                                    <div className="text-600">
                                                        Frais de livraison
                                                    </div>
                                                    <div className="text-700">
                                                        {`${parseInt(cost)} Dhs`}
                                                    </div>

                                                </div>
                                                <div className="row justify-content-between">
                                                    <div className="text-700 text-blury1">
                                                        Total TTC

                                                    </div>
                                                    <div className="text-700 text-blury1">
                                                        {`${parseInt(subtotal) + parseInt(cost)} Dhs`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn   col-12 p-2" onClick={this.continue}>{isDataSaving ? (<CircularProgress />) : 'CONTINUER'}</button>
                                    </div>
                                    <div className="bg-white mt-2">
                                        <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                                        <span className="title">3. MODE DE PAIEMENT</span>
                                    </div>

                                </div>
                                <div className="checkout-cartitems col-md-4 col-12 p-0">
                                    <div>
                                        <div className="">
                                            <Accordion className="p-0 accordion" expanded={expanded}>
                                                <div className="accordion-title    pt-2 pl-2 row justify-content-between">
                                                    <div className="first-title "> Sous-total : <span className="text-blury1">{subtotal} Dh</span> </div>
                                                    <IconButton onClick={this.handleAccordionDetails}>
                                                        {expanded ? (<GrFormUp />) : <GrFormDown />}
                                                    </IconButton>
                                                </div>
                                                <hr className="p-0 m-0" />
                                                <AccordionDetails className="d-flex flex-column checkout-cartitems-content " >
                                                    {!isCartInfoLoading ? (this.state.cartitems?.map(cartitem => (
                                                        <div key={cartitem.id} className={`row mt-3 `}>
                                                            <div className=" col-4 p-0  ">
                                                                {!isCartImagesLoading ? (
                                                                    <div className="border">
                                                                        {cartitem.item.type === "custompack" ? (
                                                                            <Badge badgeContent={"Personnalisé "} color="primary">
                                                                                <img src={this.get_articleImages(cartitem.item.id)[0]} alt="" />
                                                                            </Badge>

                                                                        ) :
                                                                            <img alt="" src={this.get_articleImages(cartitem.item.id)[0]} />
                                                                        }
                                                                    </div>


                                                                ) :
                                                                    <div className="mr-5 ">
                                                                        <div className="lds-spinner "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-between col-md-8  col-6  ">
                                                                <div className="item-title center ">{cartitem.item?.title}</div>
                                                                <div className="item-price ">{cartitem.item?.sale_price} DH</div>
                                                                <div className="item-quantity-label text-secondary">Qté :{cartitem.quantity}</div>
                                                            </div>
                                                        </div>
                                                    ))) :
                                                        <center>
                                                            <div className="loader mt-5"></div>
                                                        </center>
                                                    }
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    ) :
                    <center className="spinner mt-5 p-5">
                    <div className="loader " />
                </center>
                    }

            </div>






        )



    }
}
export default Delivery;