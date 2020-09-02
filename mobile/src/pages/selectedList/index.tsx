import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { Picker } from '@react-native-community/picker'
import RenderItem from '../../components/RenderItem'

import { makeid } from '../../util'
import { IData } from '../../interfaces'
import { retrieveData } from '../../repository'

export default () => {

   const [data, setData] = useState<IData[]>([])
   const [selectedValue, setSelectedValue] = useState('Pressione aqui para selecionar...')
   const [selectedProducts, setSelectedProducts] = useState<IData[]>([])

   const productControl = (id: string) => {
      const product = data.find(product => product.id = id)

      console.log(product)

      setSelectedValue(String(product?.description))
      setSelectedProducts([product as IData, ...selectedProducts])
   } 
   

   useEffect(() => {

      retrieveData('listOfProducts')
         .then(list => {

            if (list) {
               let listObj = JSON.parse(list)
               setData(listObj)
            }

         })
         .catch(err => console.log(err))
   }, [])

   return (

      <View style={styles.container}>

         <View style={styles.selectContainer}>
         <Picker
            mode="dialog"
            selectedValue={'Selecione um produto...'}
            style={[styles.picker, styles.shadow]}
            onValueChange={(itemValue, itemIndex) => productControl(String(itemValue)) }
            >

            {
               data.map(product => <Picker.Item 
                                       key={product.id} 
                                       label={product.title} 
                                       value={product.id} 
                                    /> )
            }

            </Picker>
         </View>

         <View style={styles.listContainer}>
            <SafeAreaView>
               <FlatList 
                  data={ selectedProducts }
                  renderItem={RenderItem}
                  keyExtractor={item => item.id}
               />
            </SafeAreaView>
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