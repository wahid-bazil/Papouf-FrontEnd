import React, { Component } from "react";


import axiosInstance from "../auth/axios"
import Accordion from '@material-ui/core/Accordion';

import AccordionDetails from '@material-ui/core/AccordionDetails';



import { GrFormDown } from 'react-icons/gr';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { VscAccount } from "react-icons/vsc";
import Badge from '@material-ui/core/Badge';
import { GrFormUp } from 'react-icons/gr';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            second_name: "",
            phone_number: "",
            address: "",
            city: "",
            isCartLoading: false,
            isClientinfoLoading: false,
            cartitems: [],
            cartitemsImages: [],
            subtotal: 0,
            isLoged: true,
            paymentOptions: [
                { value: 'CashOnDelivery', label: ' Paiement à la livraison' },
            ],
            selectedOptionPayment: { value: 'CashOnDelivery', label: 'Paiement à la livraison' },
            isUserInfoLoading: false,
            isCartInfoLoading: false,
            isCartImagesLoading: false,
            expanded: false,
            height: 0,
            width: 0,
            modeShipping:  { value: 'Standard', label: ' Livraison Standard' },
            modePayment: { value: '	cashondelivery', label: ' Paiement à la livraison' },
            delay: null,
            cost: null,
            isDataSaving: false,
            isDataLoading: true
        }
        this.continue = this.continue.bind(this)
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
        window.scrollTo(0, 0);
        this.update();
        if (this.props.location.state?.modeShipping) {
            try {
                const [firstResponse, secondResponse] = await Promise.all([
                    axiosInstance.get('api-user/details'),
                    axiosInstance.get('api-cart/'),
                ]);
                if (firstResponse.data.address_details == null || firstResponse.data.address_details == undefined) {
                    this.props.history.push("./checkout");
                }
                else if (secondResponse.data.cartitems.length === 0) {
                    this.props.history.push("./Acceuil")
                }
                else {
                    const thirdResponse = await axiosInstance.post('api-delivery/delay-cost',
                        {
                            city: firstResponse.data.address_details.city,
                            shipping_mode: this.state.modeShipping.value,
                            order_total :secondResponse.data.subtotal
                        })
                    this.setState({
                        name: firstResponse.data.name,
                        second_name: firstResponse.data.second_name,
                        phone_number: firstResponse.data.phone_number,
                        address: firstResponse.data.address_details.details,
                        city: firstResponse.data.address_details.city,
                        cartitems: secondResponse.data.cartitems,
                        subtotal: secondResponse.data.subtotal,
                        delay: thirdResponse.data.delay_per_hour,
                        cost: thirdResponse.data.shipping_price,
                        isUserInfoLoading: false,
                        isCartInfoLoading: false,
                        isCartImagesLoading: true,
                        isDataLoading: false
                    })
                    axiosInstance.get(`api-images/cartitems`)
                        .then((res) => {
                            this.setState({
                                cartitemsImages: res.data,
                                isCartImagesLoading: false
                            })
                        })
                }
            }
            catch {
                
            }
        }
        else {
            this.props.history.push({
                pathname: './delivery',

            })
        }
    }
    get_articleImages = (item_id) => {
        let indexOf_cartitem_images = this.state.cartitemsImages.findIndex(element => element.cartitem_images.item_id === item_id);
        let images = [];
        this.state.cartitemsImages[indexOf_cartitem_images]?.cartitem_images?.images.forEach(element => {
            images.push(element)
        });
        return images
    }
    continue = () => {
        this.setState({ isDataSaving: true })
        this.props.history.push({
            pathname: '/validation',
            state: { 
                modePayment: 'Paiement à la livraison',
                modeShipping :this.state.modeShipping
             }
        })

    }

    /*async continue() {
        const modePayment = this.state.modePayment
        const modeShipping = this.state.modeShipping

        try {
            console.log(modePayment, modeShipping)
            const [firstResponse, secondResponse] = await Promise.all([
                axiosInstance.post('api/order/list',
                    {
                        delivery_mode: modeShipping,
                        payment_mode: modePayment
                    }
                )
            ]);
            if (modePayment === 'OnlinePayment') {

            }
            else if (modePayment === 'CashOnDelivery') {
                this.props.history.push("/Acceuil");
                
            }
        }
        catch {

        }

    }*/

    handleAccordionDetails = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const { cartitems, subtotal, expanded } = this.state
        const { name, second_name, phone_number, address, city, modeShipping, delay, cost } = this.state
        const { isUserInfoLoading, isCartInfoLoading, isCartImagesLoading, isDataSaving, isDataLoading } = this.state
        return (
            <div className="checkout  pb-5">
                {!isDataLoading ? (
                    <div>
                        <div className="header mb-5 d-flex ">
                        </div>
                        <div className="checkout-payment-content container   ">
                            <div className=" row">
                                <div className=" col-md-8 col-12 phases container p-0 ">
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
                                    <div className="mb-2">
                                        <div className="row justify-content-between pr-3 ">
                                            <div>
                                                <Checkbox checked color={"primary"} />
                                                <span className="title">2.MODE DE LIVRAISON</span>
                                            </div>
                                            <div className="edit text-blury1">
                                                Modifier
                                            </div>
                                        </div>
                                        <hr className="p-0 m-0" />
                                        <div className="pl-5 pt-2 pb-2">
                                            <div className="text-700">{modeShipping.label}</div>
                                            <div className=" "><span className="text-secondary text-shippori">Livré pendant : </span><span className="text-600 text-shippori">{delay}H </span><span className="text-shippori"> pour </span><span className="text-blury1 text-700 text-shippori">{cost}Dhs.</span></div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="row justify-content-between pr-3 ">
                                            <div>
                                                <Checkbox checked color={"primary"} />
                                                <span className="title">3. MODE DE PAIEMENT</span>
                                            </div>
                                        </div>
                                        <hr className="p-0 m-0" />
                                        <div className="p-3">
                                            <div className=" question text-600">Quel moyen de paiement voulez-vous utiliser?</div>
                                            <div className="">
                                                <FormControl className="mt-3 pl-3" component="fieldset">
                                                    <div className="mb-4 opacity-5">
                                                        <FormControlLabel
                                                            control={<Radio color="secondary" />}
                                                            labelPlacement="end"
                                                            disabled
                                                            value="disabled"
                                                        />
                                                        <label><img src={'./assets/images/onlinePayment.png'} /></label>
                                                        <div className="pl-5 text-700">Paiement par carte bancaire (facile, sécurisé et permet d'éviter tout contact avec de la monnaie ou des billets)</div>
                                                        <div className="pl-5  text-error"><span className=" text-shippori ">pas disponible pour le moment</span></div>
                                                    </div>
                                                    <div className="">
                                                        <FormControlLabel
                                                            checked
                                                            value="top"
                                                            control={<Radio color="secondary" />}
                                                            labelPlacement="end"

                                                        />
                                                        <label className="text-700">Paiement à la livraison  </label>


                                                    </div>

                                                </FormControl>
                                                <hr />
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
                                                    <hr />
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

                                        </div>
                                        <button className="btn  col-12 p-2" onClick={this.continue}>{isDataSaving ? (<CircularProgress />) : 'CONTINUER'}</button>
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
export default Payment;