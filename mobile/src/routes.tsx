import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import home from './pages/home'
import create from './pages/create'
import product from './pages/product'
import productLit from './pages/productList'
import selectedList from './pages/selectedList'

const appStack = createStackNavigator()

export default () => {
   return(
      <NavigationContainer>
         <appStack.Navigator>
            <appStack.Screen name="Home" component={home} />
            <appStack.Screen name="Create" component={create} />
            <appStack.Screen name="Product" component={product} />
            <appStack.Screen name="ProductList" component={productLit} />
            <appStack.Screen name="SelectedList" component={selectedList} />
         </appStack.Navigator>
      </NavigationContainer>
   )
}