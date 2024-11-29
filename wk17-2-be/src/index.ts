import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  roomId: string;
}

let usercount = 0;
let allSokets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "join")
      allSokets.push({ socket, roomId: parsedMessage.payload.roomId });

    if (parsedMessage.type === "chat") {
      const currentUserRoom = allSokets.find(
        (x) => x.socket === socket
      )?.roomId;
      allSokets.forEach((x) => {
        if (x.roomId === currentUserRoom)
          x.socket.send(parsedMessage.payload.message);
      });
    }
  });

  socket.on("disconnect", () => {
    allSokets = allSokets.filter((x) => x.socket != socket);
  });
});
