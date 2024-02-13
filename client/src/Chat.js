import React, { useEffect, useState } from 'react'
import ShowAllChat from './ShowAllChat';

function Chat({socket, name,roomId}) {
    const [chat,setChat]=useState("");
    const [allChats,setAllChats]=useState([])
    //this funciton will be in picture if we want to send message from front end to backend
    const sendChat=async ()=>{
        if(chat!==""){
            const chatData={
                senderName:name,
                chatMessage:chat,
                roomId:roomId
            }
            await socket.emit("send_chat",chatData)
        }
    }

    //now to display all the chat we need to listen from backend because suppose we have two user (user1 and user2)
    //so whenever user1 sendChat then server will listen it and also that user1's chat will be emitted from backend to every
    //other user they are connnected to socket i.e. user2's chat body will receive the user1's chat

    //so from above idea we can say that whenever there is change in socket variable we need to display that new chat in chat body
    //so this situation lead so use useEffect hook
    //and for this scenario let us set event as "receive_chat"
    useEffect(()=>{
        socket.on("receive_chat",(receivedData)=>{//this callback function will perform what ever we 
            console.log("chat receiver from other user",receivedData);
            setAllChats((prechats) => [...prechats, receivedData]);
        })
    },[socket]);
  return (
    <div>
        <div>Available Chat for this room
            <ShowAllChat allChats={allChats}/>
        </div>
        <div>
            <input type='text' placeholder="Express your thought" onChange={(e)=>{setChat(e.target.value)}}></input>
            <button onClick={sendChat}>Send </button>
        </div>
    </div>
  )
}

export default Chat