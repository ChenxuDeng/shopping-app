import React,{useState} from 'react';
import {FlatList, Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import CustomHeaderButton from "../../components/ui/headerButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import color from "../../color/color";
import * as action from "../../store/action";
import {Ionicons} from "@expo/vector-icons";
import CartScreen from "./cartScreen";

function OrderScreen(props) {
    const styles=StyleSheet.create({
        container:{
            margin:20
        },
        paper:{
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
        }
    })

    const [showDetails,setShowDetails]=useState(false)

    const order=useSelector((state)=>{
        return state.order.orders
    })

    return (
        <View>
            <FlatList data={order}
                      renderItem={(itemData)=>{
                          return <View style={styles.container}>
                              <View style={styles.paper}>
                                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                      <Text style={{fontFamily:'open-sans-bold',fontSize:16}}>
                                          ${itemData.item.totalAmount}
                                      </Text>
                                      <Text style={{fontFamily:'open-sans',color:'#888'}}>
                                          {itemData.item.readableDate}
                                      </Text>
                                  </View>
                                  <View style={{alignItems:'center',marginTop:20}}>
                                      <Button title={'Show Details'}
                                              color={color.primary}
                                              onPress={()=>{
                                                  setShowDetails((prev)=>{
                                                      return !prev
                                                  })
                                              }}
                                      />
                                  </View>
                                  {showDetails && (
                                      <View>
                                          {itemData.item.items.map((cartItem)=>{
                                              return <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:16}}>
                                                  <Text>
                                                      <Text style={{fontFamily:'open-sans',fontSize:16,color:'#888'}}>{cartItem.quantity} </Text>
                                                      <Text style={{fontFamily:'open-sans-bold',fontSize:16}}>{cartItem.productTitle}</Text>
                                                  </Text>
                                                  <Text style={{fontFamily:'open-sans-bold',fontSize:16}}>
                                                      ${cartItem.productPrice}
                                                  </Text>
                                              </View>
                                          })}
                                      </View>
                                  )}
                              </View>
                          </View>
                      }}
            />
        </View>
    );
}

OrderScreen.navigationOptions=(navigationData)=>{
    return {
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title={'Menu'} iconName={'md-menu'} onPress={()=>{
                navigationData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>
    }
}

export default OrderScreen