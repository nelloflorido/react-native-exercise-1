import React, {useEffect, useState}  from 'react'
import {Button, Text, View, StyleSheet, TextInput, ScrollView, Image, FlatList} from 'react-native'

type Product ={
    item:{    
        category:string;
        description:string;
        thumbnail:string;
    }

}

export function ListaProdotti(){

    const [resultProduct, setResultProduct] = useState()
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

            <View style={
                {
                    marginTop:20
                }
            }>
                <Text>Ricerca:</Text>
                <TextInput value={text} style={styles.input} onChangeText={onChangeText}/>
                
            </View>


            <FlatList 
            style={{height:700}}
                data={resultProduct}
                renderItem={(item:any)=> 
                    {
                       
                      return(  
                        <View style={{marginTop:30, marginLeft:20}}>
                            <Image style={{width:200, height:200}} source={{uri:item.item.thumbnail}} />
                            <Text style={{marginTop:3}}>{item.item.category}</Text>
                            <Text >{item.item.description}</Text>
                        </View>
                      )
            }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 10       
        
    },
    size: {
        width: 66,
        height: 58,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginTop:20,
        width: 100
      },
      lista :{
          marginTop:10
      }
})