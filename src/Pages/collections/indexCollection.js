import React, { Component } from "react";

import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Item from '../../util/item_display'
import ErrorCollectionsBoundary from "./errorCollectionsBoundary";
import CollectionContainer from "./collectionContainer";
import queryString from 'query-string';


class IndexCollection extends Component {
    constructor(props) {
        super(props);
        this.state={
            hasError:false
        }
    }

    handleHasError = ()=>{
      
        this.setState({hasError:true})
    }
    handleChangeFilter = (selectedFilter) => {
        const type = this.props.match.params.type;
        const category = this.props.match.params.category;
        const filter = selectedFilter.value
        this.props.history.push(`/collections/${type}/${category}/${filter}`);
    }

    handleChangePagination = (event, value) => {
        let page= value
        let ordering = ''
        let url=''
        if (queryString.parse(this.props.location.search).ordering) {
            ordering=queryString.parse(this.props.location.search).ordering
            url = this.props.location.pathname + `?page=${page}` + `&&ordering=${ordering}`
        }
        else {
            console.log('here1')
            url = this.props.location.pathname + `?page=${page}` 
        }
        this.props.history.push(url)
    }
    handleChangeSort = (selectedSort) => {
        let page= ''
        let ordering = selectedSort.value
        let url=''
        if (queryString.parse(this.props.location.search).page) {
            page = queryString.parse(this.props.location.search).page
            url = this.props.location.pathname + `?page=${page}` + `&&ordering=${ordering}`
        }
        else {
            url = this.props.location.pathname + `?ordering=${ordering}` 
        }
        this.props.history.push(url)
    }


    componentDidUpdate(prevProps) {
        if (prevProps.match.params.filter !== this.props.match.params.filter) {
            window.location.reload()
        }
        if (queryString.parse(prevProps.location.search).page !== queryString.parse(this.props.location.search).page) {
            window.location.reload()
        }

        /*if (parseInt(queryString.parse(this.props.location.search).page)) {
           if (parseInt(queryString.parse(this.props.location.search).page) != this.state.currenPage) {
            window.location.reload()
           }
        }

        if (this.state.currentFilter) {
            if (this.props.location.pathname != `/collections/${this.state.currentType}/${this.state.currentCategory}/${this.state.currentFilter}`) {
                window.location.reload()

            }
        }
        else {
            if (this.props.location.pathname != `/collections/${this.state.currentType}/${this.state.currentCategory}/` && this.props.location.pathname != `/collections/${this.state.currentType}/${this.state.currentCategory}`) {
                window.location.reload()
            }
        
        }*/
    }
    
    render(){
        const url = this.props.location.pathname
        const {hasError} =this.state
        const currentSort = queryString.parse(this.props.location.search).ordering
      
        
        return(
            <ErrorCollectionsBoundary handleHasError={this.handleHasError} hasError={hasError}>
                <CollectionContainer handleChangeSort={this.handleChangeSort} handleChangePagination={this.handleChangePagination} handleChngeFilter={this.handleChngeFilter} handleHasError={this.handleHasError} currentType={this.props.match.params.type} currentCategory={this.props.match.params.category} currentFilter={this.props.match.params.filter} currentPage={(parseInt(queryString.parse(this.props.location.search).page) ? parseInt(queryString.parse(this.props.location.search).page) : 1) } currentSort={currentSort}   />
            </ErrorCollectionsBoundary>
        )
    }

}
export default IndexCollection 