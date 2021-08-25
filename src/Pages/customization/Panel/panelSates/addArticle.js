import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.annimatePanelLabel();
    }

    render() {
        const { selectedArticle, isArticleAdding, addArticle,handlePanelStates ,selectedCategory } = this.props
       
        return (
            <div>
                <div className="selected-article">
                    <img alt="" src={selectedArticle.img} />

                    <p className="text-secondary "><span>Desciption:</span>{selectedArticle.description}</p>
                    <h5>{selectedArticle.sale_price} DH</h5>

                </div>
                <div className="row justify-content-between pr-5 pl-5 pb-3">
                    {!isArticleAdding ? (
                        <button className="btn btn-info" onClick={() => addArticle(selectedArticle)}>
                            Ajouter au pack
                        </button>
                    ) : <CircularProgress />}
    
                </div>
            </div>

        )
    }
}
export default AddArticle