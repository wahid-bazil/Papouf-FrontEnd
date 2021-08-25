import React, { Component } from "react";
import axiosInstance from "../auth/axios";
import PackZone from "./packZone";

import html2canvas from 'html2canvas';

import PanelSates from "./Panel/panelSates/indexPanelStates";


import { CSSTransition } from 'react-transition-group';
import queryString from 'query-string';
import { FcCheckmark } from 'react-icons/fc';
import { IconButton } from "@material-ui/core";
import { CgChevronDownO } from 'react-icons/cg';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Carousel from 'react-bootstrap/Carousel';
import { IconContext } from "react-icons";
import { CgChevronUpO } from 'react-icons/cg';



class CopyCustomization extends Component {
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
            selectedPackUserImages: [],
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
            isDataloading: false,
            showDetails: false,
            dialogOpen: false,
            //Panel States
            panelLabelannimated: false,
            isPanelDataloading: false,
            currentPanelState: { value: 'initial', label: 'Personnalisation' },
            expended: false,
            boxes: [],
            articles: [],
            articleCategories: [],
            //addArticle
            isArticleAdding: false,
            //packAone
            isPackDataLoading: false,
            isPackUserImageLoading: false,
            ispackBoxeImageLoading: false,
            isPackItemImageLoading: false,
            isPackUserImageUpdating: false,
            isPackItemUpdating: false,
            isPackChanging: false,
            sale_price: 0,
            selectedPackBoxeImages: [
                {
                    boxe_id: null,
                    image: null
                }
            ],
            selectedPackItemsImages: [],
            screen: "",
            spaceLibre: 0,
            updateArticleFeedBack: null,
            updateBoxeFeedBack:null,
            isEdidting:false,
            image:null



        }
        this.changeBoxe = this.changeBoxe.bind(this)
        this.ChangeImageQuantity = this.ChangeImageQuantity.bind(this)
    }
    take = () => {
        const element = document.getElementById('mmain')
        html2canvas(element, {
            allowTaint: true,

            useCORS: true
        }).then((canvas) => {
            let screen = canvas.toDataURL()
            this.setState({ screen })

        }
        )
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ isPackDataLoading: true }, async () => {
            const pack_id = this.props.location.state?.pack_id
            const image = this.props.location.state?.image;
            this.setState({image})
            let selectedPack = {};
            if (this.props.location.state?.pack_id) {
                const pack_id = this.props.location.state?.pack_id
                selectedPack = await axiosInstance.post(`api/customization/userCustomPack/pack-copy`,
                    { pack_id: pack_id }
                )
            }
            else {
                this.props.history.push("./Customization");
                window.location.reload();

            }

            this.setState({
                selectedPack: selectedPack.data,
                sale_price: parseInt(selectedPack.data.sale_price),
                isPackDataLoading: false,
                isPackUserImageLoading: true,
                ispackBoxeImagesLoading: true,
                isPackItemImageLoading: true
            }, async () => {
                this.get_spaceLibre()
                const boxe_id = this.state.selectedPack.boxe.id
                const pack_id = this.state.selectedPack.id
                const [packItemsImages, packUserImages, packBoxeImages] = await Promise.all([
                    axiosInstance.get(`api/images/custompackarticle?id=${pack_id}`),
                    axiosInstance.get(`api/images/userimages/custompack/${pack_id}`),
                    axiosInstance.get(`api/images/boxe/${boxe_id}`)
                ])

                this.setState({
                    selectedPackBoxeImages: packBoxeImages.data.images,
                    selectedPackItemsImages: packItemsImages.data,
                    selectedPackUserImages: packUserImages.data.userimages,
                    idexImage: packUserImages.data.userimages.length - 1,
                    isPackUserImageLoading: false,
                    ispackBoxeImagesLoading: false,
                    isPackItemImageLoading: false
                })
            })
        })
    }


    async changeBoxe(boxe) {
        this.setState({ ispackBoxeImagesLoading: true }, async () => {
            let spaceUsed = 0
            this.state.selectedPack.packitems.forEach(element => {
                spaceUsed += (element.quantity) * (element.item.space)
            })
            if (boxe.space>=spaceUsed) {
                this.handlePanelStates('initial')
                const pack_id = this.state.selectedPack.id
                const res = await axiosInstance.put(`api/customization/userCustomPack/detail`,
                    {
                        "boxe_id": boxe.id,
                        "pack_id":pack_id
                    }
                )
                let selectedPack = Object.assign({}, this.state.selectedPack);
                selectedPack.boxe = res.data.boxe
                const boxe_id = res.data.boxe.id
                axiosInstance.get(`api/images/boxe/${boxe_id}`)
                    .then((res) => {
                        this.setState({
                            selectedPack,
                            selectedPackBoxeImages: res.data.images,
                            ispackBoxeImagesLoading: false
                        }, () => {
    
                            this.get_spaceLibre()
                        })
                    })
                
            } else {
                this.setState({ updateBoxeFeedBack: "Espace Insuffisant" })
                setTimeout(() => {
                    this.setState({ updateBoxeFeedBack: null ,ispackBoxeImagesLoading:false})
                }, 1000);
            }
      
        })

    }
    changeArticleQuantity = (action, item_id, item_quantity) => {

        this.setState({ isPackItemUpdating: true }, async () => {
            const pack_id = this.state.selectedPack.id
            const URL = `api/customization/userCustomPack/packitems/${item_id}`
            let quantity = item_quantity;
            if (action === 'delete' || (action === 'minus' && item_quantity === 1)) {
                let selectedPack = Object.assign({}, this.state.selectedPack);
                let indexOf_deleted_item = selectedPack.packitems.findIndex(function (item, index) {
                    if (item.id == item_id)
                        return true;
                });

                selectedPack.sale_price -= selectedPack.packitems[indexOf_deleted_item].total
                await axiosInstance.delete(URL)
                selectedPack.packitems.splice(indexOf_deleted_item, 1)
                axiosInstance.get(`api/customization/custompack/total/${pack_id}`)
                    .then((res) => {
                        this.setState({
                            sale_price: res.data,
                            selectedPack,
                            isPackUserImageUpdating: false
                        }, () => {
                            this.get_spaceLibre()
                        })
                    })
            } else if (action === 'plus' || (action === 'minus' && item_quantity > 1)) {
                if (action === 'minus') {
                    quantity -= 1
                }
                else {
                    quantity += 1
                }
                const res = await axiosInstance.put(URL, { quantity: quantity })
                let selectedPack = Object.assign({}, this.state.selectedPack);
                let indexOf_updated_item = selectedPack.packitems.findIndex(function (item, index) {
                    if (item.id == item_id)
                        return true;
                });
                selectedPack.packitems[indexOf_updated_item] = res.data
                axiosInstance.get(`api/customization/custompack/total/${pack_id}`)
                    .then((res) => {
                        this.setState({
                            sale_price: res.data,
                            selectedPack,
                            isPackUserImageUpdating: false
                        }, () => {
                            this.get_spaceLibre()
                        })
                    })
            }
            this.setState({ isPackItemUpdating: false })
        })
    }
    addArticle = (selectedArticle) => {
        if (selectedArticle.info.space <= this.state.spaceLibre) {
            const articleImages = selectedArticle.images
            const item_id = selectedArticle.info.id
            const custompack_id = this.state.selectedPack.id
            const pack_id = this.state.selectedPack.id
            this.setState({ isArticleAdding: true }, async () => {
                const res = await axiosInstance.post(`api/customization/userCustomPack/packitems`,
                    {
                        custompack_id: custompack_id,
                        item_id: item_id
                    })
                let selectedPack = Object.assign({}, this.state.selectedPack);

                let selectedPackItemsImages = [...this.state.selectedPackItemsImages];
                switch (res.status) {
                    case 201:
                        selectedPackItemsImages.push({ custompackitem_id: res.data.id, custompackitem_images: { images: [{ image: articleImages[0] }] } })
                        selectedPack.packitems.push(res.data)
                        this.setState({
                            sale_price: this.state.sale_price + parseInt(res.data.total),
                            isArticleAdding: false,
                            selectedPackItemsImages
                        }, () => {
                            this.get_spaceLibre()
                        })
                        break;
                    case 200:
                        const indexOf_updated_item = selectedPack.packitems.findIndex(element => element.item.id === item_id);
                        selectedPack.packitems[indexOf_updated_item] = res.data
                        axiosInstance.get(`api/customization/custompack/total/${pack_id}`)
                            .then((res) => {
                                this.setState({
                                    sale_price: res.data,
                                    selectedPack,
                                    isArticleAdding: false
                                }, () => {
                                    this.get_spaceLibre()
                                })
                            })
                        break;
                }
                this.setState({ updateArticleFeedBack: <FcCheckmark className="icon-medium" /> })
                setTimeout(() => {
                    this.setState({ updateArticleFeedBack: null })
                }, 1000);


            })
        }
        else {
            this.setState({ updateArticleFeedBack: "Espace Insuffisant" })
            setTimeout(() => {
                this.setState({ updateArticleFeedBack: null })
            }, 1000);
        }
    }
    image = (e) => {
        const pack_id = this.state.selectedPack.id
        this.setState({
            imageDestination: e.target.files[0],
            isPackUserImageLoading: true
        }, async () => {
            let formData = new FormData();
            formData.append('image', this.state.imageDestination);
            formData.append('custompack', this.state.selectedPack.id);
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const URL = 'api/images/userimages/custompack';
            const res = await axiosInstance.post(URL, formData, config)
            let selectedPackUserImages = [...this.state.selectedPackUserImages]
            let data = res.data;
            let id = data.id;
            delete data.id;
            data.image_id = id
            selectedPackUserImages.push(data)
            axiosInstance.get(`api/customization/custompack/total/${pack_id}`)
                .then((res) => {
                    this.setState({
                        selectedPackUserImages,
                        idexImage: selectedPackUserImages.length - 1,
                        sele_price: res.data,
                        isPackUserImageLoading: false
                    })
                })
        }
        )
    }
    paginateImages = (action) => {
        if (action === 'next') {
            if (this.state.idexImage < this.state.selectedPackUserImages?.length - 1) {
                this.setState({ idexImage: this.state.idexImage + 1 })
            }
        }
        else if (action === 'back') {
            if (this.state.idexImage > 0) {
                this.setState({ idexImage: this.state.idexImage - 1 })
            }
        }
    }
    async ChangeImageQuantity(action, image_id, image_quantity) {
        this.setState({ isPackUserImageUpdating: true }, async () => {
            const URL = `api/images/userimage/${image_id}`
            if (action === 'delete') {
                axiosInstance.delete(URL)
                    .then(() => {
                        let selectedPackUserImages = [...this.state.selectedPackUserImages]
                        let indexOf_deleted_image = selectedPackUserImages.findIndex(element => element.image_id === image_id);
                        selectedPackUserImages.splice(indexOf_deleted_image, 1)
                        this.setState({
                            selectedPackUserImages,
                            idexImage: selectedPackUserImages.length - 1,
                        })
                    })
            } else if (action === 'plus' || (action === 'minus' && image_quantity > 1)) {
                let quantity = image_quantity;
                if (action === 'plus') {
                    quantity += 1
                }
                else {
                    quantity -= 1
                }
                const res = await axiosInstance.put(URL, { quantity: quantity })
                let selectedPackUserImages = [...this.state.selectedPackUserImages]
                let indexOf_updated_image = selectedPackUserImages.findIndex(element => element.image_id === image_id);
                selectedPackUserImages[indexOf_updated_image] = res.data
                const pack_id = this.state.selectedPack.id
                axiosInstance.get(`api/customization/custompack/total/${pack_id}`)
                    .then((res) => {
                        this.setState({
                            selectedPackUserImages,
                            sele_price: res.data,
                        })
                    })
            }
            this.setState({ isPackUserImageUpdating: false })
        })
    }
    resetPanel = () => {

        this.setState({
            expended: false,
            currentPanelState: { value: 'initial', label: '' }
        })
    }
    expendPanel = () => {

        this.setState({ expended: true })
    }
    showPanelData = () => {
        setTimeout(() => {
            this.setState({ isPanelDataloading: false })
        }, 700);
    }
    annimatePanelLabel = () => {
        this.setState({ panelLabelannimated: true })
    }
    handlePanelStates = (panelState, selectedCategory, selectedArticle) => {
        let timeout = 700;
        if (this.state.currentPanelState.value === 'initial') {
            timeout = 0
        }
        switch (panelState) {
            case 'addBoxe':
                this.resetPanel()
                this.setState({
                    expended: true
                })
                setTimeout(() => {
                    this.setState({
                        currentPanelState: { value: 'addBoxe', label: 'Choisissez une boxe' },
                        isPanelDataloading: true,
                        panelLabelannimated: true,

                    })
                }, 250);
                break;
            case 'chooseArticle':
                this.setState({
                    currentPanelState: { value: 'chooseArticle', label: 'Choisissez un article ', selectedCategory: selectedCategory },
                    isPanelDataloading: true
                })
                break;
            case 'uploadImage':
                this.resetPanel();
                setTimeout(() => {
                    this.setState({
                        currentPanelState: { value: 'uploadImage', label: 'Uploader des images ' },
                        panelLabelannimated: !this.state.panelLabelannimated,
                        expended: true
                    })
                }, 700);
                break;
            case 'chooseArticleCategory':
                if (this.state.currentPanelState.value == 'chooseArticle') {
                    this.setState({
                        currentPanelState: { value: 'chooseArticleCategory', label: 'Choisissez une catégorie' },
                        isPanelDataloading: true,
                    })
                } else {
                    this.resetPanel();
                    this.setState({
                        expended: true
                    })
                    setTimeout(() => {
                        this.setState({
                            currentPanelState: { value: 'chooseArticleCategory', label: 'Choisissez une catégorie' },
                            isPanelDataloading: true,
                            panelLabelannimated: true,
                        })
                    }, 250);
                }
                break;
            case 'initial':
                this.resetPanel();
                break;
        }
    }
    get_spaceLibre = () => {
        let space = this.state.selectedPack.boxe.space
        if (this.state.selectedPack.packitems.length > 0) {
            this.state.selectedPack.packitems.forEach(element => {
                space -= (element.quantity) * (element.item.space)
            });
            this.setState({ spaceLibre: space })

        }
        else {
            this.setState({ spaceLibre: space })
        }

    }


    render() {
        const { selectedPack, packOptions, selectedPackOption, sale_price, spaceLibre, showDetails, dialogOpen } = this.state;
        const { is_createBoxe_loading, is_changingQuantity_loading, is_packLoading, createBoxe_err } = this.state
        const { isLoged } = this.props
        const { idexImage } = this.state
        const { currentPanelState, expended, panelLabelannimated } = this.state
        const { boxes, articles, articleCategories } = this.state
        const { isPanelDataloading } = this.state
        const { isDataloading ,isEdidting} = this.state
        const { selectedPackUserImages, selectedPackBoxeImages, selectedPackItemsImages, updateArticleFeedBack ,updateBoxeFeedBack } = this.state
        const { isArticleAdding, pp } = this.state
        const { isPackDataLoading, isPackUserImageLoading, ispackBoxeImagesLoading, isPackItemImageLoading, isPackUserImageUpdating, isPackItemUpdating } = this.state
        var disablePanel = "";
        console.log(this.props.location.state?.selectedPackImages)

        if (isPackDataLoading) {
            disablePanel = "display-none"
        }
        return (

            <div>


                <div className="customization">
                    <Dialog
                        className="dialog-content"
                        fullWidth
                        style={{ position: 'fixed', zIndex: 4001, padding: 0, background: "transparent" }}
                        open={dialogOpen}
                        fullWidth={true}
                        aria-labelledby="max-width-dialog-title"
                        onClose={() => { this.setState({ dialogOpen: false }) }}
                    >
                        <DialogContent>
                            <div className="initial-pack">
                                <Carousel nextIcon={<span aria-hidden="true" className="carousel-next-icon"><i class="fas fa-arrow-circle-right "></i></span>} prevIcon={<span aria-hidden="true" className="carousel-prev-icon"><i class="fas fa-arrow-circle-left "></i></span>} interval={2000}>
                                    {this.props.location.state?.selectedPackImages.map(element => (
                                        <Carousel.Item>
                                            <img src={element.image} alt="" />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>

                            </div>
                        </DialogContent>
                        <DialogActions>
                            <button className="btn btn-light" onClick={() => { this.setState({ dialogOpen: false }) }}>Close</button>
                        </DialogActions>



                    </Dialog>
                    <div className="container  ">
                        <div className="customization-detail ">

                            <Accordion className="accordion  " expanded={showDetails}>
                                {!showDetails ? (
                                    <center  className={showDetails || expended ? ('hidden') : ''}>
                                        <IconButton onClick={() => this.setState({ showDetails: !this.state.showDetails })} className="p-0">
                                            <IconContext.Provider value={{ color: "black" }}>
                                                <CgChevronDownO />
                                            </IconContext.Provider>
                                        </IconButton>
                                    </center>
                                ) :
                                    null
                                }
                                <AccordionDetails className="accordin-Details  " >
                                    <center>
                                        <div className="text-shippori">Initial Pack</div>
                                        </center>
                                    <img onClick={() => { this.setState({ dialogOpen: !this.state.dialogOpen }) }} alt="" src={this.state.image} />
                                    {showDetails ? (
                                        <center>
                                            <IconButton onClick={() => this.setState({ showDetails: !this.state.showDetails })} className="p-0">
                                                <IconContext.Provider value={{ color: "black" }}>
                                                    <CgChevronUpO />
                                                </IconContext.Provider>
                                            </IconButton>
                                        </center>
                                    ) :
                                        null
                                    }
                                </AccordionDetails>

                            </Accordion>

                        </div>

                        <div className="pack-panel-zone mb-4">
                            <div className={`panel   `}>

                                <CSSTransition in={expended} timeout={{ enter: 250, exit: 250 }} classNames="panel-" enter={true} appear={true}>
                                    <div className={`panel-states  ${!expended ? ('') : ''}  `}  >
                                        <PanelSates updateBoxeFeedBack={updateBoxeFeedBack} updateArticleFeedBack={updateArticleFeedBack} spaceLibre={spaceLibre} panelLabelannimated={panelLabelannimated} packItems={selectedPack.packitems} expended={expended} showPanelData={this.showPanelData} isArticleAdding={isArticleAdding} image={this.image} changeBoxe={this.changeBoxe} addArticle={this.addArticle} expendPanel={this.expendPanel} annimatePanelLabel={this.annimatePanelLabel} handleChangeBoxe={this.handleChangeBoxe} isPanelDataloading={isPanelDataloading} currentPanelState={currentPanelState} handlePanelStates={this.handlePanelStates} boxes={boxes} articles={articles} articleCategories={articleCategories} currentBoxeSpace={selectedPack.boxe?.space} />
                                    </div>
                                </CSSTransition>
                            </div>
                            <div className={`pack-zone `}>
                                <PackZone isEdidting={isEdidting} sale_price={selectedPack.sale_price} handleAddCartItem={this.props.handleAddCartItem} handlePanelStates={this.handlePanelStates} spaceLibre={spaceLibre} expendPanel={this.expendPanel} panelLabelannimated={panelLabelannimated} expended={expended} showPanelData={this.showPanelData} selectedPackUserImages={selectedPackUserImages} isArticleAdding={isArticleAdding} image={this.image} changeBoxe={this.changeBoxe} addArticle={this.addArticle} annimatePanelLabel={this.annimatePanelLabel} panelLabelannimated={panelLabelannimated} isPanelDataloading={isPanelDataloading} currentPanelState={currentPanelState} handlePanelStates={this.handlePanelStates} boxes={boxes} articles={articles} articleCategories={articleCategories} handleChangeBoxe={this.handleChangeBoxe} handleChangePack={this.handleChangePack} createBoxe={this.createBoxe} isLoged={isLoged} selectedPack={selectedPack} is_createBoxe_loading={is_createBoxe_loading} createBoxe_err={createBoxe_err} packOptions={packOptions} selectedPackOption={selectedPackOption} expended={expended} ChangeImageQuantity={this.ChangeImageQuantity} isPackDataLoading={isPackDataLoading} isPackUserImageLoading={isPackUserImageLoading} ispackBoxeImagesLoading={ispackBoxeImagesLoading} isPackItemImageLoading={isPackItemImageLoading} isPackUserImageUpdating={isPackUserImageUpdating} isPackItemUpdating={isPackItemUpdating} selectedPackUserImages={selectedPackUserImages} selectedPackBoxeImages={selectedPackBoxeImages} selectedPackItemsImages={selectedPackItemsImages} changeArticleQuantity={this.changeArticleQuantity} paginateImages={this.paginateImages} selectedPack={selectedPack} sale_price={sale_price} is_packLoading={is_packLoading} idexImage={idexImage} is_changingQuantity_loading={is_changingQuantity_loading} />
                              
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        )
    }
}
export default CopyCustomization