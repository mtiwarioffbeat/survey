// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server";
// import { Server } from "socket.io";

// let io: Server | null = null;

// export async function GET(req: NextApiRequest) {
//   if (!io) {
//     // @ts-ignore
//     const server = (req as any).socket?.server;

//     if (server) {
//       io = new Server(server, {
//         path: "/api/socket",
//         cors: {
//           origin: "*",
//           methods: ["GET", "POST"],
//         },
//       });

//       io.on("connection", (socket) => {
//         console.log("User connected:", socket.id);

//         socket.on("join_survey_room", (survey_room) => {
//           socket.join(survey_room);
//           console.log(`User ${socket.id} joined room ${survey_room}`);
//         });

//         socket.on("survey_update", (data) => {
//           console.log("Survey updated:", data);
//           socket.to(data.survey_room).emit("survey_update", data.updatedSurvey);
          
//         });

//         socket.on("disconnect", () => {
//           console.log("User disconnected:", socket.id);
//         });
//       });

//     }
//   }

//   return NextResponse.json({ status: "Socket server running" });
// }

// server.js
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/api/socket",
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_survey_room", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });

  socket.on("survey_update", ({ survey_room, updatedSurvey }) => {
    io.to(survey_room).emit("survey_update", updatedSurvey);
  });
});

httpServer.listen(4000, () => {
  console.log(" Socket server running on http://localhost:4000");
});
