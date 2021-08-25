
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



import CircularProgress from '@material-ui/core/CircularProgress';

import { GrAdd } from "react-icons/gr";


import { BsFillCaretRightFill } from 'react-icons/bs';
import { BsCaretLeftFill } from 'react-icons/bs';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import axiosInstance from "./auth/axios";




import { GrFormDown } from 'react-icons/gr';

import { FaShoppingCart } from 'react-icons/fa';






class Customization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_selected: false,
            pictures: [],
            isBoxes_loaded: false,
            isArticleCategory_loaded: false,
            category: "",
            isArticleCategoey_opened: false,
            boxe: {

            },
            is_articles_checked: true,
            isPicturesCheked: true,
            isBookscheked: false,
            quantity: 1,

            user_boxe: [],

            selectedPack: {},
            selectedPackOption: {},
            is_createBoxe_loading: false,
            is_changingQuantity_loading: false,
            is_packLoading: false,
            createBoxe_err: null,
            packOptions: [],
            isaddArticle_loading: false,
            imageDestination: null,

            imageLoaded: false,
            uploadImage: false,
            idexImage: null,
            isStateChanging: false
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
            axiosInstance.post(URL, formData, config)
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
        let control_panel_articles = ""
        let total = 0
        let className = "opacity-2"
        console.log('selected', selectedPack)


        function imageOpacity(params) {
            if (isPicturesCheked) {
                return ""

            } else {
                return "opacity-2 avoid-click"

            }


        }


        if (!this.state.is_articles_checked) {
            control_panel_articles = "opacity-2 avoid-click"
        }

        for (let index = 0; index < this.state.selectedPack.items?.length; index++) {
            total += this.state.selectedPack.items[index]?.quantity * this.state.selectedPack.items[index]?.item?.sale_price

        }
        return (
            <div>                       
                <div className="container ">
                    <div className="customization-description mt-5">
                        <h2>
                            Customization
                        </h2>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>

                    </div>
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
                                                      
                                                    </div>
                          
                                                </AccordionDetails>
                                            </div>
                                        </Accordion>

                                    </div>
                                </div>

                            </div>
                            <div className=" col-md-7 col-12 p-0 ">
                                

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Customization

