import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native'

import { IProduct } from '../../interfaces'
import { retrieveData, storeData } from '../../repository'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Feather as Icon } from '@expo/vector-icons'

export default () => {

   const [data, setData] = useState<IProduct[]>([])

   const _renderItem = (item: IProduct) => (

      <View style={styles.containerItem}>
         <View style={styles.insideDetail}></View>
         <View style={[styles.item, styles.shadow]}>
            
            <View style={{maxWidth: 230}}>
               <Text style={styles.title}>{item.title}</Text>
               {/* <Text>Id: {item.id}</Text> */}
               <Text>{item.model}</Text>
            </View>

            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
               <TouchableOpacity onPress={() => removeFromList(item.id)}>
                  <Icon name="trash-2" color="#FFF" size={30} />
               </TouchableOpacity>
            </View>
         </View>

      </View>
   );

   const removeFromList = (id: string) => {
      const list = data.filter(product => product.id != id)

      setData(list)
      storeData(JSON.stringify(list), 'listOfProducts')
   }

   useEffect(() => {

      retrieveData('listOfProducts')
         .then(list => {

            if (list) {
               setData(JSON.parse(list))
            }

         })
         .catch(err => console.log(err))
   }, [])

   return (

      <View style={styles.container}>
         <View style={styles.listContainer}>
            <SafeAreaView>
               <FlatList
                  data={data}
                  renderItem={({ item }) => _renderItem(item)}
                  keyExtractor={item => item.id}
               />
            </SafeAreaView>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   listContainer: {
      marginTop: 20,
      backgroundColor: '#FFC'
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
   insideDetail: {
      width: 10,
      height: 106,
      backgroundColor: '#f9c2ff'
   },
   item: {
      backgroundColor: '#CCC',
      padding: 20,
      width: 320,
      marginVertical: 8,
      marginHorizontal: 1,
      maxHeight: 106,
      flexDirection: 'row'
   },
   containerItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10
   },
   title: {
      fontSize: 20,
   },
   buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
      
   }
})