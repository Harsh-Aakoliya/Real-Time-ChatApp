import React from 'react'
import "./ShowAllChat.css"
function ShowAllChat({allChats,curUser}) {
    console.log(allChats);
    console.log(curUser);
  return (
    <div className='allChat-container'>
        {
            allChats.map((chat,key)=>{
                console.log("current and sender",curUser," ",chat.senderName);
                return (
                    <>
                        <div className="userName-Heading" id={(chat.senderName === curUser) ? "you" : "other"}><b>~</b>\
                                {
                                    chat.senderName===curUser &&  "You"
                                }
                                {
                                    chat.senderName!==curUser &&  chat.senderName
                                }    
                            <div className='chatMessage-container'>
                                {chat.chatMessage}
                            </div>
                        </div>
                        
                    </>
                )
            })
        }
    </div>
  )
}

export default ShowAllChat

