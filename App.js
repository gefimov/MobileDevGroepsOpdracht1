import { StatusBar } from 'expo-status-bar';
import React , {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, ActivityIndicator, SectionList } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';
import { set } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {Permisions } from 'expo';

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

/*const loadAllMapData = async() => {
  let mapData = [];
  for(let i=11; i<=30; i++){
     let response = await fetch('https://opendata.arcgis.com/datasets/b760e319033841348469bacb34c5e259_644.geojson'+i);
     let json = await response.json();
     mapData.push({_id: json.id, name: json.naam, straat: json.straat, huisnummer: json.huisnummer});
  }
  return mapData;
}
useEffect(()=>{
  loadAllMapData();
},[])*/

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

  return(
<View>
    {features.map((feature)=>{
      return <Text key = {feature.properties.id}> {feature.properties.naam}, {feature.properties.straat} </Text>
    })}
    <Button title="Load list" onPress={loadList}/>
    </View>
  );

};

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

  /*const renderItem = ({item}) =>{
    return (

        <View style = {{backgroundColor: "grey", padding: 20, margin: 10}}>
        <Text>{item.properties.naam}</Text>
        <Button title="Details" onPress={() =>navigation.navigate('Details')}/>
      </View>);
      
    //<ListView name = {item.properties.naam}/>);
    
  }

  const keyExtractor = (item) => item.properties.id;

  useEffect(()=>{
    loadList();
  },[])

  return(
<View>
    {features.map((feature)=>{
      return <Text key = {feature.properties.id}> {feature.properties.naam} </Text>
    })}
    <Button title="Load list" onPress={loadList}/>
    </View>
   /* <View style={styles.container}>

    <FlatList
    data = {mapList}
    renderItem = {renderItem}
    keyExtractor = {keyExtractor}/>
    
    </View>
  );

};*/

export const MapDetailsScreen = () =>{
  //const {item} = route.params;
  /*useEffect(()=>{
    navigation.navigate(onPress = { 'Details',
      itemId : item.properties.id,
      itemnaam : item.properties.naam
    })
  }, []);*/
  return(
    
      <Text>Blabla</Text>
    

  );
}


//<Stack.Screen name="Listscreen" component={ListScreen} options={{title:"Zwembaden lijst"}}/>

const Tab = createBottomTabNavigator();

export default class App extends React.Component () {

  state = {latitude:null,
    longitude:null
    }
      
    async componentDidUpdate(){
      const {status} = await Permissions.getAsync(Permissions.LOCATION)
    
      if (status != 'granted'){
    const response = await Permissions.askAsync(Permissions.LOCATION)
      }
    
      navigator.geolocation.getCurrentPosition(({ coords:{latitude,longitude} }) => this.setState({latitude, longitude}, () =>console.log('State:',this.state)),
        (error) => console.log('Error:',error ))
    }
      rennder(){
      return(
        <MapView style={{flex:1}}/>
      );
    }
    rennder(){
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MapScreenStack}/>
      <Stack.Screen name="Details" component={MapDetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    );
    }


  
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



export const MapScreen = () =>{
  return(
    <MapView style={{flex:1}}/>
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
