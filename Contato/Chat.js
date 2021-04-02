
import { id } from 'date-fns/esm/locale';
import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import api from '../../../services/api'
import apiBanco from '../Contato/apiFireBase';

export default function Chat({ navigation,route }) {
  
  const [messages, setMessages] = useState([]);
  const user=route.params.userChat;
  const chatKey=route.params.keyChat;
  

  

  useEffect(() => {
    console.disableYellowBox = true;
    apiBanco.updateMessages((msg) => {
      setMessages((prevMsgs) => GiftedChat.append(prevMsgs, msg));
    },chatKey);
  }, []);

  const onSend = async (msgs) => {
    msgs.forEach((msg) => {
      
      const { text, user } = msg;
      const message = { text, user, createdAt: new Date().getTime() };
      apiBanco.saveMessage(message,chatKey);
    });
  };
  


  function renderBubble(props) {
    return (
      //retorna o componente balão:
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            //aqui muda a cor do balão
            backgroundColor: '#682F9B'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }
  
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#682F9B' />
        </View>
      </Send>
    );
  } 

    return (
        
        <GiftedChat
            user={user}
            messages={messages}
            onSend={onSend}
            renderBubble={renderBubble}
            renderSend={renderSend}
        >



        </GiftedChat>
      
    );
  }
 
  const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

    
