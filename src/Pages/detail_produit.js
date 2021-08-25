import React, { Component } from "react";
import axiosInstance from './auth/axios';
import queryString from 'query-string';
import Carousel from 'react-bootstrap/Carousel'

import { IconContext } from "react-icons";
import { BiCustomize } from 'react-icons/bi';
import { Link } from "react-router-dom";
import Select from "react-select";
import { FaShippingFast } from 'react-icons/fa';
import { GiBackwardTime } from 'react-icons/gi';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { MdNavigateNext } from 'react-icons/md';
import IconButton from '@material-ui/core/IconButton';



class Detail_Produit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {
                title: null,
                sale_price: null,
                description: null,
                type: null
            },
            itemImages: [],
            isItemLoading: true,
            isItemImagesLoading: true,
            isRegionsLoading: true,
            shipping_mode: 'Livraison Standart',
            regions: [],
            cities: [],
            selectedRegion: null,
            selectedCity: null,
            shippingDetails: null
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
        const type = queryString.parse(this.props.location.search).type;
        const idItem = queryString.parse(this.props.location.search).item_id;
        const item = await axiosInstance.get(`api/variation/${type}/${idItem}`)
        this.setState({
            item: item.data,


        }, () => {
            axiosInstance.get(`api/delivery/regions`)
                .then((res) => {
                    let regions = []
                    res.data.forEach(region => {
                        regions.push({ label: region.title, value: region.title })
                    });
                    this.setState({
                        regions,
                        isRegionsLoading: false
                    })
                })
            axiosInstance.get(`api/images/${type}/${idItem}`)
                .then((res) => {
                    setTimeout(() => {
                        this.setState({
                            isItemLoading: false,
                            itemImages: res.data.images,

                        })
                    }, 400);

                })
                .catch(() => {

                })
        })
    }
    handleChnageRegion = (selectedRegion) => {
        this.setState({
            shippingDetails: null,
            selectedCity: null,
            isRegionsLoading: true,
            selectedRegion
        }, () => {
            axiosInstance.get(`api/delivery/region-cites/${this.state.selectedRegion.value}`)
                .then((res) => {

                    let cities = []
                    res.data.cities.forEach(element => {
                        cities.push({ label: element.title, value: element.title })
                    });
                    this.setState({
                        cities,
                        isRegionsLoading: false
                    })
                })

        })
    }
    handleChnageCity = (selectedCity) => {
        this.setState({
            isRegionsLoading: true,
            selectedCity
        }, () => {
            axiosInstance.post(`api/delivery/delay-cost`,
                {
                    'city': this.state.selectedCity.value,
                    'shipping_mode': this.state.shipping_mode,
                    'total': this.state.item.sale_price
                })
                .then((res) => {
                    this.setState({
                        shippingDetails: {
                            delay: res.data.delay_per_hour,
                            cost: res.data.shipping_price,

                        },
                        isRegionsLoading: false,
                    })

                })
        })
    }



    add = (item) => {

        if (!localStorage.getItem('access_token')) {
            this.props.history.push("/sign-up");
            window.location.reload();

        }
        else {
            this.props.panier(item)
        }
    }
    render() {
        const { item, isItemLoading, itemImages, regions, cities, selectedRegion, selectedCity, isItemImagesLoading, isRegionsLoading, shippingDetails } = this.state


        return (
            <div className="main-item-details  " >

                {!isItemLoading ? (
                    <div className="container pt-md-3 p-0">

                        <div className="row  ">
                            <div className="col-lg-9 col-12 main-item-details-content p-0 bg-white p-3 ">
                                <div className="row">
                                    <div className="item-image    col-lg-6 col-12 p-md-5 p-lg-0 p-0 ">

                                        <Carousel interval={2000}>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={itemImages[0]?.image}
                                                    alt="First slide"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={itemImages[1]?.image}
                                                    alt="Second slide"
                                                />
                                            </Carousel.Item>
                                        </Carousel>

                                    </div>
                                    <div className="col-lg-6 col-12 p-0 pl-lg-3 ">
                                        <div className="item-title col-md-10 col-12">
                                            Lorem Ipsum is simply dummy text
                                        </div>
                                        <div className="item-rating-container d-flex flex-row align-items-center justify-content-start mt-3">
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <div className="text-secondary ml-3">4.7 out of (3514)</div>
                                        </div>
                                        <div className="item-text text-secondary mt-3">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec consequat lorem. Maecenas elementum at diam consequat bibendum.Mauris iaculis fringilla ex, sit amet semper libero facilisis sit amet. Nunc ut aliquet metus. Praesent pulvinar justo sed velit tempus bibendum. Quisque dictum lorem id mi viverra, in auctor justo laoreet.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.  </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 pr-0 pl-2 float-right">
                                    <div className="item-price float-right mb-2">{item.sale_price}  DH</div>
                                    <div className="row justify-content-between mt-2 ">
                                        {item.is_customized ? (
                                            <Link to={{ pathname: `/Copy-Customization/Papouf-Boxes`, state: { pack_id: item.id, selectedPackImages: itemImages, image: itemImages[0]?.image } }}>
                                                <button className="btn  btn-customize mb-3" >
                                                    <BiCustomize fontSize="icon-medium" /> <span >Personnaliser</span>
                                                </button>
                                            </Link>
                                        )
                                            :
                                            null
                                        }
                                        <button onClick={() => this.props.panier(item)} className="btn btn-cart  mb-3"> Ajouter au cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-lg-3 col-12 mt-2 mt-lg-0 pr-0 pl-0 pr-md-2 pl-md-2 `}>
                                <div className="shipping-details bg-white p-3 ">
                                    <div className="title text-600 pt-1 pb-1">
                                        LIVRAISON & RETOURS
                                    </div>
                                    <hr className="m-0  p-0" />
                                    <div className="title text-500 pt-1 pb-1"> Papouf <span className="text-blury1">Express</span></div>
                                    <div className="sous-title">Livraison rapide dans les grandes villes</div>
                                    <hr className="mt-0 mb-2  p-0" />
                                    <div className={`${isRegionsLoading ? ('opacity-5 avoid-click') : ''}`}>
                                        <div className="title text-600 mb-2">
                                            Choisissez le lien
                                        </div>
                                        <div>
                                            <Select className="select mb-2" placeholder={'Région'} value={selectedRegion} onChange={this.handleChnageRegion} options={regions} theme={theme => ({ ...theme, borderRadius: 0, transition: 0.5, colors: { ...theme.colors, primary: 'burlywood', }, })}
                                                menuColor='red'
                                            />
                                            <Select className="select mb-2" value={selectedCity} onChange={this.handleChnageCity} options={cities} theme={theme => ({ ...theme, borderRadius: 0, transition: 0.5, colors: { ...theme.colors, primary: 'burlywood', }, })}
                                                menuColor='red'
                                            />
                                        </div>
                                        <div className={`${shippingDetails ? ('') : 'display-none'}`}>
                                            <div className="d-flex">
                                                <div className="col-3 ">
                                                    <FaShippingFast className="icon " />
                                                </div>
                                                <p className=" text-200">
                                                    Livraison pour <span className="text-600">{shippingDetails?.cost} Dhs</span><br />
                                                    dans <span className="text-600">{shippingDetails?.delay} Heures</span>
                                                </p>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-3 ">
                                                    <GiBackwardTime className="icon " />
                                                </div>
                                                <p className=" text-200">
                                                    Retour gratuit dans les 3 jours
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div>
                        </div>
                    </div>
                ) :
                    <center className="container bg-white p-5 mt-5">
                        <div className="loader center" />
                    </center>
                }

            </div>
        )
    }
}
export default Detail_Produit