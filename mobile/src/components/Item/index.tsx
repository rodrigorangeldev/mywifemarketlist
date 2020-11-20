import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { PropsItem } from '../../interfaces'

const Item: React.FC<PropsItem> = ({ id, description, qtd, lastPrice, title, model }) => (

  <View style={{ marginHorizontal: 30 }}>
    <View style={styles.item}>
      <Text style={styles.title}>
        {title} - {model}
      </Text>
      <Text>
        Quantidade: {qtd} Ultimo preço: {lastPrice}
      </Text>
    </View>
  </View>

);

 export default Item

 const styles = StyleSheet.create({
    item: {
      backgroundColor: '#CCC',
      marginVertical: 5,
      padding: 10,
      borderRadius: 10
    },
    title: {
      fontSize: 16,
    }
 })