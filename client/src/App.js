import React, { useState } from 'react';

import './App.css';
import Chat from './Chat';
import io from "socket.io-client"

//establishing the connection to socket.io so we need to provide the connection url of backend
const socket=io.connect("http://localhost:3001")


function App() {
  const [name, setName] = useState("");
  const roomId=0;
  // console.log(name);
  const joinChat=()=>{
    if(name!==""){
        socket.emit("join_chat",{name,roomId})
    }
  }
  return (
    <div className="App">
      This home page
      <h2>Join the chat</h2>
      <input type="text" placeholder="What chat should call you ?" onChange={(e)=>{setName(e.target.value)}}></input>
      <button onClick={joinChat}>Join the chat</button>
      <br />
      <Chat socket={socket} name={name} roomId={roomId}/>
    </div>
  );
}

export default App;
