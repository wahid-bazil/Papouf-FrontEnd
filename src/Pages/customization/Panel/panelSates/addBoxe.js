import React, { Component } from "react";
import axiosInstance from "../../../auth/axios"

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Carousel from 'react-grid-carousel'

import Item from "../../../../util/item_display";
import CustomDialog from "../../dialog";
import { BiSearch } from 'react-icons/bi';
import { IoMdCloseCircleOutline } from 'react-icons/io';

import { IconContext } from "react-icons";
import IconButton from '@material-ui/core/IconButton';
class AddBoxe extends Component {
    constructor(props) {
        super(props);
        this.state = {

            boxes: [],
            filtredBoxes:[],
            boxesImages: [],
            isBoxesIamgesLoading:false,
            opanDialog: false,
            selectedBoxe: {
                images: [],
                info: null
            },
            filterTypeOptions: [
                { label: 'Prix', value: 'sale_price' },
                { label: 'Espace', value: 'space' }],
            filterOrderOptions: [
                { label: 'Croissant', value: 'ascending' },
                { label: 'Décroissant', value: 'descending' }],
            selectedfilterType: { label: 'Prix', value: 'sale_price' },
            selectedfilterOrder: { label: 'Croissant', value: 'ascending' },
        }
    }
    async componentDidMount() {
        const boxes = await axiosInstance.get(`api-categories/article/category-items/boxes`)
        this.setState({
            boxes: boxes.data,
            filtredBoxes:boxes.data,
            isBoxesIamgesLoading : true,
            
        }, () => {

            this.props.annimatePanelLabel();
            this.props.showPanelData();
        })
        axiosInstance.get(`api-images/article/category-items/boxes`)
            .then((res) => {
                this.setState({
                    boxesImages: res.data,
                    isBoxesIamgesLoading : false
                })

            })
            .catch(()=>{

            })



    }
    openDialog = (boxe, boxeImages) => {
        this.setState({
            opanDialog: !this.state.opanDialog,
            selectedBoxe: {
                images: boxeImages,
                info: boxe
            }
        })
    }

    close = () => {
        this.setState({
            opanDialog: false
        })
    }
    onTypeFilterChanged = (e) => {
        if (e.currentTarget.name === 'sale_price') {
            this.setState({ selectedfilterType: { label: 'Prix', value: 'sale_price' } }, () => {
                let boxes = [...this.state.boxes]
                boxes.sort((a, b) => parseFloat(a.sale_price) - parseFloat(b.sale_price));
                this.setState({ filtredBoxes:boxes })
            })
        }
        else {
            this.setState({ selectedfilterType: { label: 'Espace', value: 'space' } }, () => {
                let boxes = [...this.state.boxes]
                boxes.sort((a, b) => parseInt(a.space) - parseInt(b.space));
                this.setState({ filtredBoxes:boxes }, () => {
                   
                })

            })
        }

    }
    onOrderFilterChanged = (e) => {
        if (e.currentTarget.name === 'ascending') {
            this.setState({ selectedfilterOrder: { label: 'Croissant', value: 'ascending' } }, () => {
                let boxes = [...this.state.boxes]
                if (this.state.selectedfilterType.value === 'sale_price') {
                    boxes.sort((a, b) => parseInt(a.sale_price) - parseInt(b.sale_price));
                } else {
                    boxes.sort((a, b) => parseInt(a.space) - parseInt(b.space));
                }
                this.setState({ filtredBoxes:boxes }, () => {
                    
                })

            })
        }
        else {
            this.setState({ selectedfilterOrder: { label: 'Décroissant', value: 'descending' } }, () => {
                let boxes = [...this.state.boxes]
                if (this.state.selectedfilterType.value === 'sale_price') {
                    boxes.sort((a, b) => parseInt(a.sale_price) - parseInt(b.sale_price));
                    boxes.reverse();
                } else {
                    boxes.sort((a, b) => parseInt(a.space) - parseInt(b.space));
                    boxes.reverse();
                }
                this.setState({ filtredBoxes:boxes }, () => {
                    console.log(this.state.boxes)
                })
            })
        }

    }


    get_boxeImages = (boxe_id) => {
        const boxesImages = this.state.boxesImages
        let indexOf_boxe_images = boxesImages.findIndex(element => element.item_id === boxe_id)
        let images = [];
        boxesImages[indexOf_boxe_images]?.images.forEach(element => {
            images.push(element)
        });
        return images
    }






    render() {
        const { boxes, boxesImages, opanDialog, selectedBoxe ,filterOrderOptions, filterTypeOptions, selectedfilterType, selectedfilterOrder , filtredBoxes ,isDataLoading ,isBoxesIamgesLoading} = this.state
        const { handlePanelStates, handleChangeBoxe, isPanelDataloading, ispackBoxeImagesLoading, changeBoxe, spaceLibre, currentBoxeSpace, updateBoxeFeedBack } = this.props




        return (

            <div className="addBoxe  " >
                {opanDialog ? (
                    <CustomDialog open={opanDialog} item={selectedBoxe} close={this.close} handlClick={changeBoxe} action={'addBoxe'} feedBack={updateBoxeFeedBack} error={currentBoxeSpace - spaceLibre > selectedBoxe.info?.space ? ('Espace boxe insuffisant') : null} />
                ) :
                    null}
                {!isPanelDataloading ? (
                    <div className="panel-state-data ">
                        <IconButton className="back-to-pack " onClick={() => handlePanelStates('initial')}>
                            <IconContext.Provider value={{ color: "black" }}>
                                <div>
                                    <span > <IoMdCloseCircleOutline /></span>
                                </div>
                            </IconContext.Provider>
                        </IconButton>
                        <div className="filter pl-2 pr-2 pt-2 pb-2">
                            <div className="row ">
                                <span className="space text-600">Filtrer par :</span>

                                <span className="space text-600 offset-2"><BiSearch /> Chercher</span>
                            </div>
                            <div className="option">
                                {filterTypeOptions.map(type => (
                                    <div class="form-check">
                                        <input class="form-check-input " type="radio" name={type.value} checked={type.value === selectedfilterType.value} onChange={this.onTypeFilterChanged} />
                                        <label class="form-check-label " for="flexRadioDefault1">
                                            {type.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="option">
                                {filterOrderOptions.map(order => (
                                    <div class="form-check">
                                        <input class="form-check-input " type="radio" name={order.value} checked={order.value === selectedfilterOrder.value} onChange={this.onOrderFilterChanged} />
                                        <label class="form-check-label " for="flexRadioDefault1">
                                            {order.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="data  ">
                            <Carousel cols={4} rows={2} gap={10}  showDots={true} mobileBreakpoint={0} responsiveLayout={[{ breakpoint: 440, cols: 3, rows: 3, gap: 10, }, { breakpoint: 280, cols: 2, rows: 3, gap: 10}, { breakpoint: 950, cols: 3, rows: 2, gap: 10}]}>
                                {filtredBoxes.map(boxe => (
                                    <Carousel.Item>
                                        <div key={boxe.id} className="p-0">
                                            <Item isItemsImagesLoading={isBoxesIamgesLoading} sale_price={`${boxe.sale_price}`} onClick={() => this.openDialog(boxe, this.get_boxeImages(boxe.id))} images={this.get_boxeImages(boxe.id)} />
                                        </div>
                                    </Carousel.Item>
                                ))}

                            </Carousel>
                        </div>

                    </div>
                ) :
                    <center className="spinner">
                        <div className="loader  " />
                    </center>
                }
            </div>
        )
    }
}
export default AddBoxe