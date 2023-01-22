import net from "net";

const client = new net.Socket();

client.connect(3000, "localhost", () => {
   console.log("Connected with the server");
})

client.on("error", () => {
    console.error('Server error, connection closed');
});

client.on("data", data => {
    console.log(data.toString());
})

