import React, { Component } from "react";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

import { BsFillCaretRightFill } from 'react-icons/bs';
import { BsCaretLeftFill } from 'react-icons/bs';

import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import html2canvas from 'html2canvas';
import { CSSTransition } from 'react-transition-group';
import PanelSates from './Panel/panelSates/indexPanelStates';
import Carousel from 'react-grid-carousel'
import CustomDialog from "./dialog";
import { BsArrowUp } from "react-icons/bs";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { GrFormNext } from 'react-icons/gr';
import { Box } from "@mui/system";

class PackZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tet: false,
            height: 0,
            width: 0,
            divider: 4,
            dialogOpen: false,
            dialogAction: null,
            dialogHandlClick: null,
            selectedItem: {
                images: [],
                info: null,
                type: null

            },
            escapeLibre: 0,


        }
    }
    update = () => {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width <= 280) {
                this.setState({ row: 1, col: 2 })
            }
            else if (this.state.width <= 440) {
                this.setState({ row: 1, col: 3 })
            }
            else if (this.state.width <= 950) {
                this.setState({ row: 1, col: 3 })
            }
            else {
                this.setState({ row: 1, col: 4 })
            }
        });
    };

    componentDidMount() {
        this.update();
        this.props.showPanelData()
    }
    get_custompackarticle_images = (custompackitem) => {
        const selectedPackItemsImages = this.props.selectedPackItemsImages
        if (selectedPackItemsImages) {
            let indexOf_custompackitem_Images = selectedPackItemsImages.findIndex(element => element.item_id === custompackitem.item.id);
            let images = [];
    
            selectedPackItemsImages[indexOf_custompackitem_Images]?.images.forEach(element => {
                images.push(element)
            });
    
            return images
            
        }

    }

    get_boxeImages = () => {
        let images = [];
        this.props.selectedPackBoxeImages.forEach(element => {
            images.push(element.image)
        })
        return images

    }

    Dialog = (images, item, action, handlClick) => {
 
        if (this.state.dialogOpen) {
            this.setState({
                dialogOpen: !this.state.dialogOpen,
            })
        } 
        else{
            this.setState({
                dialogOpen: !this.state.dialogOpen,
                dialogAction: action,
                dialogHandlClick: handlClick,
                selectedItem: {
                    images: images,
                    info: item,
                }
            })
        
        }
    }

    render() {
        const {packarticles , boxe ,boxeImages} =this.props
        const { dialogOpen, dialogAction, selectedItem, dialogHandlClick, col, row } = this.state
        const { selectedPack, sale_price, selectedPackUserImages, selectedPackBoxeImages, idexImage, spaceLibre, handlePanelStates, isEdidting } = this.props
        const { changeArticleQuantity, isPackDataLoading, ispackBoxeImagesLoading, isPackItemImageLoading, isPackUserImageUpdating, isPackItemUpdating } = this.props
        const packImage = selectedPackUserImages[idexImage]
       
       

        let packItems_divider = [];
        for (let index = 0; index < selectedPack.packitems?.length; index += this.state.divider) {
            let element = []
            selectedPack.packitems.slice(index, index + this.state.divider).forEach(item => {
                element.push(item)
            });
            packItems_divider.push(element)
        }

        return (
            <div id="pack-zone" className="">
                {!isPackDataLoading ? (
                    <div>
                        {dialogOpen ? (
                            <CustomDialog open={true} handlePanelStates={handlePanelStates} item={selectedItem} close={this.Dialog} action={dialogAction} handlClick={dialogHandlClick} isLoading={dialogAction === 'deleteArticle' ? (isPackItemUpdating) : isPackUserImageUpdating} />
                        ) : null}

                        <div className=" top-side0 d-flex  ">
                            <div className=" col-6 p-2 ">
                                <center className="separator ">Boxe</center>
                                {ispackBoxeImagesLoading ? (
                                    <div className="spinner ">
                                        <div class="lds-default  "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                    </div>
                                ) :
                                    <div className="boxe-img ">
                                        <center>
                                            <img alt="" src={boxeImages[0]} onClick={() => this.Dialog(boxeImages, boxe.item, 'showBoxe', handlePanelStates)} />
                                            <div><span className="space">Espace  : {boxe.item.space} cm2</span></div>
                                        </center>
                                        <button className="btn  " onClick={() => handlePanelStates("addBoxe")}>Changer</button>
                                    </div>
                                }
                            </div>
                            <div className="vl" />
                            <div className="col-6 p-2 ">
                                <center class="separator ">Images:</center >
                                <div className=" ">
                                    {selectedPackUserImages.length === 0 ? (
                                        <div>
                                            <center>
                                                <img src="./assets/images/user-image.png" />
                                                <div><span className="msg-err">Aucune image</span></div>
                                            </center>
                                        </div>
                                    ) :
                                        <div>
                                            <img src={packImage.image} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="bot-side  p-0" >
                            <div class="separator p-0 ">Articles:</div>
                            {selectedPack.packitems?.length > 0 ? (
                                <div className=" p-0">
                                    <div className="bot-side-header row justify-content-between">
                                        <IconButton className="panel-icon-btn" style={{ backgroundColor: '', color: 'black' }} onClick={() => handlePanelStates("chooseArticleCategory")} aria-label="upload picture" component="span" >
                                            <AiOutlineAppstoreAdd className=" " /> <span className=" space text-600 ">Ajouter un article</span>
                                        </IconButton>
                                        <div className={`mt-2 space text-600 p-2 ${spaceLibre <= 7 ? ('text-warning') : 'text-success'}`}>Espace libre : {spaceLibre} cm2</div>
                                    </div>
                                    
                                    <div className=" p-0">
                                        <Carousel cols={col} rows={row} gap={10} showDots={true} mobileBreakpoint={0}>
                                            {packarticles.map(item => (
                                                <Carousel.Item>
                                                    <div className="items   ">
                                                        <div className={isPackItemUpdating ? ('opacity-2 avoid-click') : ''}>
                                                            <center><span className="item-quantity ">{item.quantity}</span></center>
                                                            <div key={item.id} value={item.quantity} className="b d-flex justify-content-between ">

                                                                <IconButton aria-label="upload picture" component="span" onClick={() => changeArticleQuantity("minus", item.id, item.quantity)}>
                                                                    <FaMinus className="icon-small" />
                                                                </IconButton>
                                                                <IconButton className={isPackItemUpdating || spaceLibre <= 0 ? ('opacity-2 avoid-click') : ''} aria-label="upload picture" component="span" onClick={() => changeArticleQuantity("plus", item.id, item.quantity)}>
                                                                    <FaPlus className="icon-small" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                        {!isPackItemImageLoading ? (
                                                            <div className=" ">
                                                                <img alt="" src={this.get_custompackarticle_images(item)[0]} onClick={() => this.Dialog(this.get_custompackarticle_images(item), item, 'deleteArticle', changeArticleQuantity, isPackItemUpdating)} />

                                                            </div>
                                                        ) :
                                                            <div className="mb-5">
                                                                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                                            </div>
                                                        }
                                                        <div className="item-price center mt-2">
                                                            {item.quantity * item.item.sale_price}DH
                                                        </div>

                                                    </div>


                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                                    
                                </div>
                            ) :
                                <div>
                                    <div className="bot-side-header row justify-content-between">
                                        <IconButton className="panel-icon-btn" style={{ backgroundColor: '', color: 'black' }} onClick={() => handlePanelStates("chooseArticleCategory")} aria-label="upload picture" component="span" >
                                            <AiOutlineAppstoreAdd className=" " /> <span className=" space text-600 ">Ajouter un article</span>
                                        </IconButton>
                                        <div className={`mt-2 space text-600 ${spaceLibre <= 5 ? ('text-warning') : 'text-success'}`}>Espace libre : {spaceLibre} cm2</div>
                                    </div>
                                    <div className="null d-flex align-items-center justify-content-center ">

                                        0
                                    </div>

                                </div>
                            }
                        </div>
                        <div className="row total justify-content-between pr-3 pl-3 pb-3">
                            <div><span className="space text-600 " >Total : {sale_price}DH</span></div>
                            {parseInt(sale_price) != 0 && isEdidting === false ? (<button className="btn btn-dark" onClick={() => this.props.handleAddCartItem(selectedPack)}>Ajouter </button>) : null}

                        </div>
                    </div>
                ) :
                    <div className="p-5 ">
                        <div className="loader m-auto" />
                    </div>
                }
            </div>
        )
    }

}
export default PackZone