const colors = require("colors");
const { io } = require("../app");
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter(
    (user) => user.socketId !== socketId
  );
};

// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text }) => ({
  senderId,
  receiverId,
  text,
  seen: false,
});

io.on("connection", (socket) => {
  console.log(socket);
  console.log("someone connected!".rainbow);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  const messages = {}; // Object to track messages sent to each user
});
