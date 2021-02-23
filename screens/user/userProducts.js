import React from 'react';
import {Button, FlatList, Image, StyleSheet, Text, TouchableNativeFeedback, View, Alert} from "react-native";
import color from "../../color/color";
import * as action from "../../store/action";
import {useSelector,useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/headerButton";

function UserProducts(props) {
    const styles=StyleSheet.create({
        itemContainer:{
            height:300,
            margin:20,
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
            overflow: 'hidden'
        },
        imageContainer:{
            height:'60%',
            width:'100%',
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            overflow:'hidden'
        },
        image:{
            height:'100%',
            width:'100%'
        },
        buttonContainer:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            paddingHorizontal:20,
            marginTop:6
        }
    })

    const userProduct=useSelector((state)=>{
        return state.products.userProducts
    })

    const dispatch=useDispatch()

    const deleteHandler=(id)=>{
        Alert.alert('Are you sure?','Do you really want to delete this item?',[{
            text:'No',style:'default'
        },{
            text:'Yes',
            style:'destructive',
            onPress:()=>{
                dispatch(action.deleteProduct(id))
            }
        }])
    }

    return (
        <FlatList data={userProduct}
                  renderItem={(itemData)=>{
                      return <View style={{width:'100%',alignItems:'center',paddingHorizontal:20}}>
                          <TouchableNativeFeedback useForeground onPress={()=>{props.navigation.navigate('EditProduct',{productId:itemData.item.id})}}>
                              <View style={styles.itemContainer}>
                                  <View style={styles.imageContainer}>
                                      <Image source={{uri:itemData.item.imageUrl}} style={styles.image}/>
                                  </View>
                                  <View style={{alignItems:'center',marginTop:15}}>
                                      <Text style={{fontSize:18,fontFamily:'open-sans-bold'}}>
                                          {itemData.item.title}
                                      </Text>
                                  </View>
                                  <View style={{alignItems:'center'}}>
                                      <Text style={{fontSize:14,color:'#888',fontFamily:'open-sans'}}>
                                          ${itemData.item.price}
                                      </Text>
                                  </View>
                                  <View style={styles.buttonContainer}>
                                      <Button title={'Edit'}
                                              color={color.primary}
                                              onPress={()=>{props.navigation.navigate('EditProduct',{productId:itemData.item.id})}}
                                      />
                                      <Button title={'Delete'} color={color.primary} onPress={()=>deleteHandler(itemData.item.id)}/>
                                  </View>
                              </View>
                          </TouchableNativeFeedback>
                      </View>
                  }}
        />
    )
}

UserProducts.navigationOptions=(navigationData)=>{
    return{
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title={'Menu'} iconName={'md-menu'} onPress={()=>{
                navigationData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>,
        headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title={'Add'} iconName={'md-create'} onPress={()=>{
                navigationData.navigation.navigate('EditProduct')
            }}/>
        </HeaderButtons>
    }
}

export default UserProducts;