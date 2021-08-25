import React, { Component } from "react";
import Badge from '@material-ui/core/Badge';

class Item extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { onClick, images, title, status, sale_price, promo, promo_price, promo_percentage, item_title, isItemsImagesLoading } = this.props
        return (

            <div>
                {!isItemsImagesLoading ? (
                    <div class={` ${status != null ? (status) : ''} `} >
                        {sale_price === 0 ? (
                            <img alt="" onClick={onClick} src={images[0]} onMouseOver={e => e.currentTarget.src = images[1]} onMouseOut={e => e.currentTarget.src = images[0]} />
                        ) :
                            <img alt="" onClick={onClick} src={images[0]} onMouseOver={e => e.currentTarget.src = images[1]} onMouseOut={e => e.currentTarget.src = images[0]} />
                        }
                        {promo ? (
                            <span class="ribbon3">-{promo_percentage}%</span>
                        ) : null
                        }
                    </div>
                ) :
                    <div className="pb-5">
                        <div class="lds-spinner "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                }
                <center className="item-info mt-2">
                    <div className="item-title ">
                        {title}
                    </div>
                    {sale_price != 0 ? (
                        <div>
                            <div className="item-price">
                                {promo_price ? (promo_price) : sale_price} DH
                            </div>
                            {promo && promo_price && sale_price ? (
                                <div className="item-promo">
                                    {sale_price} DH
                                </div>
                            ) : null
                            }
                        </div>
                    ) : 
                    <div className="item-price text-info">Free</div>
                    }
                </center>

            </div>





        )
    }
}
export default Item
