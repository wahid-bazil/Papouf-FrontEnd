import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { FaRegWindowClose } from 'react-icons/fa';
import axios from 'axios';
import Panier from '../Pages/panier'
import axiosInstance from './auth/axios'
import { FaSortDown } from "react-icons/fa";
import { GoChevronRight } from "react-icons/go";
import DropDown from '../util/header_dropdown';
import IconButton from '@material-ui/core/IconButton';
import { FaChevronRight } from 'react-icons/fa';
import { createGenerateClassName } from "@material-ui/core";
import Badge from '@material-ui/core/Badge';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			activeDroDown: 0,
			selctedCategory: [],
			firstChildCategory: [],
			secondChildCategory: [],
			inCategoryHover: false,
			inc: true,
			active: false,
			inCustomization: false,
		

			categories: [
				{
					"title": "pack",
					"children": [
						{
							"id": 19,
							"title": "papouf-Boxes",
							"label": "Papouf Boxes",
							"image": "./assets/images/bag_15.png",
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
											"title": "Aaroussa-box",
											"label": "Aaroussa box",
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
							"label": "Meubles, équipements",
							"image": "./assets/images/bag_10.png",
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
					"id": 1,
					"title": "Lorem",
					"label": "Lorem",
					"children": [],

				},
				{
					"id": 2,
					"title": "McClintock",
					"label": "McClintock",
					"children": []
				},
				{
					"id": 3,
					"title": "Lorem-Ipsum",
					"label": "Lorem Ipsum",
					"children": []
				},
				{
					"id": 4,
					"title": "Specimen",
					"label": "Specimen",
					"children": []
				},
				{
					"id": 5,
					"title": "Righteous",
					"label": "Righteous",
					"children": []
				},
				{
					"id": 6,
					"title": "Voluptas",
					"label": "Voluptas",
					"children": []
				},
				{
					"id": 7,
					"title": "Finibus",
					"label": "Finibus",
					"children": []
				},


			]



		};
		this.logout = this.logout.bind(this);
	}




	logout = () => {
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('access_token');
		localStorage.removeItem('device_id');
		localStorage.removeItem('id');
		window.location.reload();
	}





	onLeave = () => {
		this.setState({ inc: true, inCategoryHover: false, inCustomization: false, selctedCategory: null, firstChildCategory: null })
	}
	onChangeCategory = (e) => {
		const category_title = e.currentTarget.id
		this.setState({ inCategoryHover: true }, () => {
			var indexOf_category = this.state.categories.findIndex(child => child.title === category_title)
			setTimeout((e) => {
				if (this.state.inCategoryHover) {
					this.setState({
						selctedCategory: this.state.categories[indexOf_category],
						firstChildCategory: this.state.categories[indexOf_category]?.children[0],
						inc: false
					})
				}

			}, 200);

		})


	}
	onChangeFirstChild = (e) => {
		const child_title = e.currentTarget.id
		var indexOf_category = this.state.selctedCategory.children.findIndex(child => child.title === child_title)
	
		this.setState({ firstChildCategory: this.state.selctedCategory.children[indexOf_category], inc: false })

	}
	onSelectCustomization = () => {
		this.setState({ inCategoryHover: true }, () => {
			setTimeout(() => {
				if (this.state.inCategoryHover) {
					this.setState({ inc: true, inCustomization: true, selctedCategory: { title: 'customization' } })

				}

			}, 200);
		})


	}
	getClassName = (e) => {
		const category_title = e.currentTarget.id
		if (category_title === this.state.selctedCategory.title) {
			return 'line'
		}
	}
	getActiveCategory = (e) => {

		const category_title = e.currentTarget.id
		
		if (category_title === this.state.selctedCategory.title) {
			return 'active'
		}
	}
	openClientInfo = ()=>{

		if (localStorage.getItem('access_token')) {
			this.props.openClientInfo()
		}
		else {
		
			window.location.href = '/LogIn';
		}
	}
	


	render() {
		const { isLoged ,cartLenght, ordersLenght } = this.props
		const { currentPanelState, currentPanelState0, inc, inCustomization, papufBoxes, papoufFornitures, active, selctedCategory, firstChildCategory, secondChildCategory} = this.state
		const { openCart, handleMenu, papoufBoxes } = this.props



		let categories = []
		this.state.categories.forEach(category => {
			if (category.parent === null) {
				categories.push(category)
			}
		});
		
		return (
			<div className="header  " >
				<div className="row">
					<div className="header-left  col-12 col-lg-3 ">
						<div className="d-flex justify-content-start align-items-center mt-lg-5 ">
							<li><a>About us</a></li>
							<li><a>Contact us</a></li>
						</div>
					</div>
					<div className="logo  col-12 col-lg-6 ">
						<div className=" d-flex flex-column align-items-center justify-content-center p-3 ">
							<a href='./Acceuil'><div className="logo-title ">Papouf</div></a>
							<div className="logo-subtitle">From Our Hand To Your Soul</div>
						</div>
					</div>
					<div className="header-right d-flex justify-content-between  col-lg-3  	  ">
						<div className="menu_phone col-6 ">
							<button className="btn1   " onClick={handleMenu}><i><FiMenu /></i></button>
						</div>
						{parseInt(ordersLenght) != 0 ? (
							<button className="btn1 mr-md-5" onClick={this.openClientInfo}><i><Badge badgeContent={parseInt(ordersLenght)} color="secondary"><VscAccount /></Badge></i></button>
						) :
							<button className="btn1 mr-md-5" onClick={this.openClientInfo}><i><VscAccount /></i></button>
						}
						{parseInt(cartLenght) != 0 ? (
							<button className="btn1 mr-md-5" onClick={openCart}><i><Badge badgeContent={parseInt(cartLenght)} color="secondary"><FiShoppingCart /></Badge></i></button>
						) :
							<button className="btn1 mr-md-5" onClick={openCart}><i><FiShoppingCart /></i></button>}

						{isLoged ? (<button className="btn1 mr-md-5" onClick={this.logout}><i><FiLogOut /></i></button>) : null}
					</div>
				</div>
				<div className="navBar p-0">
					<nav onMouseLeave={this.onLeave} className=" d-flex flex-column p-0 ">
						<ul className="main-navBar row justify-content-between  pt-2 pb-2 m-0 ">
							<li className={`underline ${'pack' === selctedCategory?.title ? ('active') : ''}`} id={'pack'} onMouseOver={this.onChangeCategory}>
								<a className="default-cursor">Des Packs Personnalisable </a>
							</li>

							<li className={`underline ${'Finibus' === selctedCategory?.title ? ('active') : ''}`} id={'Finibus'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/Finibus">Finibus</a>
							</li>
							<li className={`underline ${'McClintock' === selctedCategory?.title ? ('active') : ''}`} id={'McClintock'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/McClintock"> McClintock</a>
							</li>
							<li className={`underline ${'Lorem-Ipsum' === selctedCategory?.title ? ('active') : ''}`} id={'Lorem-Ipsum'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/Lorem-Ipsum">Lorem Ipsum</a>
							</li>
							<li className={`underline ${'Specimen' === selctedCategory?.title ? ('active') : ''}`} id={'Specimen'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/Specimen">Specimen</a>
							</li>
							<li className={`underline ${'Righteous' === selctedCategory?.title ? ('active') : ''}`} id={'Righteous'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/Righteous">Righteous</a>
							</li>
							<li className={`underline ${'Voluptas' === selctedCategory?.title ? ('active') : ''}`} id={'Voluptas'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/Voluptas">Voluptas</a>
							</li>

						</ul>
						<div className={`dropdown bg-white pl-5 pr-5 ${inc ? ('display-none') : ''}`}>
							<div className="d-flex dropdown-options   ">
								<ul className="main-list col-3 p-0  ">
									{selctedCategory?.children?.map(child => (
										<li id={child.title} onMouseOver={this.onChangeFirstChild}>
											<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.label} <span className="float-right"><FaChevronRight /></span></a>
										</li>
									))}
								</ul>
								<div className="col-9 pr-0 pl-2 pb-0 pt-2 dropdown-content ">
									<div className="float-right col-4">
										<img src={firstChildCategory?.image} />
										<center className="img-label">{firstChildCategory?.label}</center>
									</div>
									<div className="col-8 p-0">
										<div className="row">
											<div className="col-6  p-0">
												{firstChildCategory?.children?.slice(0, 5).map(child => (
													<div className=" col-12   ">
														<div className="title ">
															<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.label}</a>
														</div>
														<ul className="second-list ">
															{child.children.map(child => (
																<li>
																	<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.label}</a>
																</li>
															))}

														</ul>
													</div>
												))}
											</div>
											<div className=" col-6  p-0">
												{firstChildCategory?.children?.slice(6).map(child => (
													<div className=" col-12  ">
														<div className="title">
															<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.label}</a>
														</div>
														<ul className="second-list">
															{child.children.map(child => (
																<li>
																	<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.label}</a>
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
					</nav>
				</div>
			</div>
		)
	}
}

export default Header;