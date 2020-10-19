
import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'

import { retrieveData } from '../../repository'

export default () => {

   const [lists, setLists] = useState<any>([])

   useEffect(() => {
      retrieveData('allOfLists')
         .then((list: any) => {
            setLists(JSON.parse(list))
         })
         .catch(err => Alert.alert('Erro', 'Houve um erro ao tentar obter as listas!'))

   }, [])

   return(
      <View>
         <Text>Minhas listas</Text>

         <View>
            {
               lists.map((item: any) => (
                  <RectButton>
                     <View>
                        <Text><Icon name="shopping-cart" size={20} color="#FFF" />{item.nameOfList}</Text>
                     </View>
                  </RectButton>
               ))
            }
         </View>

      </View>
   
   )

}