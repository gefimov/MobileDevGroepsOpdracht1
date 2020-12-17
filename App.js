import { StatusBar } from 'expo-status-bar';
import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, ActivityIndicator, SectionList } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer, useFocusEffect} from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker,Callout} from 'react-native-maps';
import { set } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

/*const getZwembadenFromApiAsync = async () => {
  try {
    let response = await fetch(
      'https://opendata.arcgis.com/datasets/b760e319033841348469bacb34c5e259_644.geojson'
    );
    let json = await response.json();
    return json.features;
  } catch (error) {
    console.error(error);
  }
};*/

/*const ListView = (props,{navigation}) =>{

  //let navigation = props.navigation;

  return(
    <View style = {{backgroundColor: "grey", padding: 20, margin: 10}}>
      <Text>{props.name}</Text>
      <Button title="Details" onPress={() =>navigation.navigate("MapDetails")}/>
    </View>
  );
}*/



/*export const ListScreen = ({navigation}) => {
  const [features, setList] = useState([]);

  const loadList = async () =>{
    try{
      let response = await fetch('https://opendata.arcgis.com/datasets/b760e319033841348469bacb34c5e259_644.geojson');

      let json = await response.json();


      setList(json.features);
    }catch(error){

    }
  }

  return(
<View>
    {features.map((feature)=>{
      return <Text key = {feature.properties.id}> {feature.properties.naam}, {feature.properties.straat} </Text>
    })}
    <Button title="Load list" onPress={loadList}/>
    </View>
  );

};*/




export const ListScreen = ({navigation}) => {
  const [features, setList] = useState([]);

  const loadList = async () =>{
    try{
      let response = await fetch('https://opendata.arcgis.com/datasets/b760e319033841348469bacb34c5e259_644.geojson');

      let json = await response.json();


      setList(json.features);
    }catch(error){

    }
  }

  const renderItem = ({item}) =>{

    return (

        <View style = {{backgroundColor: "white", padding: 20, margin: 10}}>
          
        <Text title="Details" onPress={() =>navigation.navigate('Details',
         {zwembad:item.properties})}>
          {item.properties.naam}
         
        </Text>

        
      </View>);
      
    //<ListView name = {item.properties.naam}/>);
    
  }

  const keyExtractor = (item) => item.properties.id;

  useEffect(()=>{
    loadList();
  },[])

  return(

    <View style={styles.container}>

    <FlatList
    data = {features}
    renderItem = {renderItem}
    keyExtractor = {keyExtractor}/>
    
    </View>
  );

};

export const MapDetailsScreen = ({navigation, route}) =>{
  
  return(
    <View>
      <Text>Naam</Text>
      <Text>Naam:</Text>
      <Text>{route.params.zwembad.naam}</Text>
      <Text>Informatieveld 1:</Text>
      <Text>{route.params.zwembad.straat} {route.params.zwembad.huisnummer} </Text>
      <Text>Informatieveld 2:</Text>
      <Text>{route.params.zwembad.district} {route.params.zwembad.postalcode}</Text>
    </View>

  );
}


//<Stack.Screen name="Listscreen" component={ListScreen} options={{title:"Zwembaden lijst"}}/>

const Tab = createBottomTabNavigator();

export default () => {
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MapScreenStack}/>
      <Stack.Screen name="Details" component={MapDetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
   

  );
}

const Stack = createStackNavigator();
export const MapScreenStack = () =>{
  return(
    
      <Tab.Navigator>
        
        <Tab.Screen name="Map" component={MapScreen}/>
        <Tab.Screen name="List" component={ListScreen}/>
      </Tab.Navigator>
    
    
  );
}



export const MapScreen = ({navigation}) =>{

  const [features, setList] = useState([]);

  const loadList = async () =>{
    try{
      let response = await fetch('https://opendata.arcgis.com/datasets/b760e319033841348469bacb34c5e259_644.geojson');

      let json = await response.json();


      setList(json.features);
    }catch(error){

    }
  }

  useEffect(()=> {
    loadList();
  },[])
  return(
    
    <MapView initialRegion={{latitude: 51.229829,
      longitude: 4.415918,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,}} style={{flex:1}} >
      
{ features !=null && features.map((zwembad,i) =>

 <Marker  key = {i} coordinate = {{latitude:zwembad.geometry.coordinates[1],longitude:zwembad.geometry.coordinates[0]}} >
    <Callout onPress={() => {navigation.navigate('Details',{zwembad:zwembad.properties})}}  >
      <Text >{zwembad.properties.naam}{'\n'}{zwembad.properties.straat} {zwembad.properties.huisnummer}
    </Text>
    <Text style ={{flex:1,flexDirection:'row',backgroundColor:'lightblue',color:'white',padding:10, textAlign:'center',marginTop:5,marginBottom:5}}>Details</Text>
    </Callout>
    </Marker>)}
     
     
     
    </MapView>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
