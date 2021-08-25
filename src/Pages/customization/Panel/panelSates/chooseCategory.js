import React, { Component } from "react";
import axiosInstance from "../../../auth/axios"
import { BiShow } from 'react-icons/bi';
import IconButton from '@material-ui/core/IconButton';
import Carousel from 'react-grid-carousel'
import { CarouselItem } from "react-bootstrap";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { BiArrowBack } from "react-icons/bi";
import { IoMdCloseCircleOutline } from 'react-icons/io';

import { IconContext } from "react-icons";
class ChooseCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleCategories: []


        }

    }
    async componentDidMount() {
        this.props.expendPanel();
        this.props.annimatePanelLabel();
        const categories = await axiosInstance.get(`api/variation/pack/article-categories/papouf-Boxes`)
        console.log(categories.data)
        this.setState({
            articleCategories: categories.data.article_categories,

        }, () => {
            this.props.showPanelData()
        })





    }

    render() {
        const { articleCategories } = this.state
        const { handlePanelStates, isPanelDataloading, currentPanelState } = this.props
        const steps = ['Category', 'Article']
        var activeStep = 0
        switch (currentPanelState.value) {
            case 'chooseArticleCategory':
                activeStep = 0
                break;

            case 'chooseArticle':
                activeStep = 1
                break;
        }


        return (
            <div className="">
                {!isPanelDataloading ? (
                    <div className="panel-state-data ">
                        <IconButton className="back-to-pack " onClick={() => handlePanelStates('initial')}>
                            <IconContext.Provider value={{ color: "black" }}>
                                <div>
                                    <span > <IoMdCloseCircleOutline /></span>
                                </div>
                            </IconContext.Provider>

                        </IconButton>
                        <div>
                            <div className="panel-label p-3">
                                {currentPanelState.label}
                            </div>
                            <div className="  row  mt-4  ">
                                <div className="btn-back ">
                                    {currentPanelState.value === 'chooseArticle' ? (<IconButton onClick={this.back} style={{ backgroundColor: '', color: 'black' }}>
                                        <BiArrowBack />
                                    </IconButton>) : null}
                                </div>
                                <div className="stepper " >
                                    <Stepper alternativeLabel activeStep={activeStep}  >
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel >{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </div>
                            </div>
                        </div>
                        <div className="data">
                            <Carousel cols={4} rows={3}  showDots={true} mobileBreakpoint={0} responsiveLayout={[{ breakpoint: 450, cols: 3, rows: 3, gap: 10}]} >
                                {articleCategories.map(category => (
                                    <Carousel.Item>
                                        <div key={category.title} className="  ">
                                            <img alt="" src={category.img} onClick={handlePanelStates} onClick={() => handlePanelStates("chooseArticle", category.title)} />
                                            <div className="item-title center mt-2">{category.title}</div>
                                        </div>
                                    </Carousel.Item>
                                ))}

                            </Carousel>
                        </div>
                    </div>
                ) : 
                <center className="spinner">
                    <div className="loader" />
                </center>
                }


            </div>
        )
    }
}
export default ChooseCategory