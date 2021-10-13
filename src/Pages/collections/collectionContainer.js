import React, { Component } from "react";
import Select from "react-select";
import { CSSTransition } from 'react-transition-group';
import axiosInstance from '../auth/axios'
import Items from "./items";
import queryString from 'query-string';
import Pagination from '@mui/material/Pagination';

class CollectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryTitle: "",
            categoryDescription: "",
            filters: [
                { value: '', label: 'Tous les produits' }
            ],
            sort :[
                { value: 'orders', label: 'Plus vendu' },
                { value: 'sale_price', label: 'Prix croissant' },
                { value: '-sale_price', label: 'Prix décroissant ' },
                { value: '-created', label: 'les plus récents ' },
                { value: 'title', label: 'Alphabétiquement,A-Z '},
                { value: '-title', label: 'Alphabétiquement,Z-A' },

            ],
            selectedSort:  { },
            selectedFilter: { value: '', label: 'Tous les produits' },
            items: [],
            isItemsLoading: true,
            itemsImages: [],
            isItemsImagesLoading: true,
            currentCategory: null,
            currentType: null,
            currentFilter: null,
            hasError: false,
            postsPerPage: 9,
            pages: null,
            currentPage: null
        }
    }


    componentDidMount() {

        axiosInstance
            .get(`api-categories/${this.props.currentType}/category-description/${this.props.currentCategory}`)
            .then((res) => {
                let filters = [...this.state.filters]
                res.data.filters.forEach(element => {
                    filters.push({ value: element.slug, label: element.title })
                });
                this.setState({
                    filters,
                    categoryDescription: res.data.description,
                    categoryTitle: res.data.title
                }, () => {
                    if (this.props.currentSort) {
                        let indexOf_item_sort = this.state.sort.findIndex(element => element.value === this.props.currentSort)
                        this.setState({
                            selectedSort: this.state.sort[indexOf_item_sort]
                        })
                        
                    } else {
                       
                        this.setState({
                            selectedSort:{ value: 'orders', label: 'Plus vendu' },
                        })
                    }
                    if (this.props.currentFilter) {
                        let indexOf_item_filter = this.state.filters.findIndex(element => element.value === this.props.currentFilter)
                        this.setState({
                            selectedFilter: this.state.filters[indexOf_item_filter]
                        })
                    }
                })
            })
            .catch(() => {
                this.props.handleHasError()
            })

        const url = `/${this.props.currentType}/category-items/${this.props.currentCategory}?${this.props.currentFilter ? (`filter=${this.props.currentFilter}`) : ''}&&page_size=${this.state.postsPerPage}&&${this.props.currentPage ? (`page=${this.props.currentPage}`) : ''}&&${this.props.currentSort?(`ordering=${this.props.currentSort}`):''}`
        axiosInstance
            .get(`api-categories` + url)
            .then((res) => {
                if (res.data.count % this.state.postsPerPage === 0) {
                    this.setState({
                        pages: res.data.count / this.state.postsPerPage
                    })
                } else {
                    this.setState({
                        pages: Math.floor(res.data.count / this.state.postsPerPage) + 1
                    })
                }
                this.setState({
                    items: res.data.results,
                    isItemsLoading: false
                })

            })
            .catch(() => {
                this.props.handleHasError()
            })

        axiosInstance
            .get(`api-images` + url)
            .then((res) => {
                this.setState({
                    itemsImages: res.data.results,
                    isItemsImagesLoading: false
                }, () => {

                })
            })
            .catch(() => {

                this.props.handleHasError()
            })

    }
    render() {
        const { categoryTitle, categoryDescription } = this.state
        const { filters, selectedFilter } = this.state
        const { sort, selectedSort } = this.state
        const { items, itemsImages, isItemsImagesLoading, isItemsLoading } = this.state
        return (
            <div className="container category-items-page ">
                <div className="selected-category mt-5">
                    <center className="title">
                        {categoryTitle}
                    </center>
                    <center className="category-description">
                        {categoryDescription}
                    </center>
                </div>
                <div className="mt-5 row  ">
                    <div className="col-md-6 col-12">
                        <h6>Filtre</h6>
                        <Select className="select" theme={theme => ({ ...theme, borderRadius: 0, transition: 0.5, colors: { ...theme.colors, primary: 'burlywood', }, })}
                            menuColor='red'
                            value={selectedFilter}
                           
                            options={filters}
                        />
                    </div>
                    <div className="col-md-6 col-12 mt-md-0 mt-3 d-flex justify-content-end">
                        <div className="col-md-6 col-12 p-0">
                            <h6>Trier par </h6>
                            <Select className="select " theme={theme => ({ ...theme, borderRadius: 0, transition: 0.5, colors: { ...theme.colors, primary: 'burlywood', }, })}
                                menuColor='red'
                                value={selectedSort}
                                onChange={(selectedSort) => this.props.handleChangeSort(selectedSort)}
                                options={sort}
                            />
                        </div>
                    </div>
                </div>
                {isItemsLoading ? (
                    <center className="container bg-white p-5 mt-5">
                        <div className="loader center" />
                    </center>
                ) :
                    <div className="mt-5">
                        <CSSTransition
                            in={this.state.ischanged}
                            timeout={{ enter: 1 }}
                            classNames="products-"
                            appear={true}
                        >
                            <Items isItemsImagesLoading={isItemsImagesLoading} items={items} itemsImages={itemsImages} />
                        </CSSTransition>
                    </div>
                }
                <center className="mt-5 mb-5 justify-cintent-center">
                    <Pagination size="large" count={this.state.pages} page={this.props.currentPage} onChange={(e, value) => this.props.handleChangePagination(e, value)} />
                </center>
            </div>

        )
    }
}

export default CollectionContainer;