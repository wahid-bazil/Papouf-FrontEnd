import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Panier from './sidebar/cart'
import Header from './navigation/header'
import Home from './home'
import Client from './sidebar/info';
import Customization from './customization/indexCustomization';
import Orders from "./orders/ordersList";
import axiosInstance from "./auth/axios";
import CopyCustomization from "./customization/indexCopyCustomization";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Order from "./orders/orderDetail";
import Drawer from '@material-ui/core/Drawer';
import DrawerMenu from "./navigation/drawerMenu";
import axios from 'axios';
import IndexItem from './itemDetail/indexItem';
import IndexCollection from './collections/indexCollection'

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartLoading: false,
      isCartOpen: false,
      isOrdersOpened: false,
      isCartImagesLoading: false,
      isClientInfoOpen: false,
      isChangingQuantityloading: false,
      updatingItem: null,
      CartItemAnimation: "",
      iscliked1: false,
      iscliked2: false,
      is_chat_open: false,
      op: "",
      panier: [],
      inpanier: false,
      add: false,
      cartItems: [],
      cartItemsImages: [],
      isLoged: false,
      currentCustomPackId: null,
      isCustomPackChanged: false,
      cartLenght: 0,
      ordersLenght: 0
    };
    this.handleAddCartItem = this.handleAddCartItem.bind(this);

  }

  componentDidMount() {
    const token = localStorage.getItem("access_token");
    if (token) {
      this.setState({ isLoged: true });
    }
    this.headerBadege()
 
  }

  headerBadege =()=>{
    if (localStorage.getItem('access_token')) {
      axios.get('https://papouf-backend-api.herokuapp.com/api-cart/lenght', {
        headers: {
          Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,

          'Content-Type': 'application/json',
          accept: 'application/json',

        }
      })
        .then((res) => {
          this.setState({
            cartLenght: res.data
          })
        })
        .catch(() => {

        })
      axios.get('https://papouf-backend-api.herokuapp.com/api-order/detail/lenght', {
        headers: {
          Authorization: localStorage.getItem('access_token')
            ? 'JWT ' + localStorage.getItem('access_token')
            : null,

          'Content-Type': 'application/json',
          accept: 'application/json',

        }
      })
        .then((res) => {
          this.setState({
            ordersLenght: res.data
          })
        })
        .catch(() => {

        })

    }
  }

  onChangeCustomPack = (CustomPack_id) => {
    this.setState({
      isCustomPackChanged: true,
      currentCustomPackId: CustomPack_id
    })
  }


  handleCart = () => {
    if (this.state.isCartOpen) {
      this.setState({ isCartOpen: false })
    } else {
      this.setState({
        isCartOpen: true,
        isCartLoading: true
      }, async () => {
        if (this.state.isCustomPackChanged) {
          /*let formData = new FormData();
          const item_id = this.state.currentCustomPackId
          const element = document.getElementById('pack-zone')
          const canvas = await html2canvas(element, {
            allowTaint: true,
            useCORS: true,
            scrollY: -window.scrollY
          })
          const blob = await new Promise(resolve => canvas.toBlob(resolve));
          formData.append('image', blob, 'image.png');
          formData.append('item', item_id);
          const config = { headers: { 'Content-Type': 'multipart/form-data' } };
          await axiosInstance.post('api/images/custompack', formData, config)
          this.setState({
            currentCustomPackId: null,
            isCustomPackChanged: false
          })
          */
        }

        const cartDetails = await axiosInstance.get(`api-cart/`)

        this.setState({
          cartItems: cartDetails.data.cartitems.reverse(),
          subtotal: cartDetails.data.subtotal,
          isCartImagesLoading: true,
          isCartImagesLoading:true
        }, () => {
          setTimeout(() => {
            this.setState({isCartLoading:false})
          }, 350);
          axiosInstance.get(`api-images/cartitems`)
            .then((res) => {
              console.log(res.data)
              this.setState({
                cartItemsImages: res.data,
                isCartImagesLoading: false
              })
            })
            .catch((res) => {
            })
        })
      })
    }
  }

  async handleAddCartItem(item) {
    
    this.setState({
      isCartOpen: true,
      isCartLoading: true
    }, async () => {
      //let formData = new FormData();
      const item_id = item.id
      const item_type = item.type
      console.log(item_id , item_type)
      await axiosInstance.post(`api-cart/cartitems`,
        {
          "item_id": item_id,
          "item_type": item_type,
        }
      )
      if (item_type === 'custompack' && !item.isCopy) {
        /*
         const element = document.getElementById('pack-zone')
         const canvas = await html2canvas(element, {
           allowTaint: true,
           useCORS: true,
           scrollY: -window.scrollY
         })
         console.log(canvas)
         const blob = await new Promise(resolve => canvas.toBlob(resolve));
         formData.append('image', blob, 'image.png');
         formData.append('item', item_id);
         const config = { headers: { 'Content-Type': 'multipart/form-data' } };
         await axiosInstance.post('api/images/custompack', formData, config)
       */
      }
      
      
      const cartDetails = await axiosInstance.get(`api-cart/`)
      this.setState({
        cartItems: cartDetails.data.cartitems.reverse(),
        subtotal: cartDetails.data.subtotal,
        isCartImagesLoading: true,
        isCartLoading: false
      }, () => {
       
          
        
        var indexOf_updated_item = this.state.cartItems.findIndex(item => item.item?.id === item_id)
        //[cartItems[0], cartItems[indexOf_updated_item]] = [cartItems[indexOf_updated_item], cartItems[0]]; not working !!
        const cartItems = [...this.state.cartItems]
        var item = cartItems[0]
        cartItems[0] = cartItems[indexOf_updated_item]
        cartItems[indexOf_updated_item] = item
        
        axiosInstance.get(`api-images/cartitems`)
          .then((res) => {
            this.setState({
              cartItemsImages: res.data,
              isCartImagesLoading: false,
              cartItems: cartItems,
              CartItemAnimation: "annimation",
              
            })
          })
        setTimeout(() => this.setState({ CartItemAnimation: "" }), 2000)
      })
      
    })
    
    
  }

  handleChangeQuantity_cart = (e) => {
    const id = e.currentTarget.id
    const title = e.currentTarget.title
    this.setState({ isChangingQuantityloading: true }, () => {
      this.setState({ updatingItem: id })
      const cartitem_id = id;
      var idd = parseInt(cartitem_id, 10);
      var i = 0;
      while (idd !== this.state.cartItems[i].cartitem_id) {
        i += 1;
      }
      let cartItems = [...this.state.cartItems];
      let cartItem = { ...cartItems[i] }

      if (title === "plus") {
        //const quantity = cartItems[i].quantity += 1
        cartItem.quantity += 1
        let quantity = cartItem.quantity
        cartItems[i] = cartItem
        axiosInstance.put(`api-cart/cartitems/${cartitem_id}`,
          {
            quantity: quantity
          }
        )
          .then(() => {

            this.setState({
              cartItems,
              isChangingQuantityloading: false,
              updatingItem: null

            })

          })
      }
      else if (title === "minus") {
        if (cartItems[i].quantity === 1) {

          axiosInstance.delete(`api-cart/cartitems/${cartitem_id}`)
            .then((res) => {
              cartItems.splice(i, 1);
              this.setState({ cartItems })
            })

        } else if (cartItems[i].quantity > 1) {
          cartItem.quantity -= 1
          let quantity = cartItem.quantity
          cartItems[i] = cartItem
          axiosInstance.put(`api-cart/cartitems/${cartitem_id}`,
            {
              quantity: quantity
            })
            .then(() => {
              this.setState({
                cartItems,
                isChangingQuantityloading: false,
                updatingItem: null
              })
            })
        }
      }
    })
  }
  handleClientInfo = (e) => {
    this.setState({ isClientInfoOpen: !this.state.isClientInfoOpen })
  }
  orders = (e) => {
    this.setState({

      isOrdersOpened: !this.state.isOrdersOpened
    });


  }

  annimate = () => {
    this.setState({ add: !this.state.add })
  }
  checkout = () => {
    if (localStorage.getItem('access_token')) {
      this.props.history.push("/checkout?step=inforamtions");
      window.location.reload()


    } else {
      this.props.history.push({
        pathname: '/sign-up',
        state: { incheckout: true }
      });

    }


  }
  OrderDetail = (order_id)=>{
    this.props.history.push(`/Order/${order_id}`);
  }
  CustomPackDetail = (pack_id , image)=>{
    this.props.history.push({
      pathname: '/Customization/Papouf-Boxes',
      state: { 
          pack_id:pack_id ,
          image : image
          
       }
  })
  }


  handleOrdersDrawer = () => {
    this.setState({
      isOrdersOpened: !this.state.isOrdersOpened
    })
  }
  handleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }


  render() {
    const { isLoged } = this.state
    const { cartItems, cartItemsImages, CartItemAnimation, isCartImagesLoading } = this.state;
    const { isCartOpen, isCartLoading, isClientInfoOpen, isOrdersOpened, isMenuOpen } = this.state
    const { isChangingQuantityloading, updatingItem, cartLenght, ordersLenght } = this.state



    return (
      <div >
        <Header cartLenght={cartLenght} ordersLenght={ordersLenght} handleMenu={this.handleMenu} isLoged={isLoged} openClientInfo={this.handleClientInfo} openCart={this.handleCart} panier={this.panier} />
        <Drawer open={isMenuOpen} anchor={'left'} onClose={this.handleMenu} >
          <DrawerMenu MainOnClose={this.handleMenu} />
        </Drawer>
        <SwipeableDrawer anchor={'right'} open={isCartOpen} onClose={this.handleCart}>

          <Panier CustomPackDetail={this.CustomPackDetail} cartItems={cartItems} cartItemsImages={cartItemsImages} isCartImagesLoading={isCartImagesLoading} isChangingQuantityloading={isChangingQuantityloading} updatingItem={updatingItem} CartItemAnimation={CartItemAnimation} isCartLoading={isCartLoading} checkout={this.checkout} inpanier={this.state.inpanier} add={this.state.add} panier_0={this.state.panier_0} close={this.handleCart} changeQuantity={this.handleChangeQuantity_cart} chnagepanier={this.chnagepanier} op1={this.state.op1} total={this.state.total} iscliked1={this.state.iscliked1} />
        </SwipeableDrawer>

        <SwipeableDrawer anchor={'right'} open={isOrdersOpened} onClose={this.handleOrders}>
          <Orders OrderDetail={this.OrderDetail} close={this.handleOrdersDrawer} />

        </SwipeableDrawer>
        <SwipeableDrawer anchor={'right'} open={isClientInfoOpen} onClose={this.handleClientInfo}>
          <Client ordersLenght={ordersLenght} isLoged={isLoged} openCart={this.handleCart} close={this.handleClientInfo} handleOrdersDrawer={this.handleOrdersDrawer} chat={this.chat} />
        </SwipeableDrawer>
        <div className={this.state.op}>
          <BrowserRouter forceRefresh={true} >
            <Route exact path="/order/:id" component={Order} />
            <Route exact path="/collections/:type/:category/:filter" component={IndexCollection} />
            <Route exact path="/collections/:type/:category/" component={IndexCollection} />
            <Route exact path="/" component={Home} />
            <Route exact path='/Customization/Papouf-Boxes' render={(props) => (<Customization {...props} handleAddCartItem={this.handleAddCartItem} onChangeCustomPack={this.onChangeCustomPack} isCustomPackChanged={this.state.isCustomPackChanged} isLoged={isLoged} />)} />
            <Route exact path='/Copy-Customization/Papouf-Boxes/:pack_id' render={(props) => (<CopyCustomization {...props} handleAddCartItem={this.handleAddCartItem} isLoged={isLoged} />)} />
            <Route exact path='/item/:type/:id' render={(props) => (<IndexItem {...props} panier={this.handleAddCartItem} />)} />
          </BrowserRouter>
         

        </div>
        <div className="mt-5">
       

        </div>
        


      </div>
    )
  }
}

export default Container;