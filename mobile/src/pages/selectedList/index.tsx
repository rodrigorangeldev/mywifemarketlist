import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native'
import RenderItem from '../../components/RenderItem'
import  DropDownPicker  from 'react-native-dropdown-picker'
import { Feather as Icon } from '@expo/vector-icons'

import { IData } from '../../interfaces'
import { retrieveData, storeData, removeItem } from '../../repository'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'


export default () => {

   const nav = useNavigation()

   const [data, setData] = useState<IData[]>([])
   const [selectedProducts, setSelectedProducts] = useState<IData[]>([])
   const [nameOfList, setNameOfList] = useState<string>('')
   const [lastPrice, setLastPrice] = useState<string>('0')
   const [qtd, setQtd] = useState<string>('1')
   const [includeProductList, setIncludeProductList] = useState<IData[]>([])

   const productControl = (item : any) => {
       
       const product = data.find(product => product.id == String(item.value) )

         if(product && selectedProducts.filter(product => product.id == item.value ).length <= 0){
            
            product.lastPrice = Number(lastPrice)
            product.qtd = Number(qtd)

            setSelectedProducts([product as IData, ...selectedProducts])
            
          }else{
            Alert.alert('Oops', 'Este item já foi incluído.')
          }
       
   }
   
   const includeInList = () => {

      setIncludeProductList(selectedProducts)
      storeData(JSON.stringify(selectedProducts), 'listInUse')
      
   }

   const handleSaveList = () => {
     
      //   retrieveData('allOfLists')
      //      .then(list => console.log(list))

      //removeItem('allOfLists')

      if(!nameOfList){
         Alert.alert('Nome da lista', 'Dê um nome para sua lista antes de salvar!')
      }
      else{

         const myList = {
            nameOfList,
            date: new Date(),
            selectedProducts 
         }

         retrieveData('allOfLists')
         .then(list => {
            if (list) {
                  let listParsed = JSON.parse(list)

                     let isExists = false
                  
                     listParsed.map((item:any) => {
                        if(item.nameOfList.trim().toLowerCase() == nameOfList.trim().toLowerCase())
                           isExists = true
                     })

                     if(isExists){
                        Alert.alert('Item existente', 'Já existe uma lista cadastrada com esse nome!')
                        return false;
                     }else{
                        listParsed.push(myList)
                        storeData(JSON.stringify(listParsed), 'allOfLists')
                     }

            }else{
               storeData(JSON.stringify([myList]), 'allOfLists')
            }

            
            Alert.alert('Sucesso', 'Lista salva com sucesso!')

            removeItem('listInUse')

            nav.navigate('Home')

         })
         .catch(err => console.log('Erro ao obter a lista de produtos', err))

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
               setIncludeProductList(JSON.parse(list))
            }
         })
         .catch(err => console.log('Erro ao obter a lista em uso', err))

   }, [])


   return (

      <View style={styles.container}>

         <View>
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
               containerStyle={{ height: 70 }}
               style={{ backgroundColor: '#fafafa'}}
               labelStyle={{fontSize: 20}}
               itemStyle={{
                  justifyContent: 'flex-start',
                  height: 60
               }}
               dropDownStyle={{ backgroundColor: '#fafafa' }}
               onChangeItem={productControl}
               dropDownMaxHeight={300}
               zIndex={999}
            />

         </View>

         <View>
            <View  style={{marginTop: 5, marginHorizontal: 30}}>
               <Text>Quantidade</Text>
               <TextInput 
                  placeholder="Quantidade" 
                  style={[styles.input]} 
                  onChangeText={setQtd}
                  value={qtd}
               />
               <Text>Preço anterior</Text>
               <TextInput 
                  placeholder="Preço anterior" 
                  style={[styles.input]} 
                  onChangeText={setLastPrice}
                  value={lastPrice}
               />
            </View>
            <View style={{ marginHorizontal: 30}}>
               <TouchableOpacity style={styles.button} onPress={() => includeInList()}>
                  <View style={styles.insideButtonContainer}>
                     <Text style={styles.titleButton}> Incluir </Text>
                  </View>
               </TouchableOpacity>
            </View>
         </View>

         <View style={styles.listContainer}>
            <SafeAreaView>
               <FlatList 
                  data={ includeProductList || [] }
                  renderItem={RenderItem}
                  keyExtractor={item => item.id}
               />
            </SafeAreaView>
         </View>

         {   
            includeProductList.length > 0 ?      
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : undefined} style={{ flex: 1}}>
               <SafeAreaView style={styles.container}>
                  <View style={styles.inputContainer}>
                        <TextInput 
                           placeholder="Dê um nome a sua lista..." 
                           style={[styles.input, styles.shadow]} 
                           onChangeText={setNameOfList}
                           />
                        <TouchableOpacity style={styles.button}
                           onPress={handleSaveList}
                        >
                           <View style={styles.insideButtonContainer}>
                              <Text style={styles.titleButton}> Salvar esta lista </Text>
                           </View>
                        </TouchableOpacity>
                  </View>
               </SafeAreaView>
            </KeyboardAvoidingView>
            : <></>
         }

      </View>
     
         
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   listContainer: {
      marginVertical: 15,
      maxHeight: '40%'
   },
   input: {
      height: 40,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16
   },
   inputContainer: {
      paddingHorizontal: 20
   },
   inputContainer2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around'
      
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
      height: 50,
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
      height: 50,
      backgroundColor: '#81c784',
      color: '#FFF'
   },
   itemStyle: {
      color: '#81c784'
   },
   selectContainer: {

   }
})