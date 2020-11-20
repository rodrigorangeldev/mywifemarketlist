
import React, { useEffect, useState } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'

import { retrieveData } from '../../repository'
import { dateToText } from '../../util'

export default () => {

   const [lists, setLists] = useState<any>([])

   useEffect(() => {
      retrieveData('allOfLists')
         .then((list: any) => {
            setLists(JSON.parse(list))
         })
         .catch(err => Alert.alert('Erro', 'Houve um erro ao tentar obter as listas!'))

   }, [])

   return(
      <View>
         
         <View style={styles.listsContainer}>
            {
               lists.map((item: any) => (
                  <RectButton style={[styles.button, styles.shadow]} key={item.nameOfList}>
                     <View style={styles.insideButtonContainer}>
                        <Text><Icon name="shopping-cart" size={20} color="#FFF" /></Text>
                        <Text style={{color: '#FFF', marginTop: 10}}>{item.nameOfList}</Text>
                        <Text style={{color: '#FFF', fontSize: 10}}>{dateToText(item.date)}</Text>
                     </View>
                  </RectButton>
               ))
            }
         </View>

      </View>
   
   )

}

const styles = StyleSheet.create({

   button: {
      height: 80,
      width: '40%',
      borderRadius: 10,
      backgroundColor: '#81c784',
      overflow: 'hidden',
      alignItems: 'center',
      marginHorizontal: 10,
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
   listsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 10
   },
   insideButtonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   }

})

