import * as actionType from '../action/actionType'
import PRODUCTS from "../../data/dummyData";
import Product from "../../model/product";

const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter((product)=>{
        return product.ownerId==='u1'
    }),
    loading:false
}

const product=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter((product)=>{
                    return product.id !== action.productId
                }),
                availableProducts: state.availableProducts.filter((product)=>{
                    return product.id !== action.productId
                })
            }
        case actionType.CREATE_PRODUCT:
            const newProduct=new Product(
                action.id,
                'u1',
                action.title,
                action.imageUrl,
                action.description,
                action.price
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case actionType.UPDATE_PRODUCT:
            const productIndex=state.userProducts.findIndex((product)=>{
                return product.id===action.productId
            })
            const updatedProduct=new Product(
                action.productId,
                state.userProducts[productIndex].ownerId,
                action.title,
                action.imageUrl,
                action.description,
                state.userProducts[productIndex].price
            )
            const updatedUserProducts=[...state.userProducts]
            updatedUserProducts[productIndex]=updatedProduct
            const availableProductIndex=state.availableProducts.findIndex(
                (product)=>{
                    return product.id===action.productId
                }
            )
            const updatedAvailableProduct=[...state.availableProducts]
            updatedAvailableProduct[availableProductIndex]=updatedProduct
            return {
                ...state,
                availableProducts: updatedAvailableProduct,
                userProducts: updatedUserProducts
            }
        case actionType.FETCH_PRODUCT:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter((product)=>{
                    return product.ownerId==='u1'
                }),
                loading: false
            }
        case actionType.INIT_PRODUCT:
            return {
                loading: true
            }
        default:
            return state
    }
}

export default product