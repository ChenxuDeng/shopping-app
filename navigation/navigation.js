import {createStackNavigator} from "react-navigation-stack";
import ProductOverview from "../screens/shop/productOverview";
import color from "../color/color";
import {createAppContainer} from "react-navigation";
import ProductDetail from "../screens/shop/productDetail";
import CartScreen from "../screens/shop/cartScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import OrderScreen from "../screens/shop/orderScreen";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import UserProducts from "../screens/user/userProducts";
import EditProduct from "../screens/user/editProduct";

const ProductNavigator=createStackNavigator({
    ProductOverview:ProductOverview,
    ProductDetail:ProductDetail,
    Cart:CartScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:color.primary
        },
        headerTintColor:'white',
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        }
    },
    navigationOptions:{
        drawerIcon:(drawerConfig)=>{
            return <Ionicons name={'md-cart'} size={23} color={drawerConfig.tintColor}/>
        }
    }
})

const OrderNavigator=createStackNavigator({
    Order:OrderScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:color.primary
        },
        headerTintColor:'white',
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        }
    },
    navigationOptions:{
        drawerIcon:(drawerConfig)=>{
            return <Ionicons name={'md-list'} size={23} color={drawerConfig.tintColor}/>
        }
    }
})

const UserProductsNavigator=createStackNavigator({
    UserProducts:UserProducts,
    EditProduct:EditProduct
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:color.primary
        },
        headerTintColor:'white',
        headerTitleStyle:{
            fontFamily:'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        }
    },
    navigationOptions:{
        drawerIcon:(drawerConfig)=>{
            return <Ionicons name={'md-create'} size={23} color={drawerConfig.tintColor}/>
        }
    }
})

const ShopNavigator=createDrawerNavigator({
    Products:ProductNavigator,
    Orders:OrderNavigator,
    Admin:UserProductsNavigator
},{
    contentOptions:{
        activeTintColor:color.primary
    }
})

export default createAppContainer(ShopNavigator)