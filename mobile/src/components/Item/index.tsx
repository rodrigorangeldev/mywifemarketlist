import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Props } from '../../interfaces'

const Item : React.FC<Props> = ({id, description, qtd, lastPrice }) => (
  <View style={styles.container}>
      <View style={styles.insideDetail}></View>
   <View style={[styles.item, styles.shadow]}>
      <Text style={styles.title}>{description}</Text>
      <Text>Id: {id}</Text>
      <Text>Quantidade: {qtd} Último preço: {lastPrice}</Text>
   </View>
   </View>
 );

 export default Item

 const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10
   },
    item: {
      backgroundColor: '#CCC',
      padding: 20,
      width: 320,
      marginVertical: 8,
      marginHorizontal: 1,
      maxHeight: 106
    },
    title: {
      fontSize: 15,
    },
    insideDetail: {
      width: 10,
      height: 106,
      backgroundColor: '#f9c2ff'
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
 })