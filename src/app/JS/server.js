const express=require('express');
const http=require('http');
const cors=require('cors');
const socketIo=require('socket.io');

//inicializamos  express
const app=express();
app.use(cors());
const server=http.createServer(app);
const io=socketIo(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
});
const rooms={}

io.on('connection',(socket)=>{
    socket.on('join',(roomId)=>{
        socket.join(roomId);

        if(rooms[roomId]){
            rooms[roomId].push(socket.id);
        }else{
            rooms[roomId]=[socket.id];
        }
        const users=rooms[roomId]
        if(users.length>2){
            //si hay otro usuario, enviar ready para negociar la conexion
            io.to(users[0]).emit('ready');
            io.to(users[1]).emit('ready');
        }
        //Enviar la lista de usuarios a todos los sockets en la sala
        socket.on('offer',(data)=>{
            socket.to(roomId).emit('offer',data.offer)
        });

        //Enviar la respuesta a la oferta
        socket.on('answer',(data)=>{
            socket.to(roomId).emit('answer',data.answer)
        });

        //Enviar el candidato a los otros usuarios
        socket.on('candidate',(data)=>{
            socket.to(roomId).emit('candidate',data.candidate)
        });

        //Enviar el mensaje de chat a los otros usuarios
        socket.on('chat',(data)=>{
            socket.to(roomId).emit('chat',data.message)
        });

        //Cuando un usuario se desconecta, eliminarlo de la sala
        socket.on('disconnect',()=>{
            rooms[roomId]=rooms[roomId]?.filter(id=>id !==socket.id);
            if(rooms[roomId]?.length===0){
                delete rooms[roomId];
            }
        });
    });
});

server.listen(3002,()=>{
    console.log('✅ Servidor Socket.io escuchando en el puerto 3002...');
})


/*const io=require('socket.io')(3002,{
    cors:{origin:'*'}
});

io.on('connection',socket=>{
    socket.on('join',roomId=>socket.join(roomId));

    socket.on('ofter',data=>socket.to(data.roomId).emit('offer',data.offer));
    socket.on('answer',data=>socket.to(data.roomId).emit('answer',data.answer));
    socket.on('candidate',data=>socket.to(data.roomId).emit('candidate',data.candidate));
    socket.on('chat',data=>socket.to(data.roomId).emit('chat',data.message));
})
console.log('✅ Servidor Socket.io escuchando en el puerto 3002...');*/