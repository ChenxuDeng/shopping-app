import React from 'react';
import {Text, View, StyleSheet, Image, Button} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import color from "../../color/color";
import * as action from '../../store/action/index'

function ProductDetail(props) {
    const styles=StyleSheet.create({
        image:{
            width:'100%',
            height:300
        },
        button:{
            alignItems:'center',
            marginVertical:10
        },
        price:{
            fontSize:20,
            color:'#888',
            textAlign:'center',
            marginVertical:10,
            fontFamily:'open-sans-bold'
        },
        description:{
            fontSize: 14,
            textAlign: 'center',
            marginHorizontal:20,
            marginVertical: 10,
            fontFamily: 'open-sans'
        }
    })

    const productId=props.navigation.getParam('productId')
    const selectedProduct=useSelector((state)=>{
        return state.products.availableProducts.find((product)=>{
            return product.id===productId
        })
    })
    const dispatch=useDispatch()

    return (
        <View>
            <Image source={{uri:selectedProduct.imageUrl}} style={styles.image}/>
            <View style={styles.button}>
                <Button title={'Add to Cart'} color={color.primary} onPress={()=>{
                    dispatch(action.addToCart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>
                ${selectedProduct.price}
            </Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
        </View>
    );
}

ProductDetail.navigationOptions=(navigationData)=>{
    return {
        headerTitle:navigationData.navigation.getParam('productTitle')
    }
}

export default ProductDetail;