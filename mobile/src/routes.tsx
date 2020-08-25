import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import home from './pages/home'
import create from './pages/create'

const appStack = createStackNavigator()

export default () => {
   return(
      <NavigationContainer>
         <appStack.Navigator>
            <appStack.Screen name="Home" component={home} />
            <appStack.Screen name="Create" component={create} />
         </appStack.Navigator>
      </NavigationContainer>
   )
}