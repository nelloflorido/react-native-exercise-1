import React, {useEffect, useState}  from 'react'
import {Button, Text, View, StyleSheet, TextInput, ScrollView, Image, FlatList} from 'react-native'

type Product ={
    category:string;
    description:string;
    thumbnail:string;
}

export function ListaProdotti(){

    const [resultProduct, setResultProduct] = useState<any>([])
    const [text, onChangeText] = useState('')



    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                const result = await fetch(`https://dummyjson.com/products/search?q=${text}`);
                const jsonResult = await result.json();
                setResultProduct(jsonResult.products);

            }
            catch (e){
                console.error(e)
            }
            finally{
            };
           
        }
        fetchData();
    },[text])

    return (
        <View style={styles.container}>

            <View>
                <Text>Ricerca:</Text>
                <TextInput value={text} style={styles.input} onChangeText={onChangeText}/>
            </View>
            <FlatList 
                data={resultProduct}
                renderItem={(item:any)=>{
                      return(  
                        <View>
                            <Image style={{width:200, height:200}} source={{uri:item.thumbnail}} />
                            <Text>{item.category}</Text>
                            <Text >{item.description}</Text>
                        </View>
                      )
            }}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height:70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    size: {
        width: 66,
        height: 58,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
      },
})