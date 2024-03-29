const express=require("express");
const app=express(); //creating the instance of express as backend application i.e. app

const cors=require("cors") //since we are dealing with socket.io so there will be lots of issues with connection so to resolve it we can use cors
app.use(cors()) //using cors with our server application 

//now to build socket.io and server together we need "http"
const http= require("http")
const {Server}=require("socket.io") //socket.io have Server class so we are importing it

//we are creating HTTP server object and listening on specific port
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        // origin : "http://localhost:3000", //from which url the socket communication will be done
        origin : "https://real-time-chating-app.netlify.app", //from which url the socket communication will be done
        methods : ["GET","POST"],//specifing which types of request server will receive from origin
    },
})//instantiating object of Server class so it require two parameter first is which HTTP server we want to connect with socket.io
//and second parameter is to handle issues related to cors 
 


//socket.io works based on events so to listen different types of event like "connection","disconnection" we can do like
io.on("connection",(socket)=>{//connection event means someone have opened the origin url 
    console.log("user connected with socket id as ",socket.id)


    //now user have been connnected to socket
    //now he/she may want to join the chat os let us call that event as "join_chat" so from frontend whenever the "join_chat" 
    //event will be emmited then below code will execute
    socket.on("join_chat",(userData)=>{
        socket.join(userData.roomId);//since we have only one chat room and whatever is setted from frontend on that basis we can directly join that one common chatroom
        console.log("User with name : ",userData.name,"and socket id as :",socket.id,"Joined the room : ",userData.roomId);
    })


    socket.on("send_chat",(chatData)=>{
        console.log(chatData);

        //now as user have sended the chat now we needs to emit an action receive chat because if we perform that then and only 
        //then users connected with given socket will receive the message so
        socket.to(chatData.roomId).emit("receive_chat",chatData)//and also we have one global room so whoever is there in that room with id as roomId will receive the message sended by user but if we do not to socket.to(chatData.roomId) then it will send the data to only that user who have sended the chat

    })



    //so as soon as user connect with given socket it may be possibe that it disconnect means leave the origin url so we in that event we need to perform like
    socket.on("disconnect",()=>{
        console.log("user has been disconnected from socket id as ",socket.id)
    })
})


const PORT=process.env.PORT || 3001

server.listen(PORT,()=>{//3001 with port on which our server is running
    console.log("server is running on port ",PORT)//this is callback function means whenever there is no issuse with our sever it will log "server is running" so that we being acknowledged about server is correctly running or not
})
