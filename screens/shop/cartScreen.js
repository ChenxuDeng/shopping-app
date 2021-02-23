import React from 'react';
import {Text, View, StyleSheet, Button, FlatList, TouchableOpacity} from "react-native";
import color from "../../color/color";
import {useSelector,useDispatch} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import * as action from '../../store/action/index'

function CartScreen(props) {
    const styles=StyleSheet.create({
        container:{
            margin:15
        },
        paper:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            shadowOffset:{
                width:0,
                height:2
            },
            shadowRadius:10,
            shadowColor:'black',
            shadowOpacity:0.26,
            backgroundColor:'white',
            width:'100%',
            elevation:5,
            borderRadius:10,
            padding:10,
            marginBottom:10
        },
        itemContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })

    const totalPrice=useSelector((state)=>{
        return state.cart.totalAmount
    })
    const dispatch=useDispatch()

    const cartItems=useSelector((state)=>{
        const transformedCartItems=[]
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b)=>{
            return a.productId>b.productId?1:-1
        })
    })

    return (
        <View style={styles.container}>
            <View style={styles.paper}>
                <Text style={{fontFamily:'open-sans-bold',fontSize:17}}>
                    Total: <Text style={{fontFamily:'open-sans-bold',fontSize:17,color:color.primary}}>${Math.round(totalPrice.toFixed(2)*100)/100}</Text>
                </Text>
                <Button title={'Order Now'} onPress={()=>{dispatch(action.addOrder(cartItems,totalPrice))}} color={color.secondary} disabled={cartItems.length===0}/>
            </View>
            <View>
                <FlatList data={cartItems}
                          keyExtractor={(item)=>{
                              return item.productId
                          }}
                          renderItem={(itemData)=>{
                              return <View>
                                  <View style={styles.itemContainer}>
                                      <Text style={{fontFamily:'open-sans',fontSize:16,color:'#888'}}>
                                          {itemData.item.quantity} <Text style={{fontFamily:'open-sans-bold',fontSize:16,color:'black'}}>{itemData.item.productTitle}</Text>
                                      </Text>
                                      <View style={{flexDirection:'row',alignItems:'center'}}>
                                          <Text style={{fontFamily:'open-sans-bold',fontSize:16}}>
                                              ${itemData.item.sum.toFixed(2)}
                                          </Text>
                                          <TouchableOpacity style={{marginLeft:16}} onPress={()=>{
                                              dispatch(action.removeCartItem(itemData.item.productId))
                                          }}>
                                              <Ionicons name={'md-trash'} size={23} color={'red'}/>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              </View>
                          }}
                />
            </View>
        </View>
    );
}

export default CartScreen;