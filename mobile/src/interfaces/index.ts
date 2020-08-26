interface Props{
   id: string
   title: string,
   qtd: number,
   description: string,
   lastPrice: number
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

export {
   Props,
   ListRenderItem,
   IData
}