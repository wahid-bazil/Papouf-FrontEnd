import React, { Component } from "react";
import { BiArrowBack } from "react-icons/bi";
import axiosInstance from "./auth/axios"


class Articles extends Component {
    constructor(props) {
        super(props);
        this.selected_article_Ref = React.createRef()
        this.state = {
            isLoading: false,
            articles: [],
            focusedArticle: null




        }
        this.handleclick = this.handleclick.bind(this);


    }
    componentDidMount() {
        this.setState({ isLoading: true }, () => {
            const category = this.props.selectedCategory
            console.log(category)
            axiosInstance.get(`api/variation/article/${category}`)
                .then(res => {
                    console.log(res.data.article_set)
                    this.setState({ isLoading: false })
                    this.setState({ articles: res.data.article_set })
                })
        })
    }
    handleclick(e, article) {

        this.props.addArticle(article)
        this.setState({ focusedArticle: null })


    }
    showDescription = (article) => {

        this.setState({ focusedArticle: article })

    }

    render() {
        const { isLoading, isaddArticle_loading } = this.props
        const { articles, focusedArticle } = this.state
        const { selectedArticles } = this.props


        function selectedArticlesDispaly(article) {

            if ((selectedArticles.some(selectedArticle => selectedArticle.item.id === article.id))) {
                return " headshot-2 article_img col-4 p-3"
            }
            else {
                return " article_img col-4 p-3"
            }
        }
        console.log("r", isaddArticle_loading)
        return (

            <div className="Articles col-12 ">
                <div className="top-side mt-3 ">
                    <div className="d-flex justify-content-between ">
                        <h3>Articles</h3>
                        <button className="btn1" onClick={(e) => this.props.close(e)}>
                            <BiArrowBack />
                        </button>
                    </div>
                    <div className="row">
                        {!isLoading ? (articles.map(article => (
                            <div key={article.id} onClick={() => this.showDescription(article)} className={selectedArticlesDispaly(article)}>
                                <img alt="" src={article.img} />
                                <div className="item-name">{article.title}</div>
                                <div className="item-price ">{article.sale_price}DH</div>
                            </div>
                        ))) : <div className="loader"></div>}
                    </div>
                </div>
                <div className="bot-side p-2">
                    <div className="description ">
                        {focusedArticle ? (!isaddArticle_loading ? (
                            <div className="d-flex justify-content-between align-items-center">
                                <img src={focusedArticle.img} />
                                <div>
                                    <p className="text-secondary"><span>Desciption:</span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                    <button className="buttonadd btn " onClick={(e) => { this.handleclick(e, focusedArticle) }}>Add to Box</button>
                                </div>
                            </div>
                        ) :
                            <div className="loader"></div>) : null}
                    </div>


                </div>
            </div>
        )
    }
}
export default Articles