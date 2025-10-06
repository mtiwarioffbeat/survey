import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
 if (!socket) {
    // socket = io("http://localhost:4000", {
    //   path: "/socket.io",
    //   transports: ["websocket"], 
    // });
    socket = io("https://cqgdsgvd-4000.inc1.devtunnels.ms", {
      path: "/socket.io",
      transports: ["websocket"], 
    });
    

    socket.on("connect", () => {
      console.log("Connected to socket:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket");
    });
  }

  return socket;
};
