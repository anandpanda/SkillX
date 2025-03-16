import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key,value)=>{
    try {
        console.log("Inside set ",key,value);
        await AsyncStorage.setItem(key,value);
    } catch (error) {
        console.log('Error storing value:',error);
    }
}
export const getItem = async (key)=>{
    try {
        const value = await AsyncStorage.getItem(key);
        return(value);
    } catch (error) {
        console.log('Error retrieving value:',error);
    }
}
export const removeItem = async (key)=>{
    try {
        console.log("Inside Remove:",key);
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('Error deleting item:',error);
    }
}