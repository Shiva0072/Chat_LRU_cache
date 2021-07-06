import { Chathandler,chat_names } from "./lru";

onload=function(){
    const chatlist=document.getElementById('chat-list');         //chats on the screen
    const add=document.getElementById('generate-step');         //button access of the generate-step
    const text=document.getElementById('temptext');       //access to the temptext area on html page

    const templates=this.document.getElementsByTagName('template')[0];
    const chat_item=templates.content.querySelector("li");             //select the li item in ul of HTML

    const chatHandler=new Chathandler(chat_item,chatlist);           //create object of the class chathandler
    let chats=[];                                                  //chat ids present on the screen
    
    add.onClick=function(){
        if(Math.random()>0.75 && chats.length>0){ //select a no. randomly and if the chats array is not empty
            let index=Math.floor(Math.random()*chats.length); //pick a radom value from the chats array to delete it
            let idToDelete=chats[index];
            chatHandler.deleteMsg(idToDelete);
            text.innerHTML=`Deleteed message from ${chat_names[idToDelete]} <br> ${text.innerHTML}`; //put it on the screen
            chats.splice(index,-1);  //remove the id [of the chat deleted] from the chats array
        }
        else{
            let idOfMsg=Math.floor(Math.random()*7);  //since we have 7 chats. select anyone randomly
            if(chats.includes(idOfMsg)===false){  //check if this chat is already present in the chat list
                chats.push(idOfMsg);   //if not present then push the chat on screen
            }
            chatHandler.newMsg(idOfMsg);   //call the newMsg function of the chatHandler class
            text.innerHTML=`New message from ${chat_names[idOfMsg]} <br> ${text.innerHTML}`;   //put it on the screen
        }
    };
};
