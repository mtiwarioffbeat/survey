// // socket-server.ts
// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();

// const io = new Server(httpServer, {
//   cors: {
//     origin: "*", // or your frontend URL
//     methods: ["GET", "POST"],
//   },
//   path: "/socket.io", // use default path
// });

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join_survey_room", (room) => {
//     socket.join(room);
//     console.log(`${socket.id} joined ${room}`);
//   });

//   socket.on("survey_update", ({ survey_room, updatedSurvey }) => {
//     console.log("Update:", updatedSurvey);
//     io.to(survey_room).emit("survey_update", updatedSurvey);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// httpServer.listen(4000, () => {
//   console.log("Socket.IO server running at http://localhost:4000");
// });

// server.ts
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join_survey_room", (room) => {
    socket.join(room);
    console.log(`📌 ${socket.id} joined ${room}`);
  });

  socket.on("survey_update", ({ survey_room, updatedSurvey }) => {
    console.log("🔄 Update from client:", updatedSurvey);
    io.to(survey_room).emit("survey_update", updatedSurvey);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

httpServer.listen(4000, () => {
  console.log("🚀 Socket.IO server running at http://localhost:4000");
});
