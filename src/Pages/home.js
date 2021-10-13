import React, { Component } from "react";
import Carousel from 'react-grid-carousel'
import { IconContext } from "react-icons";
import axiosInstance from "./auth/axios";
import { Link } from "react-router-dom";
import { MdLocalShipping } from 'react-icons/md';
import { MdAssignmentReturn } from 'react-icons/md';
import { RiChat3Line } from 'react-icons/ri';


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
class Home extends Component {
    constructor() {
        super()
        this.state = {
            featuredProducts: [],
            featuredProductsImages: [],
            isDataLoading: true,
            isItemsImagesLoading: true,
            featuredPacks: [],
            featuredPacksImages: [],
            isfeaturedPacksImagesLoading: true,
            isfeaturedProductsImagesLoading: true,


        }
    }
    async componentDidMount() {
        const [products, packs] = await Promise.all([
            axiosInstance.get('api-collections/featured/product?page=1&page_size=4'),
            axiosInstance.get('api-collections/featured/pack?page=1&page_size=4'),
        ])
        this.setState({
            featuredProducts: products.data.results,
            featuredPacks: packs.data.results,

        })

        axiosInstance.get('api-images/featured/product')
            .then((res) => {
                this.setState({
                    featuredProductsImages: res.data,
                    isItemsImagesLoading: false,
                    isfeaturedProductsImagesLoading: false
                })
            })
        axiosInstance.get('api-images/featured/pack')
            .then((res) => {
                this.setState({
                    featuredPacksImages: res.data,
                    isItemsImagesLoading: false,
                    isfeaturedPacksImagesLoading: false
                })
            })
    }
    get_featuredProductsImages = (item_id) => {
        const productsImages = this.state.featuredProductsImages
        let images = [];
        let indexOf_item_images = productsImages.findIndex(element => element.item_id === item_id)
        productsImages[indexOf_item_images]?.images.forEach(element => {
            images.push(element)
        });

        return images
    }
    get_featuredPacksImages = (item_id) => {
        const packsImages = this.state.featuredPacksImages
        let images = [];
        let indexOf_item_images = packsImages.findIndex(element => element.item_id === item_id)
        packsImages[indexOf_item_images]?.images.forEach(element => {
            images.push(element)
        });


        return images
    }
    render() {
        const { featuredProducts, featuredPacks, isDataLoading, isItemsImagesLoading, isfeaturedPacksImagesLoading, isfeaturedProductsImagesLoading } = this.state

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
                                        <div className="title ">Personalized hand and heartmade gifts.
                                        </div>
                                        <div className="subtitle ">We share love, gifts, ideas, positivity nd anything beautiful.</div>
                                        <Link to={{ pathname: `/collections/pack/papouf-boxes` }}>
                                            <button className='btn' >Shop Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="carousel-content">
                                    <img className="carousel-img2" alt="" />
                                    <div className="text">
                                        <div className="title ">Personalized hand and heartmade gifts.</div>
                                        <div className="subtitle ">We share love, gifts, ideas, positivity nd anything beautiful.</div>
                                        <Link to={{ pathname: `/collections/pack/papouf-boxes` }}>
                                            <button className='btn' >Shop Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="featured-products">
                        <div className="acceuil-center-title pb-3 mt-4">
                            Packs en vedette cette semaine
                        </div>
                        <div className="row">
                            {featuredPacks.map(item => (
                                <div className="col-md-3 col-6  mt-5 mb-5 ">
                                    {!isfeaturedPacksImagesLoading ? (
                                        <Link to={{ pathname: `/item/${item.type}/${item.id}` }}>
                                            <div>
                                                <img alt="" src={this.get_featuredPacksImages(item.id)[0]} onMouseOver={e => e.currentTarget.src = this.get_featuredPacksImages(item.id)[1]} onMouseOut={e => e.currentTarget.src = this.get_featuredPacksImages(item.id)[0]} />
                                                {<span class="ribbon-customization">Personnalisable</span>}
                                                <div className="item-title mt-2 center">{item.title}</div>
                                                <div className="item-price center ">{item.sale_price} Dhs</div>
                                            </div>
                                        </Link>
                                    ) :
                                        <center className="lds-spinner pt-5 pb-5 bg-dark"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></center>
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="acceuil-center-title pb-3 mt-4">
                            Produits en vedette cette semaine
                        </div>
                        <div className="row">
                            {featuredProducts.map(item => (
                                <div className="col-md-3 col-6  mt-5 mb-5 ">
                                    {!isfeaturedProductsImagesLoading ? (
                                        <Link to={{ pathname: `/item/${item.type}/${item.id}` }}>
                                            <div>
                                                <img alt="" src={this.get_featuredProductsImages(item.id)[0]} onMouseOver={e => e.currentTarget.src = this.get_featuredProductsImages(item.id)[1]} onMouseOut={e => e.currentTarget.src = this.get_featuredProductsImages(item.id)[0]} />
                                                {/*<span class="ribbon3">Personnalisable</span>*/}
                                                <div className="item-title mt-2 center">{item.title}</div>
                                                <div className="item-price center ">{item.sale_price} Dhs</div>
                                            </div>
                                        </Link>

                                    ) :
                                        <center className="lds-spinner pt-5 pb-5 bg-dark"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></center>
                                    }
                                </div>
                            ))}
                        </div>

                    </div>
                  
                </div>
            </div>

        )
    }
}

export default Home;