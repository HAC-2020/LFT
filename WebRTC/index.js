const express = require("express");
const app = express()
const PORT = process.env.PORT || 3000;
let http = require('http').Server(app)


app.use(express.static(__dirname + '/public'))

let io = require("socket.io")(http)
io.on('connection',(socket)=>{

    socket.on('create or join',room=>{
        console.log("Room Started")

        const myRoom = io.sockets.adapter.rooms[room] || {length:0};
        const numClients = myRoom.length;
        console.log(room,' has ', numClients, ' clients');

        if(numClients == 0){
            socket.join(room)
            socket.emit('created',room);

        }else if(numClients == 1){
            socket.join(room);
            socket.emit('joined',room);

        }else{
            socket.emit('full',room=>{

            })
        }
    })


    socket.on('ready',room=>{
        socket.broadcast.to(room).emit('ready')
    })
    socket.on('candidate',event=>{
        console.log('can',event)
        socket.broadcast.to(event.room).emit('candidate',event)
    })
    socket.on('offer',event=>{
        
        console.log('off',event)
        socket.broadcast.to(event.room).emit('offer',event)
    })
    socket.on('OPD',event=>{
        
        console.log('off',event)
        socket.broadcast.to(event.room).emit('offer',event)
    })
    socket.on('answer',event=>{
        console.log('ans',event)
        socket.broadcast.to(event.room).emit('answer',event)
    })


    console.log("New Cliend added")
})





http.listen(PORT,()=>{
    console.log(`Server Started at PORT = ${PORT}`);
})