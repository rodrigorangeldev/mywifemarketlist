import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { Feather as Icon } from '@expo/vector-icons'

export default () => {

   const navigation = useNavigation()

   function handleNavigate(to:string){
      navigation.navigate(to)
   }

   return (
   <View style={styles.container}>
      
      <RectButton style={[styles.button, styles.shadow]} onPress={() => handleNavigate('SelectedList')}>
         <View style={styles.insideButtonContainer}>
            <Text style={styles.titleButton}><Icon name="list" size={20} color="#FFF" /> Nova lista</Text>
            {/* <Text style={{color: '#FFF'}}>com base em produtos cadastrados</Text> */}
         </View>
      </RectButton>

      <RectButton style={[styles.button, styles.shadow]} onPress={() => handleNavigate('MyLists')}>
         <View style={styles.insideButtonContainer}>
            <Text style={styles.titleButton}><Icon name="shopping-cart" size={20} color="#FFF" /> Minhas listas</Text>
            {/* <Text style={{color: '#FFF'}}>com base em produtos cadastrados</Text> */}
         </View>
      </RectButton>

      {/* <RectButton style={[styles.button, styles.shadow]} onPress={() => handleNavigate('Create')}>
        <View style={styles.insideButtonContainer}>
         <Text style={styles.titleButton} ><Icon name="list" size={20} color="#FFF" /> Criar lista avulsa</Text>
        </View>
      </RectButton> */}

      <RectButton style={[styles.button, styles.shadow]} onPress={() => handleNavigate('Product')}>
        <View style={styles.insideButtonContainer}>
          <Text style={styles.titleButton}><Icon name="download" size={20} color="#FFF" /> Cadastrar produto</Text>
         </View>
      </RectButton>

      <RectButton style={[styles.button, styles.shadow]} onPress={() => handleNavigate('ProductList')}>
         <View style={styles.insideButtonContainer}>
            <Text style={styles.titleButton} ><Icon name="archive" size={20} color="#FFF" /> Meus produtos</Text>
         </View>
      </RectButton>

   </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex:1,
      marginHorizontal: 20,
      marginTop: 20,
      maxHeight: 20
   },
   button: {
      height: 80,
      borderRadius: 10,
      backgroundColor: '#81c784',
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8
   },
   shadow: {
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
   },
   titleButton: {
      fontSize: 20,
      color: '#FFF',
      fontWeight: 'bold'
   },
   insideButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'flex-start',
      marginLeft: 50
   }
})