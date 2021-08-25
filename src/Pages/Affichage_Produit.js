import React, { Component } from "react";

import { Link } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Item from '../util/item_display'



class Affichage_Produit extends Component {


    get_itemImages = (item_id) => {
        const itemsImages = this.props.itemsImages
        let images = [];
        let indexOf_item_images = itemsImages.findIndex(element => element.item_id === item_id)
        itemsImages[indexOf_item_images]?.images.forEach(element => {
            images.push(element.image)
        });
        return images
    }
    render() {
        const { isItemsLoading, isItemsImagesLoading } = this.props
        

        return (
            <div >
                {!  isItemsLoading ? (
                    <div>
                        {this.props.items.length === 0 ? (
                            <div className="null d-flex align-items-center justify-content-center mb-4">
                                0
                            </div>
                        ) :
                            <div className="row " >
                                {this.props.items.map(item => (
                                    <CSSTransition
                                        in={this.props.ischanged}
                                        timeout={{ enter: 1 }}
                                        classNames="products-"
                                        appear={true}>
                                        <div key={item.id} className=" items-list col-xl-3 col-md-4 col-6 p-2  mb-2">
                                            <Link to={{ pathname: `/DetailsItem`, search: `?type=${item.type}&item_id=${item.id}` }}>
                                                <Item isItemsImagesLoading={isItemsImagesLoading} status={item.status} title={item.title} promo={item.promo} promo_percentage={item.promo_percentage} sale_price={item.sale_price} promo_price={item.promo_price} images={this.get_itemImages(item.id)} />
                                            </Link>


                                        </div>
                                    </CSSTransition>))}
                            </div>
                        }

                    </div>
                ) :
                    <center className="container bg-white p-5 mt-5">
                        <div className="loader center" />
                    </center>
                }

            </div>
        )
    }
}
export default Affichage_Produit