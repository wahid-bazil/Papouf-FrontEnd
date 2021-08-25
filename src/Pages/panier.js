import React, { Component } from "react";

import { CSSTransition } from 'react-transition-group';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaRegWindowClose } from 'react-icons/fa';
import { BiArrowBack } from "react-icons/bi";
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import axiosInstance from "./auth/axios";
import { IconContext } from "react-icons";
class Panier extends Component {
	constructor() {
		super();
		this.state = {
			selectedPack: null,
			selectedPackBoxeImages: [],
			selectedPackItemsImages: [],
			selectedPackUserImages: [],
			selectedPackBoxeImages: [],
			isDialogOpen: false,
			isDataLoading: false


		}
		this.packDetails = this.packDetails.bind(this)
	}
	async packDetails(pack) {
		const pack_id = pack.id
		const boxe_id = pack.boxe.id

		this.setState({
			selectedPack: pack,
			isDialogOpen: true,
			isDataLoading: true
		})
		try {
			const [packItemsImages, packBoxeImages] = await Promise.all([
				axiosInstance.get(`api/images/custompackarticle?id=${pack_id}`),
				//.get(`api/images/userimages/custompack/${pack_id}`),
				axiosInstance.get(`api/images/boxe/${boxe_id}`)
			])

			this.setState({
				selectedPackBoxeImages: packBoxeImages.data.images,
				selectedPackItemsImages: packItemsImages.data,
				//selectedPackUserImages: packUserImages.data.userimages,


				isDataLoading: false
			})

		}
		catch {

		}

	}
	get_CustomPackitem_images = (custompackitem_id) => {
		const selectedPackItemsImages = [...this.state.selectedPackItemsImages]
		let indexOf_custompackitem_Images = selectedPackItemsImages.findIndex(element => element.custompackitem_id === custompackitem_id);
		let images = [];
		selectedPackItemsImages[indexOf_custompackitem_Images]?.custompackitem_images.images.forEach(element => {
			images.push(element.image)
		});
		return images
	}
	render() {
		const { isCartLoading, cartItems, isChangingQuantityloading, updatingItem, CartItemAnimation, cartItemsImages, isCartImagesLoading } = this.props
		const { isDataLoading, isDialogOpen, selectedPack, selectedPackBoxeImages, selectedPackItemsImages } = this.state
		function updateItemHandler(id) {
			if (isChangingQuantityloading) {
				if (updatingItem == id) {
					return 'opacity-5 avoid-clicks'
				}
			}
		}
		var subtotal = 0
		cartItems.forEach(cartitem => {
			subtotal += cartitem.quantity * cartitem.item.sale_price
		});
		function ItemImages(item_id) {
			let indexOf_cartitem_images = cartItemsImages.findIndex(element => element.cartitem_id === item_id)
			return cartItemsImages[indexOf_cartitem_images]?.cartitem_images?.images[0]?.image
			
		}

		return (
			<div className="cart-drawer">
				{!isCartLoading ? (
					<div className="">
						<div className="cart-items">
							<IconButton className="btn-close" onClick={this.props.close}><IconContext.Provider value={{ color: "black" }}><FaRegWindowClose /></IconContext.Provider></IconButton>
							<center className="item-price pt-2 ">
								Panier
							</center>
							<div>
								{cartItems.map(cartitem => (
									<div key={cartitem.cartitem_id} className={`${CartItemAnimation} mb-3`}>
										<div className={` row  mt-3  `}>
											<div className="item-img center col-4 p-0 ">
												{isCartImagesLoading ? (
													<center className="pb-5 ">
														<center class="lds-spinner float-left "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></center>
													</center>) : <div>{cartitem.item.type === "custompack" ? (
														<Link onClick={() => window.location.href = `/Customization/Papouf-Boxes?pack_id=${cartitem.item.id}`}>
															<Badge badgeContent={"Personnalisé "} color="primary">
																<img alt="" src={ItemImages(cartitem.cartitem_id)} />
															</Badge>

														</Link>

													) :
														<Link to={{ pathname: `/DetailsItem`, search: `?type=${cartitem.item.type}&item_id=${cartitem.item.id}` }} onClick={() => window.location.href = `/DetailsItem?type=${cartitem.item.type}&item_id=${cartitem.item.id}`}>
															<img alt="" src={ItemImages(cartitem.cartitem_id)} />
														</Link>
													}</div>}


											</div>
											<div className=" col-8 p-1 d-flex  align-items-center ">
												<div className="item-title">{cartitem.item?.title}  </div>

												{/*{cartitem.item.type === "custompack" ? (
													<center>
														<button className="btn btn-outline-secondary" onClick={() => this.packDetails(cartitem.item)}>Voir Details</button>
													</center>
												) : null}*/}


											</div>



										</div>
										<div className="row mt-1">
											<div className={`  col-6 p-0 row justify-content-center ${updateItemHandler(cartitem.cartitem_id)}`} >
												<IconButton title="minus" id={cartitem.cartitem_id} onClick={this.props.changeQuantity}>
													<FaMinus fontSize="small" />
												</IconButton>
												<div>{cartitem.quantity}</div>
												<IconButton title="plus" id={cartitem.cartitem_id} onClick={this.props.changeQuantity}>
													<FaPlus fontSize="small" />
												</IconButton>
											</div>
											<div className="item-price col-6 justify-content-center p-0">{cartitem.item?.sale_price * cartitem.quantity} DH</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="cart-total">
							<div className="cart-subtitle row justify-content-between pt-2">
								<div className="item-price">Sout-Total</div>
								<div className="item-price">{subtotal} DH</div>
							</div>
							<div>
								{subtotal != 0 ? (<center className="mt-3 cart-subtitle"><button className="btn" onClick={this.props.checkout} > Finalser Votre Commande	</button></center>) : null}
							</div>
						</div>
					</div>


				) :
					<center className="pack-details spinner">
						<div className="loader"></div>
					</center>
				}

			</div>
			/*
			<div className="cart-drawer">
				<Dialog
					className="dialog-content"
					fullWidth
					onClose={() => this.setState({ isDialogOpen: false })}
					style={{ position: 'fixed', zIndex: 4001, padding: 0, background: "transparent" }}
					open={isDialogOpen}
					fullWidth={true}
					aria-labelledby="max-width-dialog-title"
				>
					{!isDataLoading ? (
						<div>
							<DialogContent>
								<div className="pack-details">
									<div className="row">
										<div className="col-6 p-0">
											<div className="center">Boxe</div>
											<img src={selectedPackBoxeImages[0]?.image} alt="" />
										</div>
										<div className="col-6 p-0">
											<center>
												<img src="./assets/images/user-image.png" />
												<div><span className="msg-err">Aucune image</span></div>
											</center>
										</div>
									</div>
									<div className="mt-3">
										<div>Articles</div>
										<div className="row ">

											{selectedPackItemsImages?.map(item => (
												<div className="col-4 p-0">
													<img src={item.custompackitem_images.images[0].image} alt="" />
												</div>
											))}

										</div>
									</div>
								</div>
							</DialogContent>
							<DialogActions>
								<button className="btn btn-info" onClick={() => window.location.href = `/Customization/Papouf-Boxes?pack_id=${selectedPack.id}`}>Modifier</button>
							</DialogActions>
						</div>
					) :
						<center className="pack-details pinner">
							<div className="loader"></div>
						</center>
					}

				</Dialog>
				<div className=" container panier_list ">
					<div className="header_sidebare mt-3">
						<div className="row">
							<div className="col-3 ">
								<button className="btn1 " onClick={this.props.close}>{!this.props.iscliked1 ? (<FaRegWindowClose />) : <BiArrowBack />}</button>
							</div>
							<div className="col-9 d-flex justify-content-center align-items-center"> <h3>Your Cart</h3></div>
						</div>
					</div>
					<div>
						{!isCartLoading ? (cartItems.map(cartitem => (
							<div key={cartitem.cartitem_id} className={`row justify-content-between mt-3 ${CartItemAnimation}`}>
								<div className=" col-4 ">
									{isCartImagesLoading ? (
										<div className="mr-5">
											<div class="lds-spinner "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
										</div>

									) :
										<div className="border">
											{cartitem.item.type === "custompack" ? (
											
													<Badge badgeContent={"Personnalisé "} color="primary">
														<img alt="" src={ItemImages(cartitem.cartitem_id)} />
													</Badge>
												
											) :
												<Link to={{ pathname: `/DetailsItem`, search: `?type=${cartitem.item.type}&item_id=${cartitem.item.id}` }} onClick={() => window.location.href = `/DetailsItem?type=${cartitem.item.type}&item_id=${cartitem.item.id}`}>
													<img alt="" src={ItemImages(cartitem.cartitem_id)} />
												</Link>
											}
										</div>
									}
								</div>
								<div className=" col-8 mt-2  pb-2 ">
									<div className="">{cartitem.item?.title}</div>
									<div className="row justify-content-between ">
										<div>
											<div className={`row ${updateItemHandler(cartitem.cartitem_id)}`} >
												<IconButton title="minus" id={cartitem.cartitem_id} onClick={this.props.changeQuantity}>
													<FaMinus fontSize="small" />
												</IconButton>
												<div>{cartitem.quantity}</div>
												<IconButton title="plus" id={cartitem.cartitem_id} onClick={this.props.changeQuantity}>
													<FaPlus fontSize="small" />
												</IconButton>
											</div>
										</div>
										<div>{cartitem.item?.sale_price * cartitem.quantity} DH</div>
									</div>
									{cartitem.item.type === "custompack" ? (
										<center>
											<button className="btn btn-outline-secondary" onClick={() => this.packDetails(cartitem.item)}>Voir Details</button>
										</center>
									) : null}


								</div>

							</div>

						))) :
							<center>
								<div className="loader mt-5"></div>
							</center>
						}
					</div>
				</div>
				<div className="cart-bot-side">
					<div className="d-flex flex-column align-items-center justify-content-between">
						<div className=" col-12  row align-items-center justify-content-between pr-5 pl-5">
							<div className="row justify-content-between ">
								<div className="cart-subtitle ">Total</div>
								<div className="cart-subtitle">{subtotal} DH</div>
							</div>
						</div>
						<div>
							{subtotal !=0?(<div className="mt-3 cart-subtitle"><button className="btn btn-outline-success" onClick={this.props.checkout} > Finalser Votre Commande	</button></div>):null}
						</div>
					</div>
				</div>
			</div>*/
		)
	}

}
export default Panier