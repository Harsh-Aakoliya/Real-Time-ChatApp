import React from 'react'
import "./ShowAllChat.css"
function ShowAllChat({allChats}) {
    console.log(allChats);
  return (
    <div className='container'>
        {
            allChats.map((chat,key)=>{
                return (
                    // <h5>{chat}</h5>
                    <h5>chat sended by {chat?.senderName} and chat content is {chat?.chatMessage}</h5>
                )
            })
        }
    </div>
  )
}

export default ShowAllChat