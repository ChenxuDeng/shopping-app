import React,{useState,useCallback,useEffect} from 'react';
import {Text, TextInput, View,StyleSheet,Alert} from "react-native";
import CustomHeaderButton from "../../components/ui/headerButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector,useDispatch} from "react-redux";
import * as action from '../../store/action/index'

function EditProduct(props) {
    const styles=StyleSheet.create({
        container:{
            margin:20
        },
        input:{
            borderBottomWidth:1,
            borderBottomColor:'#ccc'
        },
        marginTop:{
            marginTop:10
        },
        text:{
            fontFamily:'open-sans-bold',
            fontSize:14
        }
    })

    const productId=props.navigation.getParam('productId')
    const editedProduct=useSelector((state)=>{
        return state.products.userProducts.find((product)=>{
            return product.id===productId
        })
    })

    const dispatch=useDispatch()

    const [title, setTitle] = useState(editedProduct?editedProduct.title:'')
    const [imageUrl, setImageUrl] = useState(editedProduct?editedProduct.imageUrl:'')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct?editedProduct.description:'')
    const [validation,setValidation]=useState(false)

    const submitHandler=useCallback(()=>{
        if(!validation){
            Alert.alert('Wrong input','Please check the error in the form.',[{text:'Ok'}])
            return
        }
        if(editedProduct){
            dispatch(action.updateProduct(productId,title,description,imageUrl))
        }else {
            dispatch(action.createProduct(title,description,imageUrl,+price))
        }
    },[dispatch,productId,title,description,imageUrl,price,validation])

    useEffect(()=>{
        props.navigation.setParams({submit:submitHandler})
    },[submitHandler])

    const textChangeHandler=(text)=>{
        if(text.trim().length===0){
            setValidation(false)
        }else {
            setValidation(true)
        }
        setTitle(text)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>
                    Title
                </Text>
                <TextInput style={styles.input}
                           value={title}
                           keyboardType={'default'}
                           autoCapitalize={'sentences'}
                           autoCorrect
                           returnKeyType={'next'}
                           onEndEditing={()=>{return console.log('onEndEditing')}}
                           onSubmitEditing={()=>{return console.log('onSubmitEditing')}}
                           onChangeText={textChangeHandler}
                />
            </View>
            {!validation && <Text>Please enter a valid title!</Text>}
            <View style={styles.marginTop}>
                <Text style={styles.text}>
                    Image URL
                </Text>
                <TextInput style={styles.input} value={imageUrl} onChangeText={(text)=>{
                    return setImageUrl(text)
                }}/>
            </View>
            {editedProduct?null:<View style={styles.marginTop}>
                <Text style={styles.text}>
                    Price
                </Text>
                <TextInput style={styles.input}
                           value={price}
                           keyboardType={'decimal-pad'}
                           onChangeText={(text)=>{
                    return setPrice(text)
                }}/>
            </View>}
            <View style={styles.marginTop}>
                <Text style={styles.text}>
                    Description
                </Text>
                <TextInput style={styles.input} value={description} onChangeText={(text)=>{
                    return setDescription(text)
                }}/>
            </View>
        </View>
    );
}

EditProduct.navigationOptions=(navigationData)=>{
    const submitFn=navigationData.navigation.getParam('submit')
    return{
        headerRight:()=>{
            return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title={'Add'} iconName={'md-checkmark'} onPress={submitFn}/>
            </HeaderButtons>
        },
        headerTitle:navigationData.navigation.getParam('productId')?'Edit Product':'Add Product'
    }
}

export default EditProduct;