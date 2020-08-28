import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, SafeAreaView, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import RenderItem from '../../components/RenderItem'

import { makeid } from '../../util'

import { IProduct } from '../../interfaces'

export default () => {

   const [description, setDescription] = useState('')
   const [model, setModel] = useState('')
   const [data, setData] = useState<IProduct[]>([])

   function handleAdd(){
      const item = {
         id: makeid(4),
         title: description,
         model
      }

      setData([item, ...data])
   }

   return (
   <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1}}>
     <SafeAreaView style={styles.container}>
     
      <View style={styles.inner}>

         <View style={styles.listContainer}>
            
            <SafeAreaView>
               <FlatList 
                  data={ data }
                  renderItem={RenderItem}
                  keyExtractor={item => item.id}
               />
            </SafeAreaView>

         </View>

         <View style={styles.inputContainer} >
            <TextInput style={[styles.input, styles.shadow]} 
               placeholder="Descrição" 
               maxLength={50} 
               onChangeText={setDescription} 
            />
            <TextInput 
               style={[styles.input, styles.shadow]} 
               placeholder="Marca / Modelo" 
               maxLength={50} 
               onChangeText={setModel} 
            />
            <View style={styles.buttonContainer}>
               <RectButton style={[styles.button, styles.shadow]} onPress={handleAdd}>
                  <Text style={styles.buttonText}>ADICIONAR</Text>
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
      flex: 1
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
      height: 270
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
   }
})