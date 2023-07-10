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

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
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

  socket.on(
    "sendMessage",
    ({ senderId, receiverId, text }) => {
      const message = createMessage({
        senderId,
        receiverId,
        text,
      });

      const user = getUser(receiverId);

      // Store the messages in the `messages` object
      if (!messages[receiverId]) {
        messages[receiverId] = [message];
      } else {
        messages[receiverId].push(message);
      }

      // send the message to the receiver
      io.to(user?.socketId).emit("getMessage", message);
    }
  );

  socket.on(
    "messageSeen",
    ({ senderId, receiverId, messageId }) => {
      const user = getUser(senderId);

      // update the seen flag for the message
      if (messages[senderId]) {
        const message = messages[senderId].find(
          (message) =>
            message.receiverId === receiverId &&
            message.id === messageId
        );
        if (message) {
          message.seen = true;

          // send a message seen event to the sender
          io.to(user?.socketId).emit("messageSeen", {
            senderId,
            receiverId,
            messageId,
          });
        }
      }
    }
  );

  // update and get last message
  socket.on(
    "updateLastMessage",
    ({ lastMessage, lastMessagesId }) => {
      io.emit("getLastMessage", {
        lastMessage,
        lastMessagesId,
      });
    }
  );

  //when disconnect
  socket.on("disconnect", () => {
    console.log(`a user disconnected!`.red);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
