import React, { Component } from "react";
import Carousel from 'react-grid-carousel'

import axios from 'axios';
import { FaShippingFast } from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';
import { GiReceiveMoney } from 'react-icons/gi';
import { IconContext } from "react-icons";
import { ImNext2 } from 'react-icons/im';
import axiosInstance from "./auth/axios";
import { Link } from "react-router-dom";

import Item from '../util/item_display'

class Acceuil extends Component {
    constructor() {
        super()
        this.state = {
            featuredItems: [],
            itemsImages: [],
            isDataLoading: true,
            isItemsImagesLoading: true,

        }
    }
    async componentDidMount() {
        const items = await axiosInstance.get('api/variation/collection?status=Featured&&nbOfproducts=2&&nbOfpacks=2')
        console.log('n', items.data)
        this.setState({
            featuredItems: items.data,
            isDataLoading: false
        })
        axiosInstance.get('api/images/collection?status=Featured&&nbOfproducts=2&&nbOfpacks=2')
            .then((res) => {
                console.log('images', res.data)
                this.setState({
                    itemsImages: res.data,
                    isItemsImagesLoading: false
                })
            })
    }
    get_itemImages = (item_id) => {
        const itemsImages = this.state.itemsImages
        let images = [];
        let indexOf_item_images = itemsImages.findIndex(element => element.item_id === item_id)
        itemsImages[indexOf_item_images]?.images.forEach(element => {
            images.push(element.image)
        });
        return images
    }


    render() {
        const { featuredItems, itemsImages, isDataLoading, isItemsImagesLoading } = this.state

        return (
            <div className="acceuil pb-5 container  ">
                <div className="carousel mt-1 pb-3 ">
                    <Carousel mobileBreakpoint={0} showDots={true}>
                        <Carousel.Item>
                            <div className="carousel-content pb-5">
                                <img className="carousel-img2" alt="" />
                                <div className="text">
                                    <div className="title">Lorem Ipsum is simply dummy text </div>
                                    <div className="subtitle">It was popularised in the 1960s with the release of Letraset</div>
                                    <button className='btn'>Shop Now</button>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="carousel-content">
                                <img className="carousel-img2" alt="" />
                                <div className="title">

                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="featured-products">
                    <div className="acceuil-center-title p-5">
                        Featured Products This Week
                    </div>
                    <div className="row">
                        {featuredItems.map(item => (
                            <div className="col-md-3 col-6  mt-3 ">
                                <Link to={{ pathname: `/DetailsItem` }}>
                                    <Item isItemsImagesLoading={isItemsImagesLoading} title={item.title} sale_price={item.sale_price} images={this.get_itemImages(item.id)} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="collections-description ">
                    <div className="acceuil-center-title p-5">
                        Our Collections
                    </div>
                    <div className="row">
                        <div className="single-collection col-md-4 col-6 p-2 ">
                            <div className="hover ">
                                <a href="shop.html">
                                    <img src="assets/images/3.jpg" alt="" />
                                </a>
                            </div>
                            <div className="hover-content">
                                <div className="subtitle">From 180 DH</div>
                                <div className="title">Standart Products </div>
                            </div>
                        </div>
                        <div className="single-collection col-md-4 col-6 p-2 ">
                            <div className="hover">
                                <a href="shop.html">
                                    <img src="assets/images/4.jpg" alt="" />
                                </a>
                            </div>
                            <div className="hover-content">
                                <div className="line"></div>
                                <div className="subtitle">From 180 DH</div>
                                <div className="title">Papouf Packs</div>
                            </div>
                        </div>
                        <div className="single-collection col-md-4 col-6 p-2 ">
                            <div className="hover">
                                <a href="shop.html">
                                    <img src="assets/images/8.jpg" alt="" />
                                </a>
                            </div>
                            <div className="hover-content ">
                                <div className="line"></div>
                                <div className="subtitle">From 180 DH</div>
                                <div className="title">Papouf made</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 ">
                    <div className="about-us mt-5">
                        <div className="row">
                            <div className="col-md-8 col-12">
                                <h1 >A propos de nous</h1>
                                <p className="mt-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.el text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                <br />
                                <p className="">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.el text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                                <br />
                                <p className="">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                            <div className="col-md-4 col-5 mt-5">
                                <img src="./assets/images/bag_13.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="about-us mt-5 mb-5">
                        <h1 className="text-center">Social media</h1>

                        <div className="social-media mt-3">
                            <a href="#" class="fa fa-facebook"></a>
                            <a href="#" class="fa fa-instagram"></a>
                            <a href="#" class="fa fa-twitter"></a>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default Acceuil;