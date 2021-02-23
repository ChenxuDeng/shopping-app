import React,{useEffect} from 'react';
import {Button, FlatList, Image, Text, View ,StyleSheet,TouchableNativeFeedback,ActivityIndicator} from "react-native";
import {useSelector,useDispatch} from "react-redux";
import color from "../../color/color";
import * as action from '../../store/action/index'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/ui/headerButton";
import {fetchProduct} from "../../store/action/index";

function ProductOverview(props) {
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

    const products=useSelector((state)=>{
        return state.products.availableProducts
    })

    const loading=useSelector((state)=>{
        return state.products.loading
    })

    const dispatch=useDispatch()

    useEffect(()=>{
        const listener = props.navigation.addListener('willFocus',()=>{action.fetchProduct()})
        return ()=>{
            listener.remove()
        }
    },[action.fetchProduct])

    useEffect(()=>{
        dispatch(action.fetchProduct())
    },[dispatch,action.fetchProduct])

    if(loading){
        return <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <ActivityIndicator size={'large'} color={color.primary}/>
        </View>
    }

    if(!loading && products.length===0){
        return <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Text>
                Please try again
            </Text>
        </View>
    }

    return (
        <FlatList data={products}
                  renderItem={(itemData)=>{
                      return <View style={{width:'100%',alignItems:'center',paddingHorizontal:20}}>
                                    <TouchableNativeFeedback onPress={()=>{props.navigation.navigate('ProductDetail',{productId:itemData.item.id,productTitle:itemData.item.title})}} useForeground>
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
                                                <Button title={'view details'}
                                                        color={color.primary}
                                                        onPress={()=>{props.navigation.navigate('ProductDetail',{productId:itemData.item.id,productTitle:itemData.item.title})}}
                                                />
                                                <Button title={'to cart'} color={color.primary} onPress={()=>{
                                                    dispatch(action.addToCart(itemData.item))
                                                }}/>
                                            </View>
                                        </View>
                                    </TouchableNativeFeedback>
                          </View>
                  }}
        />
    );
}

ProductOverview.navigationOptions=(navigationData)=>{
    return{
        headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title={'Cart'} iconName={'md-cart'} onPress={()=>{
                navigationData.navigation.navigate('Cart')
            }}/>
        </HeaderButtons>,
        headerLeft:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title={'Menu'} iconName={'md-menu'} onPress={()=>{
                navigationData.navigation.toggleDrawer()
            }}/>
        </HeaderButtons>
    }
}

export default ProductOverview;