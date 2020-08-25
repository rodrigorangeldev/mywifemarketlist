import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, SafeAreaView, FlatList } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

interface Props{
   id: string
   title: string,
   qtd: number,
   description: string
}

interface ListRenderItem {
   item: {
      id: string,
      title: string,
      description: string,
      model: string,
      qtd: number,
      lastPrice: number
   }
}

interface IData {
   id: string,
   title: string,
   description: string,
   model: string,
   qtd: number,
   lastPrice: number
}

const Item : React.FC<Props> = ({ title, description, qtd }) => (
   <View style={styles.item}>
     <Text style={styles.title}>{title}</Text>
     <Text>{description}</Text>
     <Text>{qtd}</Text>
   </View>
 );

 const renderItem: React.FC<ListRenderItem> = ({ item }) => (
   <Item id={item.id} title={item.title} qtd={item.qtd} description={item.description} />
 );

 


export default () => {

   const [description, setDescription] = useState('')
   const [model, setModel] = useState('')
   const [qtd, setQtd] = useState(0)
   const [lastPrice, setLastPrice] = useState(0)
   const [data, setData] = useState<IData[]>([])

   function makeid(length:number) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
   }

   function handleAdd(){
      const item = {
         id: makeid(4),
         title: description,
         description,
         model,
         qtd,
         lastPrice
      }

      setData([item, ...data])
   }

   return (
   <View style={styles.container}>

      <View style={styles.listContainer}>
         
         <SafeAreaView>
            <FlatList 
               data={ data }
               renderItem={renderItem}
               keyExtractor={item => item.id}
             />
         </SafeAreaView>

      </View>

      <View style={styles.inputContainer} >
         <TextInput style={styles.input} placeholder="Descrição" onChangeText={setDescription} />
         <TextInput style={styles.input} placeholder="Marca / Modelo" onChangeText={setModel} />
         <View style={styles.inputGroup}>
            <TextInput 
               style={styles.input} 
               placeholder="Quantidade" 
               onChangeText={e => setQtd(Number(e))} />

            <TextInput 
               style={[styles.input, {marginLeft: 10}]} 
               placeholder="Preço anterior" 
               onChangeText={(e) => setLastPrice(Number(e))} />
         </View>
         <View style={styles.buttonContainer}>
            <RectButton style={styles.button} onPress={handleAdd}>
               <Text>Adicionar</Text>
            </RectButton>
         </View>
      </View>

   </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1
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
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8
   },
   listContainer: {
      marginTop: 20,
      height: 270
   },
   item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
})