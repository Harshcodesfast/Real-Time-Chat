import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  roomId: string;
  id: string;
  username: string;
}

let allSokets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    if (parsedMessage.type === "join") {
      allSokets.push({
        socket,
        roomId: parsedMessage.payload.roomId,
        id: parsedMessage.payload.id,
        username: parsedMessage.payload.username,
      });
    }

    if (parsedMessage.type === "chat") {
      const currentUserRoom = allSokets.find(
        (x) => x.socket === socket
      )?.roomId;
      allSokets.forEach((x) => {
        if (x.roomId === currentUserRoom) {
          x.socket.send(
            JSON.stringify({
              message: parsedMessage.payload.message,
              id: parsedMessage.payload.id,
              username: parsedMessage.payload.username,
            })
          );
        }
      });
    }
  });

  socket.on("disconnect", () => {
    allSokets = allSokets.filter((x) => x.socket != socket);
  });
});
