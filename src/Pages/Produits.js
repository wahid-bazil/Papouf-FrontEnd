import React, { Component } from "react";
import Affichage_Produit from './Affichage_Produit';
import Pagination from './Pagination'
import { Range } from 'react-range';
import Select from "react-select";
import queryString from 'query-string';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import axiosInstance from './auth/axios'

class Produits extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categoryDescription: "",
      categoryTitle: "",
      items: [],
      filtredItems: [],
      itemsImages: [],
      isItemsLoading: false,
      isItemsImagesLoading: false,
      optionsType: [
        { value: 'product', label: 'Products' },
        { value: 'pack', label: 'Packs' },
      ],
      selectedOptionType: { value: 'product', label: 'Products' },

      categoryOptions: [],
      selectedOptionCategory: {
        value: null,
        label: null
      },
      options_npmbre_de_article: [
        { value: '1', label: ' 1' },
        { value: '2', label: ' 2' },
        { value: '3', label: ' 3' },
        { value: '4', label: ' 4' },
        { value: '5', label: ' 5' },
        { value: '6', label: ' 6' },
      ],

      selectedOption_npmbre_de_article: { value: '6', label: ' 6' },
      loading: false,
      currentPage: 1,
      postsPerPage: 8,
      max_price: [600],
      values0_min: [10],
      s: "desc",
      ischanged: true,
      ischanged1: true,
      type: null,
      category: null,
      filters: [{ value: 'All products', label: 'All products' }],
      selectedFilter: { value: 'All products', label: 'All products' }
    }
    this.handleChngeFilter = this.handleChngeFilter.bind(this)
  }
  componentDidMount() {
    this.setState({ isItemsLoading: true }, async () => {
      const type = this.props.match.params.type;
      const category = this.props.match.params.category;
      //const filter = queryString.parse(this.props.location.search).filter;
      /*const categories = await axiosInstance.get(`api/variation/${type}/categories`);
      let categoryOptions = [];
      categories.data.forEach(category => {
        let option = { label: category.title, value: category }
        categoryOptions.push(option)
      });*/

      try {
       
        const [items, categoryFilters] = await Promise.all([
          axiosInstance.get(`api/variation/${type}/category-items/${category}`),
          axiosInstance.get(`api/variation/${type}/category-filters/${category}`)
        ])
        this.setState({
          categoryTitle: items.data.title,
          categoryDescription: items.data.description,
          items: items.data.items,
          filtredItems: items.data.items,
         
          isItemsImagesLoading: true,
          category,
          type
        })
        let filters = [...this.state.filters]
        categoryFilters.data.filters.forEach(filter => {
          filters.push({ label: filter.title, value: filter.title })
        });
        setTimeout(() => {
          this.setState({
            filters,
            isItemsLoading: false,
          })
        }, 400);

        axiosInstance.get(`api/images/${type}/category-items/${category}`)
          .then((res) => {
            this.setState({
              itemsImages: res.data.items,
              isItemsImagesLoading: false
            })
          })
      }
      catch {

      }



    })
  }
  async handleChngeFilter(selectedFilter) {
    /*
    this.setState({ selectedFilter }, async () => {
      const selectedFilter = this.state.selectedFilter.value
      
      this.setState({ isItemsLoading: true })
      let ItemsUrl = null;
      let ImgaesUrl = null;
      if (selectedFilter === 'All products') {
        ItemsUrl = `api/variation/${this.state.type}/category-products/${this.state.category}`
        ImgaesUrl = `api/images/${this.state.type}/category-products/${this.state.category}`
      }
      else {
        ItemsUrl = `api/variation/${this.state.type}/filter-products/${selectedFilter}`
        ImgaesUrl = `api/images/${this.state.type}/filter-products/${selectedFilter}`
      }
      const items = await axiosInstance.get(ItemsUrl);
      this.setState({
        items: items.data.items,
        filtredItems: items.data.items,
        isItemsLoading: false,
        isItemsImagesLoading: true
      }, () => {
        axiosInstance.get(ImgaesUrl)
          .then((res) => {
            console.log(res.data)
            this.setState({
              itemsImages: res.data.items,
              isItemsImagesLoading: false
            })
          })
      })
    });
    */
  };
  handleChange_category = (selectedOptionCategory) => {
    this.setState({ selectedOptionCategory }, () => {
      const type = this.state.selectedOptionType.value
      const category = this.state.selectedOptionCategory.value?.title
      this.setState({ is_loading: true }, () => {
        //get the categories for the current type
        axiosInstance
          .get(`api/variation/${type}/${category}`)
          .then(res => {
        
            this.setState({ items: res.data.items }, () => {
              this.setState({
                filtredItems: this.state.items,
                is_loading: false
              })
            })
          })
      })
    })
  }

  onChange_price = (value) => {
    if (value < 1000) {
      this.setState(
        { max_price: [value] }, () => {
          var filtredItems = []
          for (let i = 0; i < this.state.items.length; i++) {
            if (parseInt(this.state.items[i].sale_price) <= parseInt(this.state.max_price[0])) {
              filtredItems.push(this.state.items[i])
            }
            this.setState({ filtredItems })
          }
        }
      )
    }
  }


  sort_max = (max_price) => {
    this.setState({ max_price: max_price })
    this.setState({ currentPage: 1 });
  }
  render() {
    const { selectedOptionType, selectedFilter, optionsType, filters } = this.state;
    const { selectedOptionCategory, categoryOptions } = this.state;
    const { currentPage, postsPerPage } = this.state;
    const { filtredItems, itemsImages, categoryDescription, categoryTitle } = this.state
    const { isItemsLoading, isItemsImagesLoading } = this.state
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filtredItems.slice(indexOfFirstPost, indexOfLastPost);
    
    return (


      <div className="main-items-page container  pt-3 p-0 ">

        <div>
          <div className="mt-2 mb-4">
            <div className="category-title ">
              {categoryTitle}
            </div>
            <div className="category-description text-center">
              {categoryDescription}
            </div>
          </div>

          <div className="row justify-content-between ">
            <div className="col-lg-4  col-md-4 ">
              <div className="sortLabel ">Filtres :</div>
              <div className="container p-2" >
                <Select className="  select" theme={theme => ({ ...theme, borderRadius: 0, transition: 0.5, colors: { ...theme.colors, primary: 'burlywood', }, })}
                  menuColor='red'
                  value={selectedFilter}
                  onChange={this.handleChngeFilter}
                  isSearchable={false}
                  options={filters}
                />
              </div>
            </div>
            <div className="sort-price col-lg-4 col-md-4  ">
              <div className="p-2 offset-md-1">
                <label className="sortLabel">Max Prix: </label>
                <input className="offset-1" type="number" min="0" name="sale_prix" value={this.state.max_price} onChange={(e) => this.onChange_price(e.target.value)} />
                <div className="  container  p-3">
                  <Range step={10} min={0} max={1000} values={this.state.max_price} onChange={(values) => this.onChange_price(values)} renderTrack={({ props, children }) => (<div className=" range  "{...props}>{children}</div>)} renderThumb={({ props }) => (<div className="range-button"{...props} style={{ ...props.style, }} />)} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <CSSTransition
              in={this.state.ischanged}
              timeout={{ enter: 1 }}
              classNames="products-"
              appear={true}
            >
              <Affichage_Produit isItemsLoading={isItemsLoading} isItemsImagesLoading={isItemsImagesLoading} items={currentPosts} itemsImages={itemsImages} max_prix={this.state.max_price} ischanged={this.state.ischanged1} type={selectedOptionType.value} />
            </CSSTransition>
          </div>
        </div>




      </div>

    )
  }
}

export default Produits;