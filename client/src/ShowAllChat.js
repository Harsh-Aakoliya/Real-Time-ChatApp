import React from 'react'

function ShowAllChat({allChats}) {
  return (
    <div>
        {
            allChats.map((chat)=>{
                return (
                    <h1>chat sended by {chat.senderName} and chat content is {chat.chatMessage}</h1>
                )
            })
        }
    </div>
  )
}

export default ShowAllChat