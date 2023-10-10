const express = require("express");
const app = express();

const PORT = 3001;

const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const users = [];
socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user connected  `);
  socket.on("message", (data) => {
    socketIO.emit("response", data);
  });
  socket.on("newUser", (newUser) => {
    users.push(newUser);
    socketIO.emit("responseNewUser", users);
  });
  socket.on("disconnect", () => {
    console.log(`${socket.id} user is disconnected `);
  });
});

app.get("api", (req, res) => {
  res.json("hi");
});

http.listen(PORT, () => {
  console.log({ message: "started ..." });
});
