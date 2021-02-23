import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers} from "redux";
import {Provider} from "react-redux";
import product from "./store/reducer/product";
import ProductNavigator from "./navigation/navigation";
import {AppLoading} from "expo";
import * as Font from 'expo-font'
import cart from "./store/reducer/cart";
import order from "./store/reducer/order";
import {applyMiddleware} from "redux";
import thunk from "redux-thunk";

const rootReducer=combineReducers({
  products:product,
  cart:cart,
  order:order
})

const store=createStore(rootReducer,applyMiddleware(thunk))

const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/font/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/font/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded,setFontLoaded]=useState(false)

  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts}
                       onFinish={()=>{
                         setFontLoaded(true)
                       }}

    />
  }

  return (
      <Provider store={store}>
        <ProductNavigator/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
