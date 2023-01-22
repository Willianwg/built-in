import net from "net";

const server = net.createServer(socket => {

    console.log('client connected');
    
    socket.on("data", data =>{
        console.log(data.toString());

        socket.write("SERVER RESPONDING");
    })
   
})

server.listen(3000);