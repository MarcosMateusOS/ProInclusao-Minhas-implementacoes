import { updateLocale } from 'moment';
import firebase from '../../../../database';



const apiBanco = {


    findUserByID:async (us) =>{
       const user = await firebase
        .database()
        .ref("users")
        .orderByChild("_id")
        .equalTo(us._id)
        .once("value");
    
        //Ajustar para Usuarios com nomes iguais
      if(user.exists()){
            console.log("existe");
            return Object.values(user.val())[0];
        }else{

          const newUser=firebase.database().ref('users').push({
            _id:us._id,
            nome:us.nome,
            imagemPerfil:us.fotoPerfil,
            
          });
      
          return newUser;
          
        }
    
        

    },

    

    createRoom:async(user,user2)=>{

        const chat = await firebase
         .database()
         .ref("Chats")
         .orderByChild("id1" && "id2")
         .equalTo(user2._id && user._id)
         .once("value");
         
         if(chat.exists()){
           //Object.values(user.val())[0]
            
              return  Object.keys(chat.val())[0];;
             
         }else{
          console.log("n existe");
          const newChat=firebase.database().ref('Chats').push({         
            user1:user.nome,
            id1:user._id,
            us2:user2.nome,
            id2:user2._id,
          });


          const newchatId = await firebase
         .database()
         .ref("Chats")
         .orderByChild("id1" && "id2")
         .equalTo(user._id && user2._id)
         .once("value");


        
          const userF = await firebase
           .database()
           .ref("users")
           .orderByChild("_id")
           .equalTo(user._id)
           .once("value");


          const userF2 = await firebase
          .database()
          .ref("users")
          .orderByChild("_id")
          .equalTo(user2._id)
          .once("value");

      


           const key1 = Object.keys(userF.val())[0];;
           const key2 = Object.keys(userF2.val())[0];;

         
           console.log("Chat Criado");

          
     

          const key= Object.keys(newchatId.val())[0];;
          

      

          firebase.database().ref("users").child(key1).child("Contatos").push({
            
              nome:user2.nome,
              id:user2._id,
              chavedoChat:key,

            
          });

          firebase.database().ref("users").child(key2).child("Contatos").push({
            
            nome:user.nome,
            id:user._id,
            chavedoChat:key,

        
        });
         // firebase.database().ref("users").child(key2).child("Chats").push(key);
          return key;
        }



     
      
    },
    /*
    findChatByID:async (us) =>{
      const chat = await firebase
       .database()
       .ref("chats")
       .orderByChild("id1")
       .equalTo(us)
       .once("value");
   
       //Ajustar para Usuarios com nomes iguais
       if(chat.exists()){
           return Object.values(chat.val())[0];
       }
   
       return null;
       

   },
    */


    saveMessage: async (message,keyChat) => {
         firebase.database().ref("Chats").child(keyChat).child("Mensagens").push(message);
    },
    
      updateMessages: async(callback,keyChat) => {
        firebase.database()
          .ref("Chats")
          .child(keyChat)
          .child("Mensagens")
          .limitToLast(20)
          .on("child_added", (snapshot) => {callback(parse(snapshot));
          });
      },
    };
    
    const parse = (snapshot) => {
      const { createdAt, text, user } = snapshot.val();
      const { key: _id } = snapshot;
      const message = { _id, createdAt, text, user };
      return message;
    };


export default apiBanco;