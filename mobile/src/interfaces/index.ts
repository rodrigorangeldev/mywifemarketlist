interface PropsItem{
   id: string
   title: string,
   qtd: number,
   description: string,
   lastPrice: number,
   model: string
}

interface ListRenderItem {
   item: {
      id: string,
      title: string,
      description: string,
      model: string,
      qtd: number,
      lastPrice: number
   },
   removeFromList: (id: string) => {}
}

interface IData {
   id: string,
   title: string,
   description: string,
   model: string,
   qtd: number,
   lastPrice: number
}

interface IProduct {
   id: string,
   title: string,
   model: string
}


export {
   PropsItem,
   ListRenderItem,
   IData,
   IProduct
}