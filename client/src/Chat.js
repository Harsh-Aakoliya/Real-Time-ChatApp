import React, { useEffect, useState } from 'react'

function Chat({socket, name}) {
    const [chat,setChat]=useState("");
    //this funciton will be in picture if we want to send message from front end to backend
    const sendChat=async ()=>{
        if(chat!==""){
            const chatData={
                senderName:name,
                chatMessage:chat,
            }
            await socket.emit("send_chat",chatData)
        }
    }

    //now to display all the chat we need to listen from backend because suppose we have two user (user1 and user2)
    //so whenever user1 sendChat then server will listen it and also that user1's chat will be emitted from backeend to every
    //other user they are connnected to socket i.e. user1's and user2's chat body will receive that user1's chat

    //so from above idea we can say that whenever there is change in socket variable we need to display that new chat in chat body
    //so this situation lead so use useEffect Hook
    //and for this scenario let us set event as "receive_chat"
    useEffect(()=>{
        socket.on("receive_chat",()=>{//this callback function will perform what ever we 

        })
    },[socket]);
  return (
    <div>
        <div>Available Chat for this room</div>
        <div>
            <input type='text' placeholder="Express your thought" onChange={(e)=>{setChat(e.target.value)}}></input>
            <button onClick={sendChat}>Send </button>
        </div>
    </div>
  )
}

export default Chat