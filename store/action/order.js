import * as actionType from './actionType'

export const addOrder=(cartItems,totalAmount)=>{
    return{
        type:actionType.ADD_ORDER,
        cartItems:cartItems,
        totalAmount:totalAmount
    }
}