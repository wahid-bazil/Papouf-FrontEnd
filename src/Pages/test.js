import React, { Component } from "react";
import axiosInstance from "./auth/axios";
import Drawer from '@material-ui/core/Drawer';
import html2canvas from 'html2canvas'
import axios from "axios";
import { CSSTransition } from 'react-transition-group';
import Carousel from 'react-grid-carousel'
import { IconContext } from "react-icons";
import { FaChevronRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            image: "",
            selctedCategory: [],
            firstChildCategory: [],
            secondChildCategory: [],
            currentPanelState0: [],
            inc: true,
            categories: [
                {
                    "title": "packs",
                    
                    "children": [
                        {
                            "id": 19,
                            "title": "papouf-Boxes",
                            "label": "papouf Boxes",
                            "image":"./assets/images/bag_15.png",
                            "children": [
                                {
                                    "id": 1,
                                    "title": "Atay-Box",
                                    "label": "Atay Box",
                                    "children": []
                                },
                                {
                                    "id": 2,
                                    "title": "Café-Box",
                                    "label": "Café Box",
                                    "children": []
                                },
                                {
                                    "id": 3,
                                    "title": "Candies-Box",
                                    "label": "Candies Box",
                                    "children": []
                                },
                                {
                                    "id": 4,
                                    "title": "Candles-Box",
                                    "label": "Candles Box",
                                    "children": []
                                },
                                {
                                    "id": 5,
                                    "title": "Beauty-Box",
                                    "label": "Beauty Box",
                                    "children": [
                                        {
                                            "id": 6,
                                            "title": "Hamam-Box",
                                            "label": "Hamam Box",
                                            "children": []
                                        },
                                        {
                                            "id": 18,
                                            "title": "Aaroussa box",
                                            "label": null,
                                            "children": []
                                        }
                                    ]
                                },
                                {
                                    "id": 7,
                                    "title": "Special-Gift-Box",
                                    "label": "Special Gift Box",
                                    "children": []
                                },
                                {
                                    "id": 8,
                                    "title": "Relaxing-Box",
                                    "label": "Relaxing Box",
                                    "children": []
                                },
                                {
                                    "id": 9,
                                    "title": "Picnic-Box",
                                    "label": "Picnic Box",
                                    "children": []
                                },
                                {
                                    "id": 10,
                                    "title": "Love-Box",
                                    "label": "Love Box",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 20,
                            "title": "Papouf-Fornitures",
                            "label": "Papouf Fornitures",
                            "image":"./assets/images/bag_10.png",
                            "children": [
                                {
                                    "id": 11,
                                    "title": "category1",
                                    "label": "category1",
                                    "children": []
                                },
                                {
                                    "id": 12,
                                    "title": "category2",
                                    "label": "category2",
                                    "children": []
                                },
                                {
                                    "id": 13,
                                    "title": "category3",
                                    "label": "category3",
                                    "children": []
                                },
                                {
                                    "id": 14,
                                    "title": "category4",
                                    "label": "category4",
                                    "children": []
                                },
                                {
                                    "id": 15,
                                    "title": "category5",
                                    "label": "category5",
                                    "children": []
                                },
                                {
                                    "id": 16,
                                    "title": "category6",
                                    "label": "category6",
                                    "children": []
                                },
                                {
                                    "id": 17,
                                    "title": "category7",
                                    "label": "category7",
                                    "children": []
                                }
                            ]
                        }
                    ],
                },
                {
                    "title": "products",
                    "children": []
                }
            ]
        }
    }
    onLeave = () => {
        this.setState({ inc: true, selctedCategory: null, firstChildCategory: null })

    }
    onChangeCategory = (e) => {
        const category_title = e.currentTarget.id
        var indexOf_category = this.state.categories.findIndex(child => child.title === category_title)

        this.setState({ selctedCategory: this.state.categories[indexOf_category],firstChildCategory:null, inc: false })


    }
    onChangeFirstChild = (e) => {
        console.log(this.state.selctedCategory)
        const child_title = e.currentTarget.id
        var indexOf_category = this.state.selctedCategory.children.findIndex(child => child.title === child_title)
        console.log(this.state.categories[indexOf_category])
        this.setState({ firstChildCategory: this.state.selctedCategory.children[indexOf_category], inc: false })

    }



    render() {

        const { currentPanelState, currentPanelState0, inc, papufBoxes, papoufFornitures, selctedCategory, firstChildCategory, secondChildCategory } = this.state

        return (
            <div className="navBar mt-5 pt-5">
                <div onMouseLeave={this.onLeave} className=" d-flex flex-column">
                    <ul className="main-navBar0 ">
                        <li id={'products'} onMouseOver={this.onChangeCategory} className="main-title">
                            <a>Products</a>
                        </li>
                        <li id={'packs'} onMouseOver={this.onChangeCategory}>
                            <a>Des Packs Personnalisable</a>
                        </li>
                        <li id={'packs'} onMouseOver={this.onChangeCategory}>
                            <a>Des Packs Personnalisable</a>
                        </li>
                        <li id={'packs'} onMouseOver={this.onChangeCategory}>
                            <a>Des Packs Personnalisable</a>
                        </li>
                        <li id={'packs'} onMouseOver={this.onChangeCategory}>
                            <a>Des Packs Personnalisable</a>
                        </li>
                        <li id={'packs'} onMouseOver={this.onChangeCategory}>
                            <a>Des Packs Personnalisable</a>
                        </li>
                        <li id={'packs'} onMouseOver={this.onChangeCategory}>
                            <a>Des Packs Personnalisable</a>
                        </li>

                    </ul>

                    <div className={`dropdown ${inc ? ('display-none') : ''}`}>
                        <div className="d-flex dropdown0-options   ">
                            <ul className="main-list col-4 p-0 ">
                                {selctedCategory?.children?.map(child => (
                                    <li id={child.title} onMouseOver={this.onChangeFirstChild}>
                                        <a>{child.label}</a>
                                        {child.children.length != 0 ? (<span className="float-right"><FaChevronRight /></span>) : null}
                                    </li>
                                ))}
                            </ul>
                            <div className="col-8 pr-0 pl-0 pb-0 pt-2 dropdown-content">
                                <div className="float-right col-4">
                                    <img src={firstChildCategory?.image} />
                                </div>
                                <div className="col-8 p-0">
                                    <div className="row">
                                        <div className="col-6  p-0">
                                            {firstChildCategory?.children?.slice(0, 5).map(child => (
                                                <div className=" col-12   ">
                                                    <div className="title ">
                                                        {child.label}
                                                    </div>
                                                    <ul className="second-list">
                                                        {child.children.map(child => (
                                                            <li>
                                                                <a>{child.label}</a>
                                                            </li>
                                                        ))}

                                                    </ul>
                                                </div>

                                            ))}
                                        </div>
                                        <div className="col-6  p-0">
                                            {firstChildCategory?.children?.slice(6).map(child => (
                                                <div className=" col-12  ">
                                                    <div className="title">
                                                        {child.label}
                                                    </div>
                                                    <ul className="second-list">
                                                        {child.children.map(child => (
                                                            <li>
                                                                <a>{child.label}</a>
                                                            </li>
                                                        ))}

                                                    </ul>
                                                </div>

                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>



                    </div>


                </div>
            </div>





        )
    }
}
export default Test