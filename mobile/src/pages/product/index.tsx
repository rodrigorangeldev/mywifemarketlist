import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, SafeAreaView, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { Feather as Icon } from '@expo/vector-icons'

import { makeid } from '../../util'
import { retrieveData, storeData } from '../../repository'

import { IProduct } from '../../interfaces'

export default () => {

   const [description, setDescription] = useState('')
   const [model, setModel] = useState('')
   const [data, setData] = useState<IProduct[]>([] as IProduct[])

   function handleAdd(){
      const item = {
               id: makeid(4),
               title: description,
               model
            }        

      setData([item, ...data])

      retrieveData('listOfProducts')
         .then( list => {

            if(list){
               let listObj = JSON.parse(list)
               storeData(JSON.stringify([item, ...listObj]), 'listOfProducts')
            }else{
               storeData(JSON.stringify(data), 'listOfProducts')
            }

         })
         .catch(err => console.log(err))

   }

   const _renderItem = (item: IProduct) => (

      <View style={styles.containerItem}>
         <View style={styles.insideDetail}></View>
         <View style={[styles.item, styles.shadow]}>
            <Text style={styles.title}>{item.title}</Text>
            {/* <Text>Id: {item.id}</Text> */}
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

         <View style={styles.inputContainer} >
            <TextInput style={[styles.input, styles.shadow]} 
               placeholder="Informe uma descrição" 
               maxLength={25} 
               onChangeText={setDescription} 
            />
            <TextInput 
               style={[styles.input, styles.shadow]} 
               placeholder="Marca / Modelo" 
               maxLength={25} 
               onChangeText={setModel} 
            />
            <View style={styles.buttonContainer}>
               <RectButton style={[styles.button, styles.shadow]} onPress={handleAdd}>
                  <Text style={styles.buttonText}>ADICIONAR  <Icon name="arrow-down-circle" color="#FFF" size={20} /></Text>
               </RectButton>
            </View>
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
      justifyContent: 'center',
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
      fontSize: 20
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
    iconButton: {
       height: 20,
       width: 20
       
    }
})