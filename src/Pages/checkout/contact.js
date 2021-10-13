import React, { Component } from "react";
import axiosInstance from "../auth/axios"
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import IconButton from '@material-ui/core/IconButton';
import { GrFormDown } from 'react-icons/gr';
import Badge from '@material-ui/core/Badge';
import Checkbox from '@material-ui/core/Checkbox';
import { GrFormUp } from 'react-icons/gr';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

class UserContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCartLoading: false,
            isClientinfoLoading: false,
            cartitems: [],
            cartitemsImages: [],
            subtotal: 0,
            isLoged: true,
            name: "",
            phone_number: "",
            address: "",
            city: null,
            name_err: null,
            second_name_err: null,
            phone_number_err: null,
            address_err: null,
            city_err: null,
            is_name_err: false,
            is_second_name: false,
            is_phone_number: false,
            is_address_err: false,
            is_city_err: false,
            isDataSaving: false,
            isDataLoading: true,
            isCartImagesLoading: false,
            expanded: false,
            height: 0,
            width: 0,

            isDataUploading: false,
            regions: [],
            cities: null,
            selectedRegion: null,
            selectedCity: null,

        }
        this.onChange = this.onChange.bind(this);
        this.SaveClientInfo = this.SaveClientInfo.bind(this)
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
        try {
            const userInfo = await axiosInstance.get(`api-user/details`)
            const cartDetails = await axiosInstance.get(`api-cart/`)
            this.setState({
                name: userInfo.data.name,
                phone_number: userInfo.data.phone_number,
                address: userInfo.data.address_details?.address,

                cartItems: cartDetails.data.cartitems,
                subtotal: cartDetails.data.subtotal,
                isDataLoading: false
            }, () => {
                if (this.state.address === undefined) {
                    this.setState({ address: "" })
                }
            })
            axiosInstance.get(`api-delivery/regions`)
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

            axiosInstance.get(`api-images/cartitems`)
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        cartitemsImages: res.data,
                        isCartImagesLoading: false
                    })
                })

        }
        catch {

        }
        
    }
    get_articleImages = (item_id,type) => {

        let indexOf_cartitem_images = this.state.cartitemsImages.findIndex(element => element.cartitem_images.item_id === item_id && element.cartitem_images.item_type === type);
        let images = [];
        this.state.cartitemsImages[indexOf_cartitem_images]?.cartitem_images?.images.forEach(element => {
            images.push(element)

        });

        return images
    }
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleChnageCity = (e) => {
        this.setState({ city: e.target.value })
    }
    async SaveClientInfo(e) {

        this.setState({ isDataSaving: true })
        if (this.state.is_name_err) {
            this.setState({ is_name_err: false, name_err: null })
        }
        if (this.state.is_second_name_err) {
            this.setState({ is_second_name_err: false, second_name_err: null })
        }
        if (this.state.is_phone_number_err) {
            this.setState({ is_phone_number_err: false, phone_number_err: null })
        }
        if (this.state.is_address_err) {
            this.setState({ is_address_err: false, address_err: null })
        }
        if (this.state.is_city_err) {
            this.setState({ is_city_err: false, city_err: null })
        }

        e.preventDefault();

        if (this.state.phone_number.length < 10) {
            this.setState({ phone_number_err: 'Numéro de Téléphone invalide', is_phone_number_err: true, isDataSaving: false })
        }
        else if (this.state.name.length === 0) {
            this.setState({ name_err: 'Champs requis', is_name_err: true, isDataSaving: false })
        }

        else if (this.state.address.length <= 10) {
            this.setState({ address_err: 'Votre Adresse est trop court (le minimum est 10 caractères)', is_address_err: true, isDataSaving: false })
        }
        else if (this.state.city === null) {
            this.setState({ city_err: 'Champs requis', is_city_err: true, isDataSaving: false })
        }
        else {
            console.log(this.state.city ,this.state.address ,  this.state.name)

            await axiosInstance.put(`api-user/contact-details`,
                    {
                        name: this.state.name,
                        phone_number: this.state.phone_number,
                        address_details: {
                            city: this.state.city,
                            details: this.state.address
                          },
                    }
                )
           
           

            this.props.history.push({ pathname: './delivery' })

        }

    }
    handleChnageRegion = (e) => {
        const selectedRegion = e.target.value
        this.setState({
            isRegionsLoading: true,
            selectedRegion
        }, () => {
            axiosInstance.get(`api-delivery/region-cites/${selectedRegion}`)
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



    handleAccordionDetails = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {


        const { cartItems, cartitemsImages, subtotal, expanded, regions, cities } = this.state
        const { isCartImagesLoading } = this.state
        const { name,  phone_number, address, city, isDataLoading } = this.state
        const { name_err, second_name_err, phone_number_err, address_err, city_err } = this.state
        const { is_name_err, is_second_name_err, is_phone_number_err, is_address_err, is_city_err, isDataSaving } = this.state

        return (
        
            
            <div className="checkout pb-5">
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
                        <div className="checkout-user-info-content container  ">
                            <div className=" row">
                                <div className="form col-md-8 col-12 p-0">
                                    <form onSubmit={this.SaveClientInfo} className="bg-white pt-0">
                                        <div className="p-0 ">
                                            <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                                            <span className="title">1.ADRESSE</span>
                                        </div>
                                        <hr className="mt-0 mb-3 p-0" />
                                        <div className="pl-5 pr-5   ">
                                            <div className=" row justify-content-between ">
                                                <TextField className="col-6 ml-1 mb-4  " error={is_name_err} helperText={name_err} id="name" value={`${name}`} onChange={this.onChange} label="Nom et prénom*" />
                                                <TextField className="col-6 ml-1 mb-4 " id="phone_number" placeholder="+212" error={is_phone_number_err} helperText={phone_number_err} value={`${phone_number}`} onChange={this.onChange} label="Téléphone mobile*" />
                                            </div>

                                            
                                            <TextField className=" col-12 " id="address" placeholder="Rue / Appartement / Suite / Bloc / Batiment " label="Adresse" helperText="Incorrect entry." error={is_address_err} helperText={address_err} onChange={this.onChange} value={address} />
                                            <FormControl error={is_city_err} helperText={city_err} className="col-12 mt-5" >
                                                <InputLabel id="demo-simple-select-label">Région</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="city"
                                                    className="col-12 "
                                                    value={this.state.selectedRegion}
                                                    onChange={this.handleChnageRegion}
                                                >
                                                    {regions.map(region => (
                                                        <MenuItem value={region.value}>{region.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl error={is_city_err} helperText={city_err} className={`col-12 mt-5 ${cities ? ('') : 'avoid clicks opacity-5'}`}>
                                                <InputLabel id="demo-simple-select-label">Ville</InputLabel>
                                                <Select

                                                    labelId="demo-simple-select-label"
                                                    id="city"
                                                    className="col-12 "
                                                    value={`${this.state.city}`}
                                                    onChange={this.handleChnageCity}
                                                >
                                                    {cities?.map(city => (
                                                        <MenuItem value={city.value}>{city.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <button className="btn  mt-5 col-12 p-2" onClick={this.SaveClientInfo}>{isDataSaving ? (<CircularProgress />) : 'ERIGESTRER'}</button>
                                        </div>
                                    </form>
                                    <div className="bg-white mt-2">
                                        <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked checkbox' }} />
                                        <span className="title">2. MODE DE LIVRAISON</span>
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
                                                    {cartItems?.map(cartitem => (
                                                        <div key={cartitem.id} className={`row mt-3 `}>
                                                            <div className=" col-4 p-0  ">
                                                                {!isCartImagesLoading ? (
                                                                    <div className="border">
                                                                        {cartitem.item.type === "custompack" ? (
                                                                            <Badge badgeContent={"Personnalisé "} color="primary">
                                                                                <img src={this.get_articleImages(cartitem.item.id ,cartitem.item.type)[0]} alt="" />
                                                                            </Badge>
                                                                        ) :
                                                                            <img alt="" src={this.get_articleImages(cartitem.item.id ,cartitem.item.type)[0]} />
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
                                                    ))}
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
export default UserContact;