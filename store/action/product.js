import * as actionType from './actionType'
import axios from "axios";
import Product from "../../model/product";

export const deleteProduct=(productId)=>{
    return {
        type:actionType.DELETE_PRODUCT,
        productId:productId
    }
}

export const createProduct=(title,description,imageUrl,price)=>{
    const productData={
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    }
    return (dispatch)=>{
        axios.post('https://shopping-app-e1232-default-rtdb.europe-west1.firebasedatabase.app/products.json',productData).then((response)=>{
            dispatch({
                type:actionType.CREATE_PRODUCT,
                id:response.data.name,
                title:title,
                description:description,
                imageUrl:imageUrl,
                price:price
            })
        })

    }
}

export const updateProduct=(id,title,description,imageUrl)=>{
    return (dispatch)=>{
        axios.patch(`https://shopping-app-e1232-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`).then((response)=>{
            dispatch({
                type:actionType.UPDATE_PRODUCT,
                productId:id,
                title:title,
                description:description,
                imageUrl:imageUrl
            })
        })
    }
}

export const fetchProduct=()=>{
    return (dispatch)=>{
        dispatch(initProduct())
        axios.get('https://shopping-app-e1232-default-rtdb.europe-west1.firebasedatabase.app/products.json').then((response)=>{
            const products=[]
            for(const key in response.data){
                products.push(new Product(key,'u1',response.data[key].title,response.data[key].imageUrl,response.data[key].description,response.data[key].price))
            }
            dispatch({
                type:actionType.FETCH_PRODUCT,
                products:products
            })
        })
    }
}

export const initProduct=()=>{
    return {
        type:actionType.INIT_PRODUCT
    }
}
