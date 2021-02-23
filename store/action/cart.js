import * as actionType from './actionType'

export const addToCart=(product)=>{
    return{
        type:actionType.ADD_TO_CART,
        product:product
    }
}

export const removeCartItem=(productId)=>{
    return{
        type:actionType.REMOVE_CART_ITEM,
        productId:productId
    }
}