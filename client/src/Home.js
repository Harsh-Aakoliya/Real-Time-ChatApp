import React, { useState } from 'react';

import './Home.css';
import Chat from './Chat';
import io from "socket.io-client"

//establishing the connection to socket.io so we need to provide the connection url of backend
// const socket=io.connect("http://localhost:3001")
const socket=io.connect("https://chat-app-backend-g8y3.onrender.com")//deployment url


function Home() {
  const [name, setName] = useState("");
  const roomId=0;
  const [joindedChat,setJoindedChat]=useState(false);

  // console.log(name);
  const joinChat=async ()=>{
    if(name!==""){
        await socket.emit("join_chat",{name,roomId})
        setJoindedChat(true);
        return ;
    }
    alert("Please enter your name ")

  }
  return (
    <div className="Home-container"> 
      {
        !joindedChat ?
        <>
          <h2>Join the chat</h2>
          <input type="text" placeholder="What chat should call you ?" onChange={(e)=>{setName(e.target.value)}}></input>
          <button onClick={joinChat}>Join the chat</button>
          <br />
        </>
      :
      <>
        <div>You Joined Chat as name : {name}</div>
        <Chat socket={socket} name={name} roomId={roomId}/>
      </>
    }
    </div>
  );
}

export default Home;
