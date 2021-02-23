import * as actionType from '../action/actionType'
import CartItem from "../../model/cartItem";

const initialState={
    items:{},
    totalAmount:0
}

const cart=(state=initialState,action)=>{
    switch (action.type){
        case actionType.ADD_TO_CART:
            if(state.items[action.product.id]){
                const updatedCartItem=new CartItem(
                    state.items[action.product.id].quantity+1,
                    action.product.price,
                    action.product.title,
                    state.items[action.product.id].sum+action.product.price
                )
                return {
                    ...state,
                    items:{...state.items,[action.product.id]:updatedCartItem},
                    totalAmount: state.totalAmount + action.product.price
                }
            }else {
                const newCartItem=new CartItem(1,action.product.price,action.product.title,action.product.price)
                return {
                    ...state,
                    items:{...state.items,[action.product.id]:newCartItem},
                    totalAmount: state.totalAmount + action.product.price
                }
            }
        case actionType.REMOVE_CART_ITEM:
            const selectedItem=state.items[action.productId]
            const currentQuantity=selectedItem.quantity
            let updatedCartItems
            if(currentQuantity>1){
                const updatedCartItem=new CartItem(selectedItem.quantity-1,selectedItem.productPrice,selectedItem.productTitle,selectedItem.sum-selectedItem.productPrice)
                updatedCartItems={...state.items,[action.productId]:updatedCartItem}
            }else {
                updatedCartItems={...state.items}
                delete updatedCartItems[action.productId]
            }
            return {
                ...state,
                items:updatedCartItems,
                totalAmount: state.totalAmount-selectedItem.productPrice
            }
        case actionType.ADD_ORDER:
            return initialState
        case actionType.DELETE_PRODUCT:
            if(!state.items[action.productId]){
                return state
            }
            const updatedItem={...state.items}
            const itemTotal=state.items[action.productId].sum
            delete updatedItem[action.productId]
            return {
                ...state,
                items:updatedItem,
                totalAmount: state.totalAmount-itemTotal
            }
    }
    return state
}

export default cart