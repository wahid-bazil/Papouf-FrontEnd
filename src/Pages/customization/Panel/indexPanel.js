import React from "react";
import { Component } from "react";
import { BsFillInboxesFill } from 'react-icons/bs';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { RiImageAddFill } from 'react-icons/ri';

import { IconContext } from "react-icons";
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';

import AccordionDetails from '@material-ui/core/AccordionDetails';

import PanelSates from "./panelSates/indexPanelStates";
import PanelLabel from "./panelLabel"





class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {




        }
    }

    render() {


        const { handleChangeBoxe } = this.props
        const { handlePanelStates } = this.props
        const { currentPanelState } = this.props
        const { expended } = this.props
        const { panelLabelannimated, isPanelDataloading } = this.props
        const { boxes, articles, articleCategories } = this.props
        const { expendPanel } = this.props
        const { annimatePanelLabel } = this.props
        const { addArticle, changeBoxe, image } = this.props
        const { isArticleAdding } = this.props
        const { packImages } = this.props





        return (
            <div>
                <div className="panel-control bg-white mt-3 p-2">
                    {/*
                    <div className="panel-choices">
                        <div className="row  justify-content-between ">
                            <button className="  btn btn-outline-secondary mb-2" onClick={() => handlePanelStates("addBoxe")} ><IconContext.Provider value={{ color: "burlywood" }}>
                                <i className="icon-medium mr-2">
                                    <BsFillInboxesFill />
                                </i>
                                Changer la boxe
                            </IconContext.Provider>
                            </button>
                            <button className=" second btn btn-outline-secondary mb-2 " onClick={() => handlePanelStates("chooseArticleCategory")}><IconContext.Provider value={{ color: "burlywood" }}>
                                <i className="icon-medium mr-2">
                                    <HiOutlineViewGridAdd />
                                </i>
                                Ajouter un article
                            </IconContext.Provider>
                            </button>
                        </div>
                        <button className="   btn btn-outline-secondary mb-2" onClick={() => handlePanelStates("uploadImage")}><IconContext.Provider value={{ color: "burlywood" }}>
                            <i className="icon-medium mr-2">
                                <RiImageAddFill />
                            </i>
                            Uploader une image
                        </IconContext.Provider>
                        </button>
                    </div>
                    */}
                    <div className="mt-2 ">
                        <Accordion expanded={expended} >
                            <div className="panel-states ">
                                <AccordionDetails>
                                    <PanelSates packImages={packImages} isArticleAdding={isArticleAdding} image={image} changeBoxe={changeBoxe} addArticle={addArticle} expendPanel={expendPanel} annimatePanelLabel={annimatePanelLabel} handleChangeBoxe={handleChangeBoxe} isPanelDataloading={isPanelDataloading} currentPanelState={currentPanelState} handlePanelStates={handlePanelStates} boxes={boxes} articles={articles} articleCategories={articleCategories} />
                                </AccordionDetails>
                            </div>
                        </Accordion>
                    </div>

                </div>


            </div>
        )
    }

}
export default Panel


