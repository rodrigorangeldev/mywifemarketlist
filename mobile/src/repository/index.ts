import { AsyncStorage } from 'react-native'

const storeData = async (obj:string, value:string) => {
   try {
      await AsyncStorage.setItem(value, obj)
   } catch (error) {
      console.log(error)
   }
}

const retrieveData = async (value: string) => {
   try {
     const obj =  await AsyncStorage.getItem(value)
     return obj
   } catch (error) {
      console.log(error)
   }
}

export {
   storeData,
   retrieveData
}