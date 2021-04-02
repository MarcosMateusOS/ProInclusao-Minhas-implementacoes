import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Keyboard, KeyboardAvoidingView, Image, TouchableOpacity, ScrollView, Dimensions, AsyncStorage, Alert, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyles } from '../../../styles/global'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup'
import { Provider as PaperProvider, DefaultTheme, Card, List, IconButton, Divider, Button,Appearance , TextInput, Text, Checkbox, HelperText, Paragraph, Title } from 'react-native-paper'
Icon.loadFont();
const { width, height } = Dimensions.get('window');

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Platform.OS === "ios";

const reviewSchema = yup.object({
    nome: yup.string()
        .required('O campo "Nome" não pode ficar em branco')
        .min(4, 'O campo "Nome" não pode conter menos que 4 caracteres'),
    dataNasc: yup.string()
        .min(12, 'Por favor, selecione uma data.'),
})

const verdePadrao = '#005500';


const buttonTheme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4f074f',
    },
};



const botaoVerde = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: verdePadrao,
    },
};

const inputTheme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4f074f',
        accent: '#611661',
    },
};



export default function CadastroMorador({ navigation, route }) {

    function reset(){
        setBot1(buttonTheme);
        setBot2(buttonTheme);
        setBot3(buttonTheme);
        setBot4(buttonTheme);
        setBot5(buttonTheme);
        setBot6(buttonTheme);
        setBot7(buttonTheme);
        setBot8(buttonTheme);
        
    }

    function mudaBotao(botaozadaPar, setBotaozadaPar,setSintoma,sintoma) {
        if (botaozadaPar == botaoVerde && sintoma == true) {
            setSintoma(false);
            setBotaozadaPar(buttonTheme);
            
        }
        else {
            setBotaozadaPar(botaoVerde);
            setSintoma(true);
        } 
        
    }

    

    function resultado(){
        
        if(tosse == true && febre == true && checked3 == 'selecionado-5' && checked1 == 'selecionado-2' && checked2 == 'selecionado-6'){
            navigation.navigate('SintomasLeves')// sintomas leve ir para tela de sintomas leves
        }
        if (tosse == false && tosse == false  && coriza == false  && dor == false  && cansaco == false  && nausea == false  && olfato == false  && dispineia == false  ){
            alert("Nada marcado") 
        }
        if ((checked3 == 'selecionado-4' && checked1 == 'selecionado-1' && checked2 == 'selecionado-3') && ((tosse == true || coriza == true  || dor == true  || cansaco == true) && (nausea == true  || olfato == true  || dispineia == true)) ){
              navigation.navigate('UnidadesHospitalares')
        }
    }

    const [bot1, setBot1] = useState(buttonTheme);
    const [febre,setFebre] = useState(false);

    const [bot2, setBot2] = useState(buttonTheme);
    const [tosse,setTosse] = useState(false);

    const [bot3, setBot3] = useState(buttonTheme);
    const [coriza,setCoriza] =  useState(false);

    const [bot4, setBot4] = useState(buttonTheme);
    const [dor, setDot] = useState(false);

    const [bot5, setBot5] = useState(buttonTheme);
    const [cansaco,setCansaco] = useState(false);
    

    const [bot6, setBot6] = useState(buttonTheme);
    const [nausea,setNasea] = useState(false);
    
    
    const [bot7, setBot7] = useState(buttonTheme);
    const [olfato,setOlfato] = useState(false);
   

    const [bot8, setBot8] = useState(buttonTheme);
    const [dispineia,setDispineia] = useState(false);

    const [checked, setChecked] = useState('selecionado');


    const [checked1, setChecked1] = useState('selecionado-1');
    const [checked2, setChecked2] = useState('selecionado-3');
    const [checked3, setChecked3] = useState('selecionado-4');
    
    

    
    const [isModalVisible, setModalVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [isModalVisible1, setModalVisible1] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

   

    function recomend() {
        <Modal
            animationType={'fade'}
            transparent={false}
            visible={isModalVisible}

        >

            <View style={styles.ModalEstilo1}>
                <View styles={styles.ModalEstilo2}>
                    <Card style={styles.CardRecomendacao}>
                    </Card>
                </View>
            </View>

        </Modal>

    };

    return (
       
        <View style={{ flex: 1 }}>
            
            <KeyboardAwareScrollView behavior='padding' enableOnAndroid={true} enableAutomaticScroll={(Platform.OS === 'ios')} style={globalStyles.background}>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={isModalVisible}
                >
                    <View style={styles.ModalEstilo1}>
                        <View style={styles.ModalEstilo2}>
                            <Card style={{ height: 2 * height / 3, borderTopLeftRadius: 12, borderTopRightRadius: 12, }}>

                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Icon name='close' size={20} color={'#505050'} style={{ marginLeft: '95%' }} />
                                </TouchableOpacity>

                                <Card.Content>

                                    <Paragraph style={styles.cardInfo}>
                                        <Text style={{fontWeight: 'bold'}}> Atenção! </Text> {'\n'}{'\n'}
                                        <Text> → Esta página não substitui um diagnóstico feito por um profissional de saúde, esta apenas tem o objetivo de informar acerca da Covid-19, bem como dar recomendações baseadas naquilo que o usuário está sentindo;</Text>
                                        {'\n'}{'\n'} <Text> Em caso de suspeita de Covid-19 </Text><Text style={{fontWeight: 'bold'}}>procure ajuda médica profissional</Text>.
                                    </Paragraph>

                                </Card.Content>
                                
                            </Card>

                        </View>
                    </View>


                </Modal>

                <View style={{ flex: 1, backgroundColor: '#0000', paddingLeft: 10, paddingRight: 10, paddingTop: -30 }}>



                    <View >

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: `space-between`, marginTop: 10 }}>

                            <Text style={{ fontSize: 17 }}>Como você se sente neste momento?</Text>
                            <TouchableOpacity onPress={() => { setModalVisible(true) }}>

                                <Icon name='info' size={20} color={'#611661'} style={{ justifyContent: `flex-end` }} />

                            </TouchableOpacity>
                        </View>

                        <View style={styles.checkboxView}>
                            <CheckBox

                                center
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={checked == 'selecionado'}
                                onPress={() => { setChecked('selecionado') }}
                            />
                            <Text style={styles.checkboxViewText1}>Bem</Text>
                            <CheckBox
                                center
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={checked == 'selecionado2'}
                                onPress={() => setChecked('selecionado2')}
                            />
                            <Text style={styles.checkboxViewText2}>Mal</Text>
                            <TouchableOpacity onPress={()=>reset()}>
                           
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={globalStyles.cardPorTamanhoNecessario}>


                        <Card style={{ paddingBottom: 5, paddingTop: 15, borderWidth: 1, borderRadius: 5, }}>

                            <Text style={{ textAlign: "center", fontSize: 17, fontWeight: "bold", paddingBottom: 15 }}>Avaliação do estado de saúde : Sintomas</Text>

                            <View style={{ height: 300 }}>

                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>

                                    
                                        <Button
                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot1}
                                            
                                            onPress={() => mudaBotao(bot1, setBot1,setFebre,febre)}
                                        >
                                           <Title style={styles.Sintomas}> Febre </Title>
                                                </Button>
                                   

                                    
                                        <Button
                                            
                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot2}
                                            onPress={() => mudaBotao(bot2, setBot2,setTosse,tosse)}
                                        >

                                          <Title style={styles.Sintomas}>  Tosse Seca </Title>
                                </Button>
                                    
                                </View>


                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>

                                    
                                        <Button
                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot3}
                                            
                                            onPress={() =>mudaBotao(bot3, setBot3,setCoriza,coriza)}
                                        >
                                           <Title style={styles.Sintomas}>Coriza </Title>
                                                </Button>
                                   
                                                                        
                                        <Button
                                            
                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot4}
                                            onPress={() => mudaBotao(bot4, setBot4,setDot,dor)}>

                                          <Title style={styles.Sintomas}> Dor de garganta </Title>
                                </Button>
                                    
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>

                                    
                                        <Button
                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot5}
                                            
                                            onPress={() => mudaBotao(bot5, setBot5,setCansaco,cansaco)}
                                        >
                                           <Title style={styles.Sintomas}> Cansaço </Title>
                                                </Button>
                                   

                                    
                                        <Button
                                            
                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot6}
                                            onPress={() =>mudaBotao(bot6, setBot6,setNasea,nausea)}
                                        >

                                          <Title style={styles.Sintomas}> Náuseas/Vômitos </Title>
                                </Button>
                                    
                                </View>

                                

                            
                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>

                                    
                                        <Button

                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot7}
                                            onPress={() =>mudaBotao(bot7, setBot7,setOlfato,olfato)}
                                        >
                                          <Title style={styles.Sintomas}> Perda de olfato  </Title>  
                                                </Button>
                                  

                                   
                                        <Button

                                            style={styles.footerButton}
                                            mode='contained'
                                            theme={bot8}
                                            onPress={() => mudaBotao(bot8, setBot8,setDispineia,dispineia)}
                                        >
                                           <Title style={styles.Sintomas}>Dispnéia</Title> 
                                            
                                </Button>
                                    
                                </View>
                                
                                    
                                

                                
                            </View>
                            
                            <Text style={{ paddingTop: 30, paddingLeft: 15, paddingTop: -45, fontSize: 17, }}>Teve febre acima de 37,8?</Text>


                            <View style={{ height: 55 }}>
                                <View style={styles.checkboxView}>
                                    <CheckBox

                                       
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={checked3 == 'selecionado-4'}
                                        onPress={() => { setChecked3('selecionado-4') }}
                                    >

                                    </CheckBox>
                                    <Text style={styles.checkboxViewText1}> Sim </Text>

                                    <CheckBox

                                        center
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={checked3 == 'selecionado-5'}
                                        onPress={() => { setChecked3('selecionado-5') }}
                                    >

                                    </CheckBox>
                                    <Text style={styles.checkboxViewText2}> Não </Text>
                                </View>
                            </View>

                           
                            
 

                            
                            
                            <Text style={{ paddingTop: 30, paddingLeft: 15, paddingTop: -45, fontSize: 17, }}>Teve contato próximo com pessoa suspeita de COVID-19 nos últimos 14 dias?</Text>


                            <View style={{ height: 55 }}>
                                <View style={styles.checkboxView}>
                                    <CheckBox

                                       
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={checked1 == 'selecionado-1'}
                                        onPress={() => { setChecked1('selecionado-1') }}
                                    >

                                    </CheckBox>
                                    <Text style={styles.checkboxViewText1}> Sim </Text>

                                    <CheckBox

                                        center
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={checked1 == 'selecionado-2'}
                                        onPress={() => { setChecked1('selecionado-2') }}
                                    >

                                    </CheckBox>
                                    <Text style={styles.checkboxViewText2}> Não </Text>
                                </View>
                            </View>

                            <View style={{ height: 100 }}>
                                <Text style={{ paddingTop: 30, paddingLeft: 15, paddingTop: -45, fontSize: 17, paddingRight:15 }}>Teve contato próximo com pessoa diagnosticada com COVID-19 nos últimos 14 dias?</Text>
                                <View style={styles.checkboxView}>
                                    <CheckBox

                                        center
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={checked2 == 'selecionado-3'}
                                        onPress={() => { setChecked2('selecionado-3') }}
                                    >

                                    </CheckBox>
                                    <Text style={styles.checkboxViewText1}> Sim </Text>

                                    <CheckBox

                                        center
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={checked2 == 'selecionado-6'}
                                        onPress={() => { setChecked2('selecionado-6') }}
                                    >

                                    </CheckBox>
                                    <Text style={styles.checkboxViewText2}> Não </Text>
                                </View>
                            </View>
                            <View style={{marginTop: 30}}>
                                <Button
                                    style={styles.footerButton2}
                                    contentStyle={styles.footerButtonContent}
                                    mode='contained'
                                    theme={buttonTheme}
                                    onPress={() => resultado()}
                                >
                                    Confirmar
                                </Button>
                            </View>
                        </Card>
                        
                    </ScrollView>

                    <Modal
                        animationType={'fade'}
                        transparent={true}
                        visible={isModalVisible1}
                        styles={styles.CardRecomendacao}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                    >
                            
                        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                            <Card style={styles.Card}>
                                <View>
                                    <TouchableOpacity style={{marginLeft:'93%', marginTop:'2%'}}
                                                      onPress={() => setModalVisible1(false)}>
                                        <Icon name='close' size={20} styles={{marginLeft: '95%'}} />
                                    </TouchableOpacity>
                                </View>
                            </Card>
                        </View>

                    </Modal>

                </View>
            </KeyboardAwareScrollView>
        </View>

        
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        width: '92%',
        height: 50,
        marginBottom: 5,
        marginTop: 5,
        alignItems: 'center',
        paddingLeft: 15,
        paddingBottom: 0,
        color: '#222',
        fontSize: 17,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
    container: {
        flex: 3,
        alignItems: 'center',
        flexDirection: 'column',
        //justifyContent: 'center',
        width: '90%',
        paddingBottom: 5,
    },
    radioView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateView: {
        width: '92%',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxView: {
        flexDirection: 'row',


        width: '75%',
        height: 30,
    },
    Sintomas:{
        color:'#fff',
        fontSize:13,
        marginTop:25,
        justifyContent:`space-between`,

    },
    checkboxView1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
        height: 75,
    },

    checkboxViewText: {
        color: '#606060',
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 7,
        paddingLeft: 21
    },
    checkboxViewText1: {
        color: '#32CD32',
        fontSize: 17,
        alignSelf: `center`,

        marginLeft: 7,
    },
    checkboxViewText2: {
        color: '#FF0000',
        width: "45%",
        fontSize: 17,
        alignSelf: `flex-end`,
        marginTop: 5,
    },
    bigInput: {
        backgroundColor: '#fff',
        width: '92%',
        height: 50,
        marginBottom: 5,
        marginTop: 5,
        paddingLeft: 15,
        color: '#222',
        fontSize: 17,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
    },
    dropdownView: {
        marginTop: '5%',
    },
    CardRecomendacao: {
        flex: 1,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 0
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        width: '92%',
        height: 50,
        marginTop: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingBottom: 0,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
    },
    inputError: {
        fontSize: 14,
        color: 'red',
        //marginLeft: '5%',
    },
    dateLabel: {
        backgroundColor: '#fff',
        width: '100%',
        height: 45,
        justifyContent: 'center',
        paddingBottom: 0,
        paddingLeft: 15,
        color: '#222',
        fontSize: 17,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
    },
    inputTitle: {
        marginTop: '2%',
        fontSize: 14,
    },
    inputForm: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#F1F1F1',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    formProp: {
        width: '100%',
        marginLeft: '8%',
    },
    submit: {
        backgroundColor: '#fafafa',
        width: '45%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#000',
    },
    descricaoView: {
        marginTop: '4%',
    },
    footer: {
        marginTop: '15%',
        alignSelf: 'flex-start',
    },
    footerAntProx: {
        width: '92%',
        alignSelf: 'center',
        marginBottom: '4%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    anterior: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 17,
    },
    proximo: {
        alignItems: 'center',
        justifyContent: "center",
        fontSize: 17,
    },
    botaoSintoma: {
        width: '45%',
        alignSelf: 'center',
    },
    footerButton: {
        
         width: 175,
         height:55,
         display:`flex`,
         justifyContent:`center`,
         alignItems:`center`,
        
        
    },
    
    footerButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '35%',
    },
    mapViewTop: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    mapViewTitle: {
        color: '#606060',
        fontSize: 17,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginTop: 3,
        marginLeft: 10,
    },
    mapViewClose: {
        borderWidth: 1,
        marginLeft: '42%',
        marginTop: 10,
        borderColor: '#909090'
    },
    mapOverlay: {
        borderRadius: 5,
        flex: 1,
        alignSelf: 'center'
    },
    mapWrap: {
        flex: 1,
        marginBottom: 10,
        width: '100%',
    },
    mapView: {
        flex: 1,
    },
    mapSearch: {
        marginTop: 12,
        height: 60,
        position: 'absolute',
        top: 40,
        width: '94%',
        marginLeft: '3%',
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
    botaoSair: {
        marginLeft: '95%',
        alignSelf: 'center',
        width: "40%",
        height: "100%",
    },
    Card: {
        backgroundColor: `#808080`,
        width: '98%',
        height: 500,
        top: 100,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderTopStartRadius: 20,
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    cardInfo: {
        fontSize: 15,
        textAlign: 'justify',
    }
});