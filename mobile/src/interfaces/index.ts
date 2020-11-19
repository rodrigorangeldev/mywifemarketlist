interface Props{
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

interface IProduct {
   id: string,
   title: string,
   model: string
}


export {
   Props,
   ListRenderItem,
   IData,
   IProduct
}