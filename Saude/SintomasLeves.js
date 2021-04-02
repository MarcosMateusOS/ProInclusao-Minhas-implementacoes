import React, { useState, useEffect, Component } from 'react';
import { Platform, StyleSheet, View, Keyboard, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, Dimensions, AsyncStorage, Alert, Modal, Text } from 'react-native';
import { globalStyles } from '../../../styles/global.js'
import { Formik } from 'formik'
import api from '../../../services/api'
import { Title } from 'react-native-paper';
import Constants from 'expo-constants';
import { DefaultTheme, List, Checkbox, Avatar, Divider, ActivityIndicator, Card, Button, IconButtonm } from 'react-native-paper';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps'
import PlacesInput from 'react-native-places-input';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

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
const GOOGLE_MAPS_APIKEY = 'AIzaSyDHUy9GDntwa_zZS_yIk3L02ckRMgU9ILI';

export default function CadastroMorador({ navigation }) {

  return (
    <KeyboardAvoidingView behavior='height' style={globalStyles.background}>

      <Card style={{ backgroundColor: '#E6E6E6', height: `100%` }} >
        <Title style={styles.Titulo}>
          Para evitar a propagação da COVID-19, as seguintes medidas podem ser adotadas:
        </Title>

        <ScrollView vertical={true} style={{marginTop: '5%'}}>

          <View style={{ flexDirection: `row`, alignSelf: 'center', marginTop: '-10%' }}>
            
            <Card style={styles.Optionstyle}>
              <Image style={styles.avatarImage} source={require('../../../../assets/TriagemCovid/mascara.png')} />
              <Title style={styles.Recomendacao}>Utilize máscaras em todos os ambientes</Title>
            </Card>

            <Card style={styles.Optionstyle}>
              <Image style={styles.avatarImage} source={require('../../../../assets/TriagemCovid/lavamao.png')} />
              <Title style={styles.Recomendacao2}>Lave com frequência as mãos</Title>
            </Card>

          </View>

          <View style={styles.CardRow}>

            <Card style={styles.Optionstyle}>

              <Image style={styles.avatarImage} source={require('../../../../assets/TriagemCovid/cobrirrosto.png')} />
              <Title style={styles.Recomendacao3}>Ao tossir ou espirrar,cubra nariz e boca</Title>

            </Card>

            <Card style={styles.Optionstyle}>

              <Image style={styles.avatarImage} source={require('../../../../assets/TriagemCovid/mantenhadistancia.png')} />
              <Title style={styles.Recomendacao4}>Mantenha a distância</Title>

            </Card>

          </View>

          <View style={styles.CardRow}>

            <Card style={styles.Optionstyle}>

              <Image style={styles.avatarImage} source={require('../../../../assets/TriagemCovid/alcoolemgel.png')} />
              <Title style={styles.Recomendacao5}>Use Álcool em gel</Title>

            </Card>

            <Card style={styles.Optionstyle}>

              <Title style={styles.Recomendacao5}>Evite contato próximo com grupos de risco</Title>

            </Card>

          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({

  itemAvatar: {
    marginTop: '1%',
    marginRight: '2%',
    marginLeft: '2%',
  },
  filtroBox: {
    height: 45,
    marginTop: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Optionstyle: {
    backgroundColor: '#4f074f',
    width: 150,
    height: 205,
    borderRadius: 30,
    marginTop: 35,
    margin: 2,
    padding: 10,
    justifyContent: `center`,


  },
  Recomendacao: {
    lineHeight: 20,
    color: `#F69E44`,
    fontSize: 20,
    marginTop: 15,
    fontWeight: `bold`,
    textAlign: `center`,
    justifyContent: `space-between`,

  },
  Recomendacao2: {
    color: `#F69E44`,
    fontSize: 20,
    lineHeight: 20,
    marginTop: 15,
    fontWeight: `bold`,
    textAlign: `center`,
  },

  Recomendacao3: {
    color: `#F69E44`,
    fontSize: 20,
    lineHeight: 20,
    marginTop: 15,
    fontWeight: `bold`,
    textAlign: `center`,
  },
  
  Recomendacao4: {
    lineHeight: 20,
    color: `#F69E44`,
    lineHeight: 20,
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    position: `relative`,
    textAlign: `center`,
  },

  Recomendacao5: {
    color: `#F69E44`,
    marginTop: 25,
    lineHeight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    position: `relative`,
    textAlign: `center`,
  },

  Optionstyle2: {
    backgroundColor: '#4f074f',
    width: 150,
    height: 240,
    borderRadius: 20,
    margin: 2,
    padding: 15,
    justifyContent: "space-between",
    position: `relative`,
  },

  mapSearch: {
    height: 50,
  },

  searchField: {
    position: 'relative',
    alignSelf: 'stretch',
    margin: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowOpacity: 0,
    borderColor: '#dedede',
    borderWidth: 1,
  },

  avatarImage: {
    flexDirection: `column`,
    marginTop: 5,
    marginLeft: -1,
    backgroundColor: '#f1f1f1',
    width: 80,
    height: 80,
    alignItems: `baseline`,
    justifyContent: `flex-start`,
    borderRadius: 999999,
    alignSelf: `center`,
  },

  mapSearch: {
    height: 60,
  },

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

  accordionStyle: {
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '-5%',
  },

  filtro: {
    marginLeft: '-5%',
  },

  filtroView: {
    marginTop: '-1%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  submit: {
    backgroundColor: '#fafafa',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    alignSelf: 'center',
  },

  submitText: {
    alignItems: 'center',
    fontSize: 17,
  },

  viewListaMoradores: {
    height: 65,
  },

  scrollListView: {
    flex: 1,
  },

  mapCardView: {
    marginTop: 25,
    borderColor: '#320232',
    width: '100%',
    height: '56%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  mapView: {

    width: '100%',
    alignSelf: 'center',
    height: '100%',
    borderWidth: 3,
    borderColor: '#320232',
  },

  mapWrap: {
    margin: 2,
    borderWidth: 2,
    borderColor: '#c4c4c4',
  },

  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },

  profileView: {
    height: 250,
    borderRadius: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  profileRow1: {
    marginLeft: '3%',
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  profileRow2: {
    marginTop: '4%',
    marginLeft: '3%',
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  avatarColumn: {
    width: '33%',
    alignItems: 'center',
  },

  textColumn: {
    marginTop: '4.5%',
    marginLeft: '2%',
    width: '66%',
    // borderWidth: 2,
  },

  profileName: {
    color: '#404040',
    fontSize: 28,
  },

  profileDescription: {
    color: '#707070',
  },

  infoItem: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '33%',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#f0f0f0',
  },

  itemTitle: {
    color: '#101010',
    fontSize: 15,
  },

  itemDescription: {
    color: '#707070',
  },

  profileRow0: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
  },

  profileRow3: {
    width: '94%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  profileButton: {
    width: '90%',
    marginTop: '5%',
    alignSelf: 'center',
  },

  ModalEstilo1: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },

  ModalEstilo2: {
    borderRadius: 5,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fafafa'
  },

  Titulo: {
    marginBottom: '-2%',
    marginLeft: '8.5%',
    marginRight: '8.5%',
    marginTop: 20,
    fontSize: 20,
    color: '#320232',
    lineHeight: 20,
    textAlign: 'center',
  },

  CardRow: { 
    flexDirection: 'row', 
    alignSelf: 'center', 
    marginTop:-33,
  },
});
