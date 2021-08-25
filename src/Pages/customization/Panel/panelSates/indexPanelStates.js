import React, { Component } from "react";
import ChooseArticle from "./chooseArticle";
import AddBoxe from "./addBoxe";
import ChooseCategory from "./chooseCategory"
import InitialPanel from "./initialPanel"
import UploadImage from "./uploadImage"
import AddArticle from "./addArticle"
import PanelLabel from "../panelLabel"
class panelSates extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { currentPanelState } = this.props
        const { handlePanelStates } = this.props
        const { handleChangeBoxe } = this.props
        const { boxes, articles, articleCategories } = this.props
        const { isPanelDataloading } = this.props
        const { expendPanel } = this.props
        const { annimatePanelLabel } = this.props
        const { addArticle, changeBoxe, image } = this.props
        const { isArticleAdding, ispackBoxeImagesLoading ,updateBoxeFeedBack} = this.props
        const { packImages, panelLabelannimated, showPanelData, expended, packItems, spaceLibre, currentBoxeSpace ,updateArticleFeedBack} = this.props

        return (
         
            <div className=" panel-state  p-0">
               
                {/*<div className="panel-state-label">
                    <PanelLabel expended={expended} panelLabelannimated={panelLabelannimated} isPanelDataloading={isPanelDataloading} currentPanelState={currentPanelState} panelLabelannimated={panelLabelannimated} handlePanelStates={handlePanelStates} />
                </div>
        */}
                
                    {(() => {
                        switch (currentPanelState.value) {
                            case 'addBoxe':
                                return (
                                    
                                        <AddBoxe updateBoxeFeedBack={updateBoxeFeedBack} handlePanelStates={handlePanelStates} currentBoxeSpace={currentBoxeSpace} spaceLibre={spaceLibre} ispackBoxeImagesLoading={ispackBoxeImagesLoading} isPanelDataloading={isPanelDataloading} showPanelData={showPanelData} changeBoxe={changeBoxe} expendPanel={expendPanel} annimatePanelLabel={annimatePanelLabel} boxes={boxes} handleChangeBoxe={handleChangeBoxe} />
                                   
                                )
                            case 'chooseArticle':
                                return (
                                   
                                        <ChooseArticle updateArticleFeedBack={updateArticleFeedBack} spaceLibre={spaceLibre} packItems={packItems} showPanelData={showPanelData} handlePanelStates={handlePanelStates} isArticleAdding={isArticleAdding} annimatePanelLabel={annimatePanelLabel} addArticle={addArticle} selectedArticle={currentPanelState.selectedArticle} selectedCategory={currentPanelState.selectedCategory} handlePanelStates={handlePanelStates} annimatePanelLabel={annimatePanelLabel} isPanelDataloading={isPanelDataloading} selectedCategory={currentPanelState.selectedCategory} />
                                    
                                )
                            case 'chooseArticleCategory':
                                return (
                                  
                                        <ChooseCategory currentPanelState={currentPanelState} isPanelDataloading={isPanelDataloading} showPanelData={showPanelData} annimatePanelLabel={annimatePanelLabel} expendPanel={expendPanel} handlePanelStates={handlePanelStates} articleCategories={articleCategories} />
                                    
                                )
                            case 'uploadImage':
                                return (
                                   
                                        <UploadImage image={image} packImages={packImages} />
                                   
                                )
                            case 'initial':
                                return (
                                    
                                        <InitialPanel expendPanel={expendPanel} handlePanelStates={handlePanelStates} />
                                  
                                )
                        }
                    })()}
                
            </div>
        )
    }
}
export default panelSates


