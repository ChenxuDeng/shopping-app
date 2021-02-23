import * as actionType from '../action/actionType'
import Order from "../../model/order";

const initialState={
    orders:[]
}

const order=(state=initialState,action)=>{
    switch (action.type){
        case actionType.ADD_ORDER:
            const newOrder=new Order(new Date().toString(),action.cartItems,action.totalAmount,new Date())
            return {
                ...state,
                orders:state.orders.concat(newOrder)
            }
    }
    return state
}

export default order