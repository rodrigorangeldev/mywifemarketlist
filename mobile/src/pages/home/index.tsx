import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default () => {

   const navigation = useNavigation()

   function handleToCreateList(){
      navigation.navigate('Create')
   }

   return (
   <View style={styles.container}>
      <Text>Home</Text>

      <RectButton style={styles.button} onPress={handleToCreateList}>
         <Text>Criar nova lista</Text>
      </RectButton>

   </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex:1
   },
   button: {
      height: 60,
      backgroundColor: '#81c784',
      flexDirection: 'row',
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8
   }
})