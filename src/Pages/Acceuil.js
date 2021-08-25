import React, { Component } from "react";
import Carousel from 'react-grid-carousel'


import { IconContext } from "react-icons";
import Badge from '@material-ui/core/Badge';
import axiosInstance from "./auth/axios";
import { Link } from "react-router-dom";
import Item from '../util/item_display'
import { MdLocalShipping } from 'react-icons/md';
import { MdAssignmentReturn } from 'react-icons/md';
import { RiChat3Line } from 'react-icons/ri';
import { FcNext } from 'react-icons/fc';


const MiniDot = ({ isActive }) => (
    <span className="service-description-dot" style={{

        height: isActive ? '10px' : '10px',
        width: isActive ? '10px' : '10px',
        backgroundColor: isActive ? '#6E2C00' : '#aaa'

    }}></span>
)
const Dot = ({ isActive }) => (
    <span className="service-description-dot" style={{
        display: 'inline-block',
        height: isActive ? '10px' : '10px',
        width: isActive ? '10px' : '10px',
        backgroundColor: isActive ? '#6E2C00' : '#aaa',
        borderRadius: '100%'

    }}></span>
)
class Acceuil extends Component {
    constructor() {
        super()
        this.state = {
            featuredProducts: [],
            featuredProductsImages: [],
            isDataLoading: true,
            isItemsImagesLoading: true,
            featuredPacks: [],
            featuredPacksImages:[]

        }
    }
    async componentDidMount() {
        const [products, packs] = await Promise.all([
            axiosInstance.get('api/variation/collection?status=Featured&&nbOfitems=4&&type=product'),
            axiosInstance.get('api/variation/collection?status=Featured&&nbOfitems=4&&type=pack'),
        ])
       
        this.setState({
            featuredProducts: products.data,
            featuredPacks: packs.data,
            isDataLoading: false
        })

        axiosInstance.get('api/images/collection?status=Featured&&nbOfitems=4&&type=product')
            .then((res) => {
                this.setState({
                    featuredProductsImages: res.data,
                    isItemsImagesLoading: false
                })
            })
        axiosInstance.get('api/images/collection?status=Featured&&nbOfitems=4&&type=pack')
            .then((res) => {
              
                this.setState({
                    featuredPacksImages: res.data,
                    isItemsImagesLoading: false
                })
            })
    }
    get_featuredProductsImages = (item_id) => {
        const productsImages = this.state.featuredProductsImages
        let images = [];
        let indexOf_item_images = productsImages.findIndex(element => element.item_id === item_id)
        productsImages[indexOf_item_images]?.images.forEach(element => {
            images.push(element.image)
        });
        return images
    }
    get_featuredPacksImages = (item_id) => {
        const packsImages = this.state.featuredPacksImages
        let images = [];
        let indexOf_item_images = packsImages.findIndex(element => element.item_id === item_id)
        packsImages[indexOf_item_images]?.images.forEach(element => {
            images.push(element.image)
        });
        
        return images
    }
    render() {
        const { featuredProducts, featuredPacks, isDataLoading, isItemsImagesLoading } = this.state

        return (
            <div className="acceuil">
                <div className="  container   ">
                    <center className="services-description pt-4 pb-4 ">
                        <Carousel dot={MiniDot} mobileBreakpoint={0} scrollSnap={true} cols={3} row={1} showDots={true} scrollSnap={true} hideArrow={true} responsiveLayout={[{ breakpoint: 768, cols: 1, row: 1, autoplay: 1000, loop: true, }]}   >
                            <Carousel.Item  >
                                <div className="single-service p-0 ">
                                    <div className="row ">
                                        <IconContext.Provider value={{ color: "#aaa" }}>
                                            <MdLocalShipping className="service-icon" />
                                        </IconContext.Provider>
                                        <center className=""><span className="ml-5"> LIVRAISON partout au maroc<br /><span className="text-secondary"> Gratuite à partir de de 350 dhs </span></span></center>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="single-service">
                                    <div className="row">
                                        <IconContext.Provider value={{ color: "#aaa" }}>
                                            <MdAssignmentReturn className="service-icon" />
                                        </IconContext.Provider>
                                        <span className="ml-5">RETOURS faciles<br /><span className="text-secondary">Retour gratuit dans les 15 jours</span></span>

                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="single-service">
                                    <div className="row">
                                        <IconContext.Provider value={{ color: "#aaa" }}>
                                            <RiChat3Line className="service-icon" />
                                        </IconContext.Provider>
                                        <span className="ml-5">SUPPORT client en direct <br /><span className="text-secondary">Par email</span></span>

                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </center>
                    <div className="carousel mt-1 pb-3 ">
                        <Carousel dot={Dot} mobileBreakpoint={768} showDots={true} hideArrow={false}>
                            <Carousel.Item>
                                <div className="carousel-content pb-5">
                                    <img className="carousel-img2" alt="" />
                                    <div className="text">
                                        <div className="title ">Lorem Ipsum is simply dummy text </div>
                                        <div className="subtitle ">It was popularised in the 1960s with the release of Letraset</div>
                                        <Link to={{ pathname: `/collections/pack/papouf-Boxes` }}>
                                            <button className='btn' >Shop Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="carousel-content">
                                    <img className="carousel-img2" alt="" />
                                    <div className="text">
                                        <div className="title ">Lorem Ipsum is simply dummy text </div>
                                        <div className="subtitle ">It was popularised in the 1960s with the release of Letraset</div>
                                        <Link to={{ pathname: `/collections/pack/papouf-Boxes` }}>
                                            <button className='btn' >Shop Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="featured-products">
                        <div className="acceuil-center-title pb-3 mt-4">
                            Produits en vedette cette semaine
                        </div>
                        <div className="row">
                            {featuredProducts.map(item => (
                                <div className="col-md-3 col-6  mt-5 mb-5 ">
                                    <Link to={{ pathname: `/DetailsItem`, search: `?type=${item.type}&item_id=${item.id}` }}>
                                 
                                            <div>
                                                <img alt="" src={this.get_featuredProductsImages(item.id)[0]} onMouseOver={e => e.currentTarget.src = this.get_featuredProductsImages(item.id)[1]} onMouseOut={e => e.currentTarget.src = this.get_featuredProductsImages(item.id)[0]} />
                                                {/*<span class="ribbon3">Personnalisable</span>*/}
                                                <div className="item-title mt-2 center">{item.title}</div>
                                                <div className="item-price center ">{item.sale_price} Dhs</div>
                                            </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="acceuil-center-title pb-3 mt-4">
                            Packs en vedette cette semaine
                        </div>
                        <div className="row">
                            {featuredPacks.map(item => (
                                <div className="col-md-3 col-6  mt-5 mb-5 ">
                                    <Link to={{ pathname: `/DetailsItem`, search: `?type=${item.type}&item_id=${item.id}` }}>                                       
                                            <div>
                                                <img alt="" src={this.get_featuredPacksImages(item.id)[0]} onMouseOver={e => e.currentTarget.src = this.get_featuredPacksImages(item.id)[1]} onMouseOut={e => e.currentTarget.src = this.get_featuredPacksImages(item.id)[0]} />
                                                {<span class="ribbon-customization">Personnalisable</span>}
                                                <div className="item-title mt-2 center">{item.title}</div>
                                                <div className="item-price center ">{item.sale_price} Dhs</div>
                                            </div>       
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="collections-description ">
                        <div className="acceuil-center-title pb-3 mt-4">
                            Nos personnalisables  collections
                        </div>
                        <div className="row mt-5 mb-5">
                            <div className="single-collection col-md-4 col-6 p-2 ">
                                <div className="hover ">
                                    <a href="/collections/pack/papouf-Boxes">
                                        <img src="assets/images/bag_22.jpg" alt="" />
                                    </a>
                                </div>
                                <center className="hover-content">
                                    <div className="title">Papouf Pack </div>
                                </center>
                            </div>
                            <div className="single-collection col-md-4 col-6 p-2 ">
                                <div className="hover">
                                    <a href="/collections/pack/Papouf-Fornitures">
                                        <img src="assets/images/bag_20.jpg" alt="" />
                                    </a>
                                </div>
                                <div className="hover-content">


                                    <div className="title">Meubles, équipements </div>
                                </div>
                            </div>
                            <div className="single-collection col-md-4 col-6 p-2 ">
                                <div className="hover">
                                    <a href="#">
                                        <img src="assets/images/bag_21.jpg" alt="" />
                                    </a>
                                </div>
                                <div className="hover-content ">


                                    <div className="title">Voluptas</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Acceuil;