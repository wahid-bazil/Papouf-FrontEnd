import React, { Component } from "react";

import { CSSTransition } from 'react-transition-group';
import { FaRegWindowClose } from 'react-icons/fa';
import { CgAddR } from 'react-icons/cg';

import Articles from "./articles";
import axiosInstance from "./auth/axios"
import { GiConsoleController } from "react-icons/gi";



class ArticleCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            is_loading: false,
            isArticles_opened: false,
            isArticles_loaded: false,
            selectedCategory:null
        }
    }
    componentDidMount() {
        this.setState({ is_loading: true }, () => {
            axiosInstance.get(`api/variation/article/categories`)
                .then(res => {
                    this.setState({ categories: res.data })
                    this.setState({ is_loading: false })
                })
        })
    }
    handleClik = (e) => {
        
        if (this.state.isArticles_loaded) {
            this.setState({isArticles_loaded:false})
            
        } else {
            this.setState({isArticles_loaded:true})
            this.setState({ selectedCategory: e.currentTarget.title })
            
        }
   

    }
    addArticle = (e) => {
        this.props.addArticle(e)

    }
    deleteArticle = (e) => {
        this.props.deleteArticle(e)
    }
    render() {
        const { categories , selectedCategory , is_loading } = this.state
        const { isArticles_loaded, isArticles_opened } = this.state
        const {isaddArticle_loading} = this.props
       
        
       
        return (
            <div className="ArticleCategory col-sm-12  col-md-5 col-lg-4">
                {isArticles_loaded ? (
                    <CSSTransition
                        in={isArticles_loaded}
                        timeout={{ enter: 2000, appear: 2000, exit: 2 }}
                        classNames="Articles-"
                        appear={true}
                        enter={true}
                    >
                        <Articles selectedArticles={this.props.selectedArticles} selectedCategory={selectedCategory} is_selected={this.props.is_selected} isaddArticle_loading={isaddArticle_loading} close={this.handleClik} addArticle={this.addArticle} deleteArticle={this.deleteArticle} />
                    </CSSTransition>) : null}
                <div className="d-flex justify-content-between mt-2">
                    <div>
                        <h3>Categories</h3>
                    </div>
                    <button title="item" className="btn1" onClick={(e) => this.props.close(e)}><FaRegWindowClose /></button>

                </div>
                <div className="mt-3">
                    <div className="container">
                        <div className="row">
                            {!is_loading ? (categories.map(category => (
                                <div key={category.title} className="categories boxe-img col-4 p-3 ">
                                    <img title={category.title} alt="" id="e"  src={category.img} onClick={this.handleClik} />
                                   
                                    <h4 className="prix mt-2 text-secondary">{category.title}</h4>
                                </div>
                            ))) :
                                <div className="loader"></div>
                            }
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}
export default ArticleCategory

