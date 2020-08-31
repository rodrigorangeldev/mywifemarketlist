import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, SafeAreaView, FlatList } from 'react-native'

import { IProduct } from '../../interfaces'

export default () => {

   const [data, setData] = useState<IProduct[]>([])

   useEffect(() => {

      const list = localStorage.getItem('listOfProducts')

      if(list){
         let listObj = JSON.parse(list)
         setData(listObj)
      }

   }, [])

   const _renderItem = (item: IProduct) => (

      <View style={styles.containerItem}>
         <View style={styles.insideDetail}></View>
         <View style={[styles.item, styles.shadow]}>
            <Text style={styles.title}>{item}</Text>
            <Text>Id: {item.id}</Text>
            <Text>{item.model}</Text>
         </View>
      </View>
   );


   return (
   <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1}}>
     <SafeAreaView style={styles.container}>
     
      <View style={styles.inner}>

         <View style={styles.listContainer}>
            
            <SafeAreaView>
               <FlatList 
                  data={ data }
                  renderItem={({item}) => _renderItem(item)}
                  keyExtractor={item => item.id}
               />
            </SafeAreaView>

         </View>

      </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   inner: {
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: 20
  },
   input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16
   },
   inputContainer: {
      marginTop: 20,
      paddingHorizontal: 20
   },
   inputGroup: {
      flexDirection: 'row'
   },
   buttonContainer: {
      //height: 30
      //paddingHorizontal: 20
   },
   button: {
      height: 60,
      backgroundColor: '#81c784',
      flexDirection: 'row',
      borderRadius: 5,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
   },
   listContainer: {
      marginTop: 20,
      maxHeight: 350,
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
   buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontSize: 18
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
      maxHeight: 106
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
})