import React, { Component } from "react";
import { CgAddR } from 'react-icons/cg';
import { CSSTransition } from 'react-transition-group';

import Boxes from "./boxes";
import Checkbox from '@material-ui/core/Checkbox';


import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { BsFillInboxesFill } from 'react-icons/bs';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { RiImageAddFill } from 'react-icons/ri';
import { FaBookMedical } from 'react-icons/fa';
import { VscAccount } from "react-icons/vsc";
import Select from "react-select";
import { RiAddCircleLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import axiosInstance from "../Pages/auth/axios";

import ArticleCategory from "./ArticlesCategory";
import CircularProgress from '@material-ui/core/CircularProgress';

import { GrAdd } from "react-icons/gr";

import axios from "axios";
import { BsFillCaretRightFill } from 'react-icons/bs';
import { BsCaretLeftFill } from 'react-icons/bs';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';




import { GrFormDown } from 'react-icons/gr';

import { FaShoppingCart } from 'react-icons/fa';


class CustomizationState extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidMount() {
        this.setState({ is_packLoading: true }, () => {
            axiosInstance
                .get('api/user/client-info/')
                .then((res) => {
                    var packOptions = this.state.packOptions
                    res.data.custompack_set.forEach(pack => {
                        packOptions.push({
                            label: pack.title,
                            value: pack.id
                        })
                    })
                    this.setState({ packOptions }, () => {
                        if (this.state.packOptions.length > 0) {
                            const selectedPackOption = this.state.packOptions[0]
                            const pack_id = selectedPackOption.value
                            this.setState({ selectedPackOption })
                            axiosInstance.get(`api/customization/userCustomPack/update/${pack_id}`)
                                .then((res) => {
                                    this.setState({ selectedPack: res.data }, () => {
                                        this.setState({ idexImage: this.state.selectedPack.custompackimage_set?.length - 1 })
                                    })

                                })
                            this.setState({ is_packLoading: false })
                        }
                    })
                })
        })
    }
    createBoxe = () => {
        this.setState({ is_createBoxe_loading: true })
        axiosInstance
            .post('api/customization/userCustomPack')
            .then((res => {
                const packOptions = this.state.packOptions.concat(
                    {
                        value: res.data.id,
                        label: res.data.title
                    })
                this.setState({
                    packOptions,
                    is_createBoxe_loading: false
                }
                )
            }))
            .catch((err => {

                this.setState({ is_createBoxe_loading: false })
                this.setState({ createBoxe_err: err.response.data?.err }, () => {
                    setTimeout(() => this.setState({ createBoxe_err: null }), 2000)
                })
            }))
    }
    handlechange_boxe = (boxe) => {
        const pack_id = this.state.selectedPack.id
        axiosInstance
            .put(`api/customization/userCustomPack/update/${pack_id}`,
                {
                    boxe_id: boxe.id
                })
            .then((res => {
                console.log('r', res.data)
                this.setState({ selectedPack: res.data }, () => {
                    this.setState({ idexImage: this.state.selectedPack.custompackimage_set?.length - 1 })

                })
            }))

    }

    handlechange_quantity = (e) => {
        this.setState({ is_changingQuantity_loading: true })
        const id = e.currentTarget.id
        var quantity = 0
        if (e.currentTarget.title === 'plus') {
            quantity = parseInt(e.currentTarget.value) + 1
        }
        else {
            quantity = parseInt(e.currentTarget.value) - 1

        }
        axiosInstance
            .put(`api/customization/userCustomPack/items/${id}`,
                {
                    quantity: quantity,

                }
            )
            .then((res) => {
                var selectedPack = this.state.selectedPack
                var indexOf_updated_item = selectedPack.items.findIndex(function (item, index) {
                    if (item.id == id)
                        return true;
                });
                selectedPack.items[indexOf_updated_item] = res.data
                this.setState({ selectedPack })
                this.setState({ is_changingQuantity_loading: false })

            })
    }
    handleCustomization_choices = (e) => {
        if (e.currentTarget.title === "box") {
            this.setState({ isBoxes_loaded: !this.state.isBoxes_loaded })
        }
        if (e.currentTarget.title === "item") {
            if (!this.state.isArticleCategory_loaded) {
                this.setState({ isArticleCategory_loaded: true }, () => {
                    this.setState({ isArticleCategoey_opened: !this.state.isArticleCategoey_opened });
                })
            }
            else {
                this.setState({ isArticleCategoey_opened: !this.state.isArticleCategoey_opened });
            }
        }
    }
    addArticle = (item) => {
        this.setState({ is_changingQuantity_loading: true }, () => {
            this.setState({ isaddArticle_loading: true }, () => {
                axiosInstance.post(`api/customization/userCustomPack/items`,
                    {
                        custompack_id: this.state.selectedPack.id,
                        item_id: item.id
                    }
                )
                    .then((res => {

                        this.setState({
                            selectedPack: res.data,
                            is_changingQuantity_loading: false,
                            isaddArticle_loading: false
                        })

                    })
                    )

            })
        })

    }
    deleteArticle = (item) => {
        const id = item.id
        axiosInstance.delete(`api/customization/userCustomPack/items/${id}`)
            .then((res => {

                this.setState({ selectedPack: res.data })
            }))

    }
    handleChange_pack = (selectedPackOption) => {
        this.setState({ is_packLoading: true }, () => {
            this.setState({ selectedPackOption }, () => {
                const selectedPackOption = this.state.selectedPackOption
                const pack_id = selectedPackOption.value
                axiosInstance.get(`api/customization/userCustomPack/update/${pack_id}`)
                    .then((res) => {
                        this.setState({ selectedPack: res.data }, () => {
                            this.setState({
                                idexImage: this.state.selectedPack.custompackimage_set?.length - 1,
                                is_packLoading: false


                            })
                        })
                    })


            })

        })
    }
    handleChange_articles = () => {
        this.setState({ is_articles_checked: !this.state.is_articles_checked })

    }
    checkboxePicture = () => {
        this.setState({ isPicturesCheked: !this.state.isPicturesCheked })

    }
    handleChange_books = () => {
        this.setState({ isBookscheked: !this.state.isBookscheked })

    }
    image = (e) => {
        this.setState({
            imageDestination: e.target.files[0],
            is_packLoading: true
        }, () => {
            let formData = new FormData();
            formData.append('image', this.state.imageDestination);
            formData.append('custompack', this.state.selectedPack.id);
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const URL = 'http://localhost:8000/api/customization/userCustomPack/images';
            axios.post(URL, formData, config)
                .then(() => {
                    const selectedPackOption = this.state.selectedPackOption
                    const pack_id = selectedPackOption.value
                    axiosInstance.get(`api/customization/userCustomPack/update/${pack_id}`)
                        .then((res) => {
                            this.setState({ selectedPack: res.data }, () => {
                                this.setState({
                                    idexImage: this.state.selectedPack.custompackimage_set?.length - 1,
                                    is_packLoading: false
                                })
                            })
                        })

                })
                .catch((err) => console.log(err));
        })
    }
    uploadImage = () => {
        this.setState({ uploadImage: !this.state.uploadImage })
    }
    paginateImages = (e) => {
        if (e.currentTarget.title === 'next') {

            if (this.state.idexImage < this.state.selectedPack.custompackimage_set?.length - 1) {
                this.setState({ idexImage: this.state.idexImage + 1 })
            }
        }
        else {
            if (this.state.idexImage > 0) {
                this.setState({ idexImage: this.state.idexImage - 1 })
            }
        }
    }
    handleAddCartItem(item) {

        const item_id = item.id
        const item_type = item.type
        console.log(item_id, item_type)
        axiosInstance.post(`api/cart/cartitems`,
            {
                "id": item_id,
                "type": item_type,
            })
            .then(() => {
                this.setState({
                    isCartOpen: true,
                    isCartLoading: true
                }, () => {
                    axiosInstance
                        .get(`api/cart/cartitems`)
                        .then(res => {
                            this.setState({ cartitem: res.data.reverse() }, () => {
                                var indexOf_updated_item = this.state.cartitem.findIndex(item => item.item?.id === item_id)
                                //[cartitem[0], cartitem[indexOf_updated_item]] = [cartitem[indexOf_updated_item], cartitem[0]]; not working !!
                                const cartitem = this.state.cartitem.slice()
                                var item = cartitem[0]
                                cartitem[0] = cartitem[indexOf_updated_item]
                                cartitem[indexOf_updated_item] = item
                                this.setState({
                                    cartitem: cartitem,
                                    isCartLoading: false,
                                    CartItemAnimation: "annimation",
                                    isCartLoading: false
                                })
                                setTimeout(() => this.setState({ CartItemAnimation: "" }), 2000)





                            })
                        })
                })
            })
    }

    render() {





        const { user_packs, selectedPack, packOptions, selectedPackOption } = this.state;
        const { is_createBoxe_loading, is_changingQuantity_loading, is_packLoading, createBoxe_err } = this.state
        const { isBoxes_loaded, isArticleCategory_loaded, isaddArticle_loading, isArticleCategoey_opened } = this.state
        const { isPicturesCheked, isBookscheked } = this.state
        const { imageLoaded } = this.state
        const { isLoged } = this.props
        const { uploadImage } = this.state
        const { idexImage } = this.state
        return (
            <div>

            </div>
            /*<div>
                <div className="customization">
                    <div className="row">
                        <div className="panel col-12  col-md-5   p-0 ">
                            <div className="control-panel-disktop bg-white ">
                                <div className="">
                                    {isLoged ? (
                                        <div>
                                            <i className="icon-medium mr-2">
                                                <VscAccount />
                                            </i>
                                            {selectedPack.user?.name}
                                        </div>
                                    ) :
                                        <div>
                                            <i className="icon-medium mr-2"><VscAccount /></i>
                                            <a href="/sign-up">Arealdy have an account?</a>
                                        </div>
                                    }
                                    <div className="d-flex justify-content-between mt-2">
                                        <div className="mt-2 text-secondary">
                                            You have <span className="text-primary">{this.state.packOptions.length}</span> boxes
                                        </div>
                                        {!is_createBoxe_loading ? (
                                            <div>
                                                <div className="create-boxe">
                                                    <button className="btn btn-outline-secondary float-right" onClick={this.createBoxe}>
                                                        <IconContext.Provider value={{ color: "burlywood" }}>
                                                            <i className="icon-medium">
                                                                <RiAddCircleLine />
                                                            </i>
                                                            <i>Cretae new box</i>
                                                        </IconContext.Provider>
                                                    </button>
                                                </div>
                                                <span className="msg-err float-left">
                                                    <i>{createBoxe_err}</i>
                                                </span>
                                            </div>

                                        ) :
                                            <CircularProgress color="inherit" />
                                        }

                                    </div>
                                    <div className="mt-2">
                                        <Select
                                            className="  sortr"
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 0,
                                                transition: 0.5,

                                                colors: {
                                                    ...theme.colors,

                                                    primary: 'burlywood',
                                                },
                                            })}

                                            menuColor='red'
                                            options={packOptions}
                                            isSearchable={false}
                                            value={selectedPackOption}
                                            onChange={this.handleChange_pack}
                                        />
                                    </div>
                                </div>
                                <div className="control-panel-phone container mt-3 ">
                                    <div className="btn-group options d-flex justify-content-between">
                                        <button className="test-btn" title="box" onClick={this.handleCustomization_choices} ><BsFillInboxesFill /></button>
                                        <button className="test-btn" title="item" onClick={this.handleCustomization_choices}><HiOutlineViewGridAdd /></button>
                                        <button className="test-btn"><RiImageAddFill /></button>
                                        <button className="test-btn"><FaBookMedical /></button>
                                    </div>
                                </div>

                                <div className="mt-2  ">
                                    <Accordion >
                                        <div className="bg-blury">
                                            <AccordionSummary expandIcon={<GrFormDown />} aria-controls="panel1a-content" id="panel1a-header">
                                                <div className="d-flex justify-content-between pr-3">
                                                    <h3 >
                                                        Customization
                                                    </h3>
                                                </div>
                                            </AccordionSummary>
                                        </div>
                                        <div className="">
                                            <AccordionDetails>
                                                <div>
                                                    <div className="d-flex align-item-start">
                                                        <div>
                                                            <Checkbox checked={true} color="primary" />
                                                        </div>
                                                        <div className="mt-3 col-11">
                                                            <div className="d-flex justify-content-between ">
                                                                <h4 className="text">
                                                                    Box
                                                                </h4>
                                                                <div>
                                                                    <button title="box" className="btn btn-null" onClick={this.handleCustomization_choices}><i><CgAddR /></i></button>
                                                                </div>
                                                            </div>
                                                            <div className="boxe-img col-lg-3 col-md-4 col-sm-4 mt-4 ">
                                                                <img alt="" src={selectedPack.boxe?.img} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="d-flex ">
                                                        <div>
                                                            <Checkbox id="is_articles_checked" checked={true} color="primary" />
                                                        </div>
                                                        <div className={`${control_panel_articles} mt-3 col-11 `}>
                                                            <div className="d-flex justify-content-between">
                                                                <h4 className="text">
                                                                    Articles :
                                                                </h4>
                                                                <div>
                                                                    <button title="item" className="btn btn-null" onClick={this.handleCustomization_choices}><i><CgAddR /></i></button>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                {selectedPack.items?.map(item => (
                                                                    <div className="boxe-img col-lg-3 col-md-4 col-sm-4 mt-3 ">
                                                                        <img alt="" src={item.item.img} />
                                                                    </div>))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="d-flex">
                                                        <div>
                                                            <Checkbox id="is_articles_checked" checked={isPicturesCheked} onChange={this.checkboxePicture} color="primary" />
                                                        </div>
                                                        <div className={` col-11 mt-3`}>
                                                            <div className="d-flex justify-content-between ">
                                                                <h4 className="text ">
                                                                    Pictures
                                                                </h4>
                                                            </div>
                                                            <div className="row">
                                                                <div className="border-dotted  p-3">
                                                                    <button className="btn btn-null ">
                                                                        <input accept="image/*" className="col-12" ref="file" type="file" id="actual-btn" onChange={this.image} hidden />
                                                                        <label className="" for="actual-btn"> <GrAdd /></label>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </AccordionDetails>
                                        </div>
                                    </Accordion>

                                </div>
                            </div>

                        </div>
                        <div className=" col-md-7 col-12 p-0 ">
                            <div className="pack-zone bg-white ">
                                {!is_packLoading ? (
                                    <div className="">
                                        <div className="d-flex top-side ">
                                            <div className={`col-6  `} >
                                                <div className="separator mt-4"><h3>Boxe:</h3></div>
                                                <div className="boxe  ">
                                                    <img alt="" src={selectedPack.boxe?.img} />
                                                </div>
                                            </div>
                                            <div className="vl"></div>
                                            <div className={`col-6  ${imageOpacity(isPicturesCheked)}`} >
                                                <div class="separator mt-4"><h3>Images:</h3></div>
                                                <div className="image-upload  ">
                                                    <div>
                                                        Quantity  : {selectedPack.custompackimage_set?.[idexImage]?.quantity}
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-null ">
                                                            <FaMinus />
                                                        </button>

                                                        <button className="btn btn-null ">
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                    <img src={selectedPack.custompackimage_set?.[idexImage]?.image} />
                                                </div>
                                                <div className="images-pagination d-flex justify-content-center ">
                                                    <button className="btn btn-null" title="back" onClick={this.paginateImages}>
                                                        <IconContext.Provider value={{ color: "#aaa" }}>
                                                            <BsCaretLeftFill />
                                                        </IconContext.Provider>
                                                    </button>

                                                    <button className="btn btn-null" title="next" onClick={this.paginateImages}>
                                                        <IconContext.Provider value={{ color: "#aaa" }}>
                                                            <BsFillCaretRightFill />
                                                        </IconContext.Provider>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bot-side ">
                                            <div class="separator "><h3>Articles:</h3></div>

                                            {selectedPack.items?.length > 0 ? (
                                                <div className="row">
                                                    {selectedPack.items?.map(item => (
                                                        <div className=" col-lg-3 col-md-4 col-sm-4 col-4 ">
                                                            <center className=" quantity ">{item.quantity}</center>
                                                            <div key={item.id} className={!is_changingQuantity_loading ? "d-flex justify-content-between " : "d-flex justify-content-between opacity-5 "}>
                                                                <button title="minus" value={item.quantity} id={item.id} className="btn btn-null" onClick={this.handlechange_quantity}> <FaMinus /></button>

                                                                <button title="plus" value={item.quantity} id={item.id} className="btn btn-null" onClick={this.handlechange_quantity}><FaPlus /></button>
                                                            </div>
                                                            <div className="article-img">
                                                                <img alt="" src={`${item.item.img}`} />
                                                                <div className="middle">
                                                                    <button className="btn btn-null" onClick={() => this.deleteArticle(item)}><RiDeleteBin6Line /></button>
                                                                </div>

                                                            </div>
                                                            <div className="item-price mt-2">
                                                                {item.quantity * item.item.sale_price}DH
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            ) : <div className="null d-flex align-items-center justify-content-center mb-4">
                                                0
                                            </div>

                                            }

                                        </div>
                                    </div>
                                ) : <div className="loader"></div>}
                            </div>

                        </div>

                    </div>

                </div>

            </div>*/
        )
    }
}
export default CustomizationState
