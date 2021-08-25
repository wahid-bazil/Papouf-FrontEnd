import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Carousel from 'react-bootstrap/Carousel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FcCheckmark } from 'react-icons/fc';
import { IoClose } from 'react-icons/io5';
import { IconContext } from "react-icons";
import IconButton from '@material-ui/core/IconButton';
import axiosInstance from "../auth/axios";
class CustomDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isItemlChildrenLoading: false,
            isItemsImagesLoading: false,
            itemChildren: [],
            itemsImages: [],
            currentState: 0,
            isitemchanged: false,
            selectedItem: {
                info: {},
                images: []
            },
            selectedItemId: null,
            selectedItemVariant: null

        }
        this.handlClickAndClose = this.handlClickAndClose.bind(this)
    }
    async handlClickAndClose(...parms) {

        await this.props.handlClick.apply(null, parms);
        this.props.close();

    }
    componentDidMount () {
        if (this.props.item.info?.type==='packarticle') {
            this.setState({
                selectedItem: {
                    info: this.props.item.info.item,
                    images: this.props.item?.images
                },
                selectedItemId: this.props.item.info?.id,
            })
        } else {
            this.setState({
                selectedItem: {
                    info: this.props.item.info,
                    images: this.props.item?.images
                },
                selectedItemId: this.props.item.info?.id,
            })
        }
    }
    get_article_children = () => {
        this.setState({ isItemlChildrenLoading: true }, async () => {
            const items = await axiosInstance.get(`api/variation/article-children/${this.props.item.info.id}`)
            this.setState({
                itemChildren: items.data,
                currentState: 1,
                isItemlChildrenLoading: false,
                isItemsImagesLoading: true,
                selectedItemId: items.data[0].id
            }, () => {
                axiosInstance.get(`api/images/article-childen/${this.props.item.info.id}`)
                    .then((res) => {
                        this.setState({
                            itemsImages: res.data,
                            isItemsImagesLoading: false
                        })
                    })
            })
        })
    }
    get_articleImages = (item_id) => {
        const itemsImages = this.state.itemsImages

        let indexOf_itemImages = itemsImages.findIndex(element => element.item_id === item_id);

        let images = [];

        itemsImages[indexOf_itemImages]?.images.forEach(element => {
            images.push(element.image)
        });

        return images
    }
    onChangeItem = (e) => {
      
        this.setState({
            selectedItemId: parseInt(e.currentTarget.id),
            selectedItemVariant:e.currentTarget.title
        },()=>{
            
        })
    }
    onSelect = () => {
        var indexOf_selcted_item = this.state.itemChildren.findIndex(item => item.id === this.state.selectedItemId)

        this.setState({
            selectedItem: {
                info: this.state.itemChildren[indexOf_selcted_item],
                images: this.get_articleImages(this.state.selectedItemId)
            },
            currentState: 0
        })

    }
    close = () => {
        this.props.close()
        this.setState({
            currentState: 0,
            isitemchanged: false
        })
    }



    render() {
        const { item, open, close, handlClick, isLoading, hideItem, action, handlePanelStates, feedBack, spaceLibre } = this.props
        const { isItemlChildrenLoading, currentState, selectedItemId, itemChildren, selectedItem ,selectedItemVariant} = this.state
        
        return (
            <div>
                {currentState === 0 ? (
                    <div>
                        <Dialog
                            className="dialog-content"
                            fullWidth
                            onClose={close}
                            style={{ position: 'fixed', zIndex: 4001, padding: 0, background: "transparent" }}
                            open={open}
                            fullWidth={true}
                            aria-labelledby="max-width-dialog-title"
                        >
                            {!isItemlChildrenLoading ? (
                                <div>
                                    <div className="d-flex justify-content-between p-0">
                                       
                                        <IconButton className="p-0" onClick={this.close}>
                                            <IconContext.Provider value={{ color: "black" }}>
                                                <div>
                                                    <span > <IoClose /></span>
                                                </div>
                                            </IconContext.Provider>
                                        </IconButton>
                                    </div>
                                    <DialogContent>
                                        <div className="item-description ">
                                            <Carousel  nextIcon={<span aria-hidden="true" className="carousel-next-icon"><i class="fas fa-arrow-circle-right "></i></span>} prevIcon={<span aria-hidden="true" className="carousel-prev-icon"><i class="fas fa-arrow-circle-left "></i></span>} interval={2000}>
                                                {selectedItem.images.map(image => (
                                                    <Carousel.Item>
                                                        <img src={image} alt="" />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        </div>
                                        <p className="text-secondary "><span>Desciption:</span>{selectedItem?.info?.description}</p>
                                        <div className="row justify-content-between">
                                            <h5>{selectedItem?.info?.sale_price} DH</h5>
                                            <span className="space text-success text-600"> {selectedItem?.info?.space} cm2</span>
                                        </div>
                                    </DialogContent>
                                    <div className="dialog-action p-0">
                                        <DialogActions>

                                            {(() => {
                                                switch (action) {
                                                    case 'addBoxe':
                                                        return (
                                                            <div>
                                                                {feedBack ? (
                                                                    <span>{feedBack}</span>
                                                                ) :
                                                                    <button className="btn btn-info " onClick={() => handlClick(item.info)} >
                                                                        Ajouter au pack
                                                                    </button>
                                                                }
                                                            </div>
                                                        )
                                                    case 'addArticle':
                                                        return (
                                                            <div className="row justify-content-between">
                                                                {item.info?.child?.length != 0 ? (
                                                                    <button className="btn btn-success" onClick={this.get_article_children}>Personnaliser</button>
                                                                ) : null}

                                                                {feedBack ? (
                                                                    <span className="msg-err">{feedBack}</span>
                                                                ) :
                                                                    <div className="k">
                                                                        {isLoading ? (
                                                                            <span ><CircularProgress /></span>
                                                                        ) :
                                                                            <div className=" ">
                                                                                <button className="btn btn-info " onClick={() => handlClick(selectedItem)}>
                                                                                    Ajouter au pack
                                                                                </button>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                }



                                                            </div>
                                                        )
                                                    case 'deleteArticle':
                                                        return (
                                                            <div>
                                                                {!isLoading ? (<button className="btn btn-danger" onClick={() => this.handlClickAndClose('delete', item.info.id)}>Delete</button>) : <span ><CircularProgress /></span>}


                                                            </div>
                                                        )
                                                    case 'showBoxe':
                                                        return (
                                                            <div>
                                                                <button className="btn btn-info" onClick={() => this.handlClickAndClose("addBoxe")}>Change</button>

                                                            </div>
                                                        )
                                                }
                                            })()}




                                        </DialogActions>
                                    </div>


                                </div>
                            ) :
                                <center className="dialog-spinner p-5">
                                    <div className="loader" />

                                </center>
                            }


                        </Dialog>

                    </div >

                ) :
                    <div>
                        <Dialog
                            fullWidth
                            className="dialog-content"
                            style={{ position: 'fixed', zIndex: 4001, padding: 0, background: "transparent" }}
                            open={open}
                            fullWidth={true}
                            aria-labelledby="max-width-dialog-title"
                        >
                            <IconButton className="d-flex justify-content-end p-0" onClick={this.close}>
                                <IconContext.Provider value={{ color: "black" }}>
                                    <div>
                                        <span > <IoClose /></span>
                                    </div>
                                </IconContext.Provider>
                            </IconButton>
                            <DialogContent>
                                <div className="item-description mb-5 ">
                                    <Carousel nextIcon={<span aria-hidden="true" className="carousel-next-icon"><i class="fas fa-arrow-circle-right "></i></span>} prevIcon={<span aria-hidden="true" className="carousel-prev-icon"><i class="fas fa-arrow-circle-left "></i></span>} interval={2000}>
                                        {this.get_articleImages(selectedItemId).map(image => (
                                            <Carousel.Item>
                                                <img src={image} alt="" />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className="p-2">
                                <span className="text-secondary text-600 "> *{selectedItemVariant}</span>

                                </div>
                                
                                <div className="row">
                                    {itemChildren.map(item => (
                                        <div key={item.id} title={item.variant_description} id={item.id} className="col-md-3 col-4 p-0" onClick={this.onChangeItem} >
                                            <img className="col-12 p-0" src={this.get_articleImages(item.id)[0]} />
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <button className="btn btn-success" onClick={this.onSelect}>Terminé</button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
            </div>
        )
    }
}
export default CustomDialog