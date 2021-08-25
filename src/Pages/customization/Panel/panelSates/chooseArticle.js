import React, { Component } from "react";

import axiosInstance from "../../../auth/axios"

import CircularProgress from '@material-ui/core/CircularProgress';
import { FcCheckmark } from 'react-icons/fc';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Carousel from 'react-grid-carousel'
import CustomDialog from "../../dialog";
import { BiSearch } from 'react-icons/bi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from "react-icons";
import IconButton from '@material-ui/core/IconButton';



class ChooseArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            filtredArticles:[],
            articlesImages: [],
            isArticlesLoading: false,
            isArticlesImagesLoading: false,
            isArticleSelected: false,
            selectedArticle: {
                article: null,
                images: []
            },
            opanDialog: false,
            selectedArticle: {
                info: null,
                images: []
            },
            filterTypeOptions: [
                { label: 'Prix', value: 'sale_price' },
                { label: 'Espace', value: 'space' }],
            filterOrderOptions: [
                { label: 'Croissant', value: 'ascending' },
                { label: 'Décroissant', value: 'descending' }],
            selectedfilterType: { label: 'Prix', value: 'sale_price' },
            selectedfilterOrder: { label: 'Croissant', value: 'ascending' },
            width: 0,
            row:3,
            col:3  
           

        }
    }
    update = () => {
        this.setState({
            width: window.innerWidth
        }, () => {
            if (this.state.width <= 280) {
                this.setState({ row: 3 ,col:2})
            }
            else if(this.state.width <= 440) {
                this.setState({ row: 3 ,col:3})
            }
            else if(this.state.width <= 950) {
                this.setState({ row: 2 ,col:3})
            }
            else {
                this.setState({ row: 2 ,col:4})
            }
        });
    };
    async componentDidMount() {
        this.update();
        const category = this.props.selectedCategory
        const res = await axiosInstance.get(`api/variation/article/${category}`)
    
        this.setState({
            articles: res.data.items,
            filtredArticles:res.data.items,
            isArticlesLoading: false
        }, () => {
            this.props.showPanelData()
        })
        this.props.annimatePanelLabel();
        this.setState({ isArticlesImagesLoading: true }, () => {
            axiosInstance.get(`api/images/article/${category}`)
                .then((res) => {
                    this.setState({
                        articlesImages: res.data.items,
                       
                        isArticlesImagesLoading: false
                    })

                })
                .catch(()=>{
                    
                })
        })

    }

    openDialog = (article, articleImages) => {
        if (this.props.spaceLibre < article.info?.space) {
            this.setState({
                opanDialog: true,
                selectedArticle: {
                    images: articleImages,
                    info: article
                }
            })

        } else {
            this.setState({
                opanDialog: true,
                selectedArticle: {
                    images: articleImages,
                    info: article
                }
            })
        }

    }
    closeDialog = () => {
        this.setState({ opanDialog: false })
    }

    get_articleImages = (item_id) => {
        const articlesImages = this.state.articlesImages
        let indexOf_articleImages = articlesImages.findIndex(element => element.item_id === item_id);
        let images = [];
        articlesImages[indexOf_articleImages]?.images.forEach(element => {
            images.push(element.image)
        });
        return images
    }

    hideItem = (article_id) => {
        if (this.props.packItems.some(packItem => packItem.item.id === article_id)) {
            return true
        }
        else {
            return false
        }
    }
    onTypeFilterChanged = (e) => {
        if (e.currentTarget.name === 'sale_price') {
            this.setState({ selectedfilterType: { label: 'Prix', value: 'sale_price' } }, () => {
                let articles = [...this.state.articles]
                articles.sort((a, b) => parseFloat(a.sale_price) - parseFloat(b.sale_price));
                this.setState({ filtredArticles:articles })
            })
        }
        else {
            this.setState({ selectedfilterType: { label: 'Espace', value: 'space' } }, () => {
                let articles = [...this.state.articles]
                articles.sort((a, b) => parseInt(a.space) - parseInt(b.space));
                this.setState({ filtredArticles:articles }, () => {
                    console.log(this.state.articles)
                })

            })
        }

    }
    onOrderFilterChanged = (e) => {
        if (e.currentTarget.name === 'ascending') {
            this.setState({ selectedfilterOrder: { label: 'Croissant', value: 'ascending' } }, () => {
                let articles = [...this.state.articles]
                if (this.state.selectedfilterType.value === 'sale_price') {
                    articles.sort((a, b) => parseInt(a.sale_price) - parseInt(b.sale_price));
                } else {
                    articles.sort((a, b) => parseInt(a.space) - parseInt(b.space));
                }
                this.setState({ filtredArticles:articles }, () => {
                    console.log(this.state.articles)
                })

            })
        }
        else {
            this.setState({ selectedfilterOrder: { label: 'Décroissant', value: 'descending' } }, () => {
                let articles = [...this.state.articles]
                if (this.state.selectedfilterType.value === 'sale_price') {
                    articles.sort((a, b) => parseInt(a.sale_price) - parseInt(b.sale_price));
                    articles.reverse();
                } else {
                    articles.sort((a, b) => parseInt(a.space) - parseInt(b.space));
                    articles.reverse();
                }
                this.setState({ filtredArticles:articles }, () => {
                    console.log(this.state.articles)
                })
            })
        }

    }

    render() {
        const { filtredArticles, articlesImages, isArticlesLoading, isArticlesImagesLoading, isArticleSelected, opanDialog, selectedArticle, filterOrderOptions, filterTypeOptions, selectedfilterType, selectedfilterOrder , row , col } = this.state
        const { addArticle, isArticleAdding, handlePanelStates, selectedCategory, isPanelDataloading, packItems, spaceLibre, updateArticleFeedBack } = this.props
     
        return (
            <div>
                {opanDialog ? (
                    <div className={`dialog `}>
                        <CustomDialog open={true} spaceLibre={spaceLibre} isLoading={isArticleAdding} hideItem={this.hideItem} item={selectedArticle} close={this.closeDialog} handlClick={addArticle} action='addArticle' feedBack={updateArticleFeedBack} />
                    </div>
                ) : null
                }
                <div className="panel-state-data ">

                    <IconButton className="back-to-pack " onClick={() => handlePanelStates('initial')}>
                        <IconContext.Provider value={{ color: "black" }}>
                            <div>
                                <span><IoMdCloseCircleOutline /></span>

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
                    <div className="data ">
                        <div className="geg p-0 btn-back0 ">
                            <IconButton className=" p-0" onClick={() => handlePanelStates('chooseArticleCategory')}>
                                <IconContext.Provider value={{ color: "black" }}>
                                    <div>
                                        <span><IoMdArrowRoundBack /></span>

                                    </div>
                                </IconContext.Provider>
                            </IconButton>
                            <span className="space text-600 ml-2">Back</span>

                        </div>
                        <Carousel cols={col} rows={row} gap={10} showDots={true} mobileBreakpoint={0} >
                            {filtredArticles.map(article => (
                                <Carousel.Item >
                                    <div key={article.id} className={`items    `}>
                                        {!isArticlesImagesLoading ? (
                                            <div className="single-item mb-2">
                                                <img alt="" src={this.get_articleImages(article.id)[0]} onClick={() => this.openDialog(article, this.get_articleImages(article.id))} />
                                                <center className="item-price mt-2">{article.sale_price}DH </center>
                                                
                                            </div>
                                        ) :
                                            <div class="lds-spinner p-5 mb-3"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                        }
                                    </div>
                                </Carousel.Item>
                            ))}


                        </Carousel>

                    </div>


                </div>
            </div>






        )

    }
}
export default ChooseArticle
