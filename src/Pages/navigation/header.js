import React, { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { FaChevronRight } from 'react-icons/fa';
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
							"title": "papouf-boxes",
							"slug": "Papouf Boxes",
							"image": "./assets/images/bag_15.png",
							"children": [
								{
									"id": 8,
									"title": "relaxing-box",
									"slug": "Relaxing Box",
									"children": [
										{
											"id": 1,
											"title": "atay-box",
											"slug": "Atay Box",
											"children": []
										},
										{
											"id": 2,
											"title": "cafe-box",
											"slug": "Café Box",
											"children": []
										},
									]
								},
								{
									"id": 5,
									"title": "beauty-box",
									"slug": "Beauty Box",
									"children": [
										{
											"id": 6,
											"title": "hamam-box",
											"slug": "Hamam Box",
											"children": []
										},
										{
											"id": 18,
											"title": "aaroussa-box",
											"slug": "Aaroussa box",
											"children": []
										}
									]
								},
							
								{
									"id": 3,
									"title": "candies-box",
									"slug": "Candies Box",
									"children": []
								},
								{
									"id": 4,
									"title": "candles-box",
									"slug": "Candles Box",
									"children": []
								},
						
								{
									"id": 7,
									"title": "special-gift-box",
									"slug": "Special Gift Box",
									"children": []
								},
							
								{
									"id": 9,
									"title": "picnic-box",
									"slug": "Picnic Box",
									"children": []
								},
								{
									"id": 10,
									"title": "love-box",
									"slug": "Love Box",
									"children": []
								}
							]
						},
						{
							"id": 20,
							"title": "meubles-et-equipements",
							"slug": "Meubles et équipements",
							"image": "",
							"children": [
								{
									"id": 11,
									"title": "canape-traditionnel",
									"slug": "Canapé traditionnel",
									"children": []
								}
							
							]
						}
					],
				},

				{
					"id": 1,
					"title": "Lorem",
					"slug": "Lorem",
					"children": [],

				},
				{
					"id": 2,
					"title": "Art et collections",
					"slug": "Art et collections",
					"children": []
				},
				{
					"id": 3,
					"title": "Mariage et fêtes",
					"slug": "Mariage et fêtes",
					"children": []
				},
				{
					"id": 4,
					"title": "Plantes",
					"slug": "Plantes",
					"children": []
				},
				{
					"id": 5,
					"title": "Fournitures créatives et outils",
					"slug": "Fournitures créatives et outils",
					"children": []
				},
				{
					"id": 6,
					"title": "Voluptas",
					"slug": "Voluptas",
					"children": []
				},
				{
					"id": 7,
					"title": "Maison et décoration",
					"slug": "Maison et décoration",
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
							<li><a>Papouf Coopérative</a></li>
							
						</div>
					</div>
					<div className="logo  col-12 col-lg-6 ">
						<div className=" d-flex flex-column align-items-center justify-content-center p-3 ">
							<a href='/'><div className="logo-title ">Papouf</div></a>
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

							<li className={`underline ${'Maison et décoration' === selctedCategory?.title ? ('active') : ''}`} id={'Maison et décoration'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/maison-et-decoration">Maison et décoration</a>
							</li>
							<li className={`underline ${'Art et collections' === selctedCategory?.title ? ('active') : ''}`} id={'Art et collections'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/art-et-collections"> Art et collections</a>
							</li>
							<li className={`underline ${'Mariage et fêtes' === selctedCategory?.title ? ('active') : ''}`} id={'Mariage et fêtes'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/mariage-et-fetes">Mariage et fêtes</a>
							</li>
							<li className={`underline ${'Plantes' === selctedCategory?.title ? ('active') : ''}`} id={'Plantes'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/plantes">Plantes</a>
							</li>
							<li className={`underline ${'Fournitures créatives et outils' === selctedCategory?.title ? ('active') : ''}`} id={'Fournitures créatives et outils'} onMouseOver={this.onChangeCategory} >
								<a href="./collections/product/fournitures-creatives-et-outils">Fournitures créatives et outils</a>
							</li>
						

						</ul>
						<div className={`dropdown bg-white pl-5 pr-5 ${inc ? ('display-none') : ''}`}>
							<div className="d-flex dropdown-options   ">
								<ul className="main-list col-3 p-0  ">
									{selctedCategory?.children?.map(child => (
										<li id={child.title} onMouseOver={this.onChangeFirstChild}>
											<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.slug} <span className="float-right"><FaChevronRight /></span></a>
										</li>
									))}
								</ul>
								<div className="col-9 pr-0 pl-2 pb-0 pt-2 dropdown-content ">
									<div className="float-right col-4">
										<img src={firstChildCategory?.image} />
										
									</div>
									<div className="col-8 p-0">
										<div className="row">
											<div className="col-6  p-0">
												{firstChildCategory?.children?.slice(0, 5).map(child => (
													<div className=" col-12   ">
														<div className="title ">
															<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.slug}</a>
														</div>
														<ul className="second-list ">
															{child.children.map(child => (
																<li>
																	<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.slug}</a>
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
															<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.slug}</a>
														</div>
														<ul className="second-list">
															{child.children.map(child => (
																<li>
																	<a href={`./collections/${selctedCategory.title}/${child.title}`}>{child.slug}</a>
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