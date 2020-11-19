
import React from 'react'

import Item from '../Item'

import { ListRenderItem } from '../../interfaces'

 const renderItem: React.FC<ListRenderItem> = ({ item }) => (
   <Item 
      id={item.id} 
      title={item.title} 
      qtd={item.qtd} 
      description={item.description} 
      lastPrice={item.lastPrice} 
      model={item.model}
    />
 );

 export default renderItem
