import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native'
import RenderItem from '../../components/RenderItem'
import  DropDownPicker  from 'react-native-dropdown-picker'
import { Feather as Icon } from '@expo/vector-icons'


import { makeid } from '../../util'
import { IData } from '../../interfaces'
import { retrieveData, storeData } from '../../repository'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default () => {

   const [data, setData] = useState<IData[]>([])
   const [selectedProducts, setSelectedProducts] = useState<IData[]>([])

   const productControl = (item : any) => {
       
       const product = data.find(product => product.id == String(item.value) )

         if(product && selectedProducts.filter(product => product.id == item.value ).length <= 0){
            
            setSelectedProducts([product as IData, ...selectedProducts])
            
            storeData(JSON.stringify(selectedProducts), 'listInUse')

            console.log(product)

          }else{
            Alert.alert('Oops', 'Este item já foi incluído.')
          }
       
   } 

   useEffect(() => {
      
      retrieveData('listOfProducts')
         .then(list => {
            if (list) {
               setData(JSON.parse(list))
            }
         })
         .catch(err => console.log('Erro ao obter a lista de produtos', err))

      retrieveData('listInUse')
         .then(list => {
            if (list) {
               setSelectedProducts(JSON.parse(list))
            }
         })
         .catch(err => console.log('Erro ao obter a lista em uso', err))

   }, [])


   return (

      <View style={styles.container}>

         <View style={styles.selectContainer}>
            <DropDownPicker
               placeholder="Selecione um produto..."
               items={ data.map(product => { return { 
                     label: `${product.title} - ${product.model}`, 
                     value: product.id,
                     icon: () => <Icon name="shopping-bag" size={24}  /> 
                  }  
               } )
                  // [
                  //    { label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" /> },
                  //    { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
                  //    { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
                  //    { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
                  //    { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
                  //    { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
                  //    { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> }
                  // ]
                }
               defaultValue={''}
               containerStyle={{ height: 100 }}
               style={{ backgroundColor: '#fafafa'}}
               labelStyle={{fontSize: 20}}
               itemStyle={{
                  justifyContent: 'flex-start',
                  height: 60
               }}
               dropDownStyle={{ backgroundColor: '#fafafa' }}
               onChangeItem={productControl}
               dropDownMaxHeight={300}
            />
         </View>

         <View style={styles.listContainer}>
            <SafeAreaView>
               <FlatList 
                  data={ selectedProducts || [] }
                  renderItem={RenderItem}
                  keyExtractor={item => item.id}
               />
            </SafeAreaView>
         </View>

         <View style={{marginHorizontal: 15}}>
               <TouchableOpacity style={styles.button}>
                  <View style={styles.insideButtonContainer}>
                     <Text style={styles.titleButton}> Salvar esta lista </Text>
                  </View>
               </TouchableOpacity>
         </View>

      </View>
     
         
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   listContainer: {
      marginTop: 20,
      maxHeight: '65%'
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
   button: {
      height: 80,
      borderRadius: 10,
      backgroundColor: '#81c784',
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8
   },
   insideButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center"
   },
   titleButton: {
      fontSize: 20,
      color: '#FFF',
      fontWeight: 'bold'
   },
   picker: {
      height: 80,
      backgroundColor: '#81c784',
      color: '#FFF'
   },
   itemStyle: {
      color: '#81c784'
   },
   selectContainer: {

   }
})