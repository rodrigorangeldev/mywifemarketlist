import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Props } from '../../interfaces'

const Item : React.FC<Props> = ({id, description, qtd, lastPrice, title, model }) => (
  
    <View style={{ marginHorizontal: 30}}>
    <View style={styles.item}>
      <Text style={styles.title}>
        { title } - { model }
      </Text>
      <Text>
        Quantidade: {qtd} Ultimo preço: {lastPrice}
      </Text>
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
      marginVertical: 5,
      padding: 10,
      borderRadius: 10
    },
    title: {
      fontSize: 16,
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