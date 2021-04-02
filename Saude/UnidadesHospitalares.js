import React, { useState, useEffect, Component } from 'react';
import { Platform, StyleSheet, View, Keyboard, KeyboardAvoidingView, Image, TouchableOpacity,Linking,ScrollView, Dimensions ,AsyncStorage, Alert ,Modal,Text, Animated} from 'react-native';
import { globalStyles } from '../../../styles/global.js'
import { Formik } from 'formik'
import api from '../../../services/api'
import { Title } from 'react-native-paper';
import Constants from 'expo-constants';
import { DefaultTheme, List, Checkbox, Avatar, Divider, ActivityIndicator, Card, Button,  IconButton }  from 'react-native-paper';
import MapView, { Marker, MarkerAnimated,PROVIDER_GOOGLE } from 'react-native-maps'
import PlacesInput from 'react-native-places-input';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {markers} from '../Saude/data';

const buttonTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#611661',
  },
};

Icon.loadFont();
const { width, height } = Dimensions.get('window');
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios";
const inputTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4f074f',
  },
};

const checkboxTheme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#212121',
  },
};
const CARD_HEIGHT = 280;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const StarRating = (props) => {

 
  let stars = [];

  for (var i = 1; i <= 5; i++) {
      
      let name = 'ios-star';
      
      if (i > props.ratings) {
          name = 'ios-star-outline';
      }

      stars.push((<Ionicons name={name} size={15} style={styles.star} key={i} />));
  }
  return (
    <View style={ styles.container1}>
        { stars }
        <Text style={styles.text}>({props.reviews})</Text>
    </View>
);

}
const GOOGLE_MAPS_APIKEY ='AIzaSyDodmLkjJTskbUfqb6m4v-83TraZklgqt4';

export default function UnidadesHospitalares({ navigation }){

  
  

  const [isModalVisible, setModalVisible] = useState(false);

  const [regiao, setRegiao] = useState({
    markers,
    region: {
      latitude: -21.762481,
      longitude: -43.344054,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    }
  });

  const [dadosGPS, setDadosGPS] = useState({
    latitude: null,
    longitude: null,
  });

  async function getLocal() {

    try {
      //solicita a permissao de usar gps no dispositivo
      let { status } = await Location.requestPermissionsAsync();

      //verifica se o usuario concedeu a permissao
      if (status !== 'granted') {
        //caso nao tenha concedido, emite um alerta ao usuario
        alert('Por favor, conceda as permissões de acesso à localização para finalizar o cadastro.');
      }
      //caso tenha concedido, pega a localizacao e passa para um objeto local (dadosGPS)
      else {
        let location = await Location.getCurrentPositionAsync({});
        handleDadosGPS(location);
      }
    }
    catch {

      setErrorMsg('Não foi possível obter sua localização atual. Mostrando pontos próximos ao centro da cidade.');

      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 5000);

    }
  };

  function handleDadosGPS(location) {

    const data = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    const newRegion = {
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * (9 / 16)
      }
    };

    setDadosGPS(data);

    //alert('Sua Latitude: ' + data.latitude + '\nSua Longitude: ' + data.longitude);

    onRegionChange(newRegion);
  };

  async function handleSearchRegion(local) {

    console.log(local.result.geometry.location.lat);
    console.log(local.result.geometry.location.lng);

    await Keyboard.dismiss();

    const newRegion = {
      region: {
        latitude: local.result.geometry.location.lat,
        longitude: local.result.geometry.location.lng,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      }
    };

    onRegionChange(newRegion);
  };

  function onRegionChange(region) {
    setRegiao(region);
  };

  
  
const [showModal,setModal] = useState(false);
const [state, setState] = React.useState(regiao);

let mapIndex = 0;
let mapAnimation = new Animated.Value(0);

 
useEffect(()=>{
  mapAnimation.addListener(({ value }) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3);
    if (index >= state.markers.length) {
      index = state.markers.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }

    clearTimeout(regionTimeout);

    const regionTimeout = setTimeout(() => {
      if( mapIndex !== index ) {
        mapIndex = index;
        const { coordinate } = state.markers[index];
        _map.current.animateToRegion(
          {
            ...coordinate,
            latitudeDelta: state.region.latitudeDelta,
            longitudeDelta: state.region.longitudeDelta,
          },
          350
        );
      }
    }, 10);
  });
});

const interpolations = markers.map((marker, index) => {
  const inputRange = [
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    ((index + 1) * CARD_WIDTH),
  ];

  const scale = mapAnimation.interpolate({
    inputRange,
    outputRange: [1, 1.5, 1],
    extrapolate: "clamp"
  });

  return { scale };
});

const onMarkerPress = (mapEventData) => {
  const markerID = mapEventData._targetInst.return.key;

  let x = (markerID * CARD_WIDTH) + (markerID * 20); 
  if (Platform.OS === 'ios') {
    x = x - SPACING_FOR_CARD_INSET;
  }

  _scrollView.current.scrollTo({x: x, y: 0, animated: true});
}

const _map = React.useRef(null);
const _scrollView = React.useRef(null);


    return (
      <KeyboardAvoidingView behavior='height' style={globalStyles.background}>  
      <View style={{ flex: 1 }}>
        
        
      
           
       <View style={styles.mapWrap}>  
        
        <MapView style={styles.mapView} region={regiao.region}
          ref={_map}
          showsUserLocation
          provider={PROVIDER_GOOGLE}

        >

          
          
            {markers.map((markers,index)=>{
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return(
                  <Marker
                  key={index}
                  coordinate={markers.coordinate}
                  
                  
                  >
                  <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                          source={require('../../../../assets/hospital.png')}
                          style={[styles.marker,scaleStyle]}
                          resizeMode="cover"
                        />
                      </Animated.View>
                  </Marker>
                  
              
                );
               })}
                
                </MapView>

              
                <View style={styles.icons}>
                     <Icon name='heart' size={30} color={'#611661'} style={{ justifyContent: `flex-end`,paddingTop:5 }} onPress={()=> navigation.navigate('SintomasLeves')} />
                    <Icon name='crosshairs-gps' size={30} color={'#611661'} style={{ justifyContent: `flex-end`,paddingTop:20 }} onPress={()=>getLocal()} />

                </View>

                
                
              



                


                <Animated.ScrollView
                 ref={_scrollView}
                 horizontal
                 pagingEnabled
                 scrollEventThrottle={1}
                 showsHorizontalScrollIndicator={false}
                 snapToInterval={CARD_WIDTH + 20}
                 snapToAlignment="center"
                 style={styles.scrollView}
                 contentInset={{
                   top: 0,
                   left: SPACING_FOR_CARD_INSET,
                   bottom: 0,
                   right: SPACING_FOR_CARD_INSET
                 }}
                 contentContainerStyle={{
                   paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                 }}
                 onScroll={Animated.event(
                   [
                     {
                       nativeEvent: {
                         contentOffset: {
                           x: mapAnimation,
                         }
                       },
                     },
                   ],
                   {useNativeDriver: true}
                 )}
              >
                {markers.map((markers,index)=>
                  <View style={styles.card} key={index}>
                    <Image 
                      source={markers.image}
                      style={styles.cardImage}
                      resizeMode="cover"
                    /> 
                  
                <View style={styles.textContent}>

                <Text numberOfLines={1} style={styles.cardtitle}>{markers.title}</Text>
                <StarRating ratings={markers.rating} reviews={markers.reviews}></StarRating>
                <Text numberOfLines={2} style={styles.cardDescription}>{markers.description}</Text>
                
                <View style={styles.button}>


                <TouchableOpacity  
                
                    onPress={() => {  
                      const location = `${markers.coordinate.latitude},${markers.coordinate.longitude}`
                     const url = Platform.select({
                     ios: `maps:${location}`,
                     android: `geo:${location}?center=${location}&q=${location}&z=16`,
                          });
                          Linking.openURL(url);
                                          
                     
                      
                      }} >
                
                <Image style={styles.icon}  
                  source={require('../../../../assets/googlemapsicon.png')}
                
                 onPress={() => {
                      
                      const location = `${markers.coordinate.latitude},${markers.coordinate.longitude}`
                     const url = Platform.select({
                     ios: `maps:${location}`,
                     android: `geo:${location}?center=${location}&q=${location}&z=16`,
                          });
                          Linking.openURL(url);
                                          
                     
                      
                      }} 
                      />
                   </TouchableOpacity>   
                    


                  
                  </View>

                  </View>
                  
                  </View>

                )}

              
              </Animated.ScrollView>
              
              
                    
                
                
       
             
           </View>  
        </View>
    </KeyboardAvoidingView>
        
    );
  }


const styles = StyleSheet.create({

  markerOutline: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 999,
    borderColor: '#d4d4d4'
  },
  icons:{
     position:`absolute`, 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:`column`,
    backgroundColor: '#fff',
    width: '13%',
    alignSelf:`flex-end`,
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
 
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  Optionstyle:{
    backgroundColor : '#4f074f',
    width: 150,
    height:205,
    borderRadius:30,
    marginTop:35,
    margin:2,
    padding:10,
    justifyContent: `center`,
    

  },
  profileRow2: {
    marginTop: '4%',
    marginLeft: '3%',
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:2,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  },
  container1: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	star: {
		color: '#FF8C00'
	},
	text: {
		fontSize: 12,
        marginLeft: 5,
        color: '#444',
  },
  icon:{
    marginTop:-25,
    width: 60,
    height: 60,
    alignSelf:`center`,
    padding:2,
    
  },
  profileName: {
    color: '#404040',
    fontSize: 28,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
    height:250,
  },
  profileView: {
    height: 250,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  textColumn: {
    marginTop: '4.5%',
    marginLeft: '2%',
    width: '66%',
    // borderWidth: 2,
  },
  mapView: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    borderWidth: 2,
    borderColor: '#320232',
  },
  mapWrap: {
    flex: 1,
    
  },
  profileRow1: {
    marginLeft: '3%',
    width: '94%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  profileRow3: {
    width: '94%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: '90%',
    marginTop: '5%',
    alignSelf: 'center',
  },

  profileRow0: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
  },
  
  hospital: {
    width: '10%',
    alignItems: 'flex-start',
  },
  avatarColumn: {
    width: '33%',
    alignItems: 'center',
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});
