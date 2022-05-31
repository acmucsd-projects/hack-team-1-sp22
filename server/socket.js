// temporary solution for pushing old messages to new users
const history = [];

const setup = (server) => {
  const { addUser, getUser, deleteUser, getUsers } = require('./users');
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
  });
  io.on('connection', (socket) => {
    socket.on('login', ({ name, room }, callback) => {
      const { user, error } = addUser(socket.id, name, room);
      if (error) return callback(error);
      socket.join(user.room);
      socket.in(room).emit('notification', {
        title: "Someone's here",
        description: `${user.name} just entered the room`,
      });
      io.in(room).emit('users', getUsers(room));
      io.to(socket.id).emit('message', history)
      callback();
    });

    socket.on('sendMessage', (message) => {
      console.log('Message sent: ', message);
      const user = getUser(socket.id);
      io.in(user.room).emit('message', { user: user.name, text: message });
      history.push({ user: user.name, text: message });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      const user = deleteUser(socket.id);
      if (user) {
        io.in(user.room).emit('notification', {
          title: 'Someone just left',
          description: `${user.name} just left the room`,
        });
        io.in(user.room).emit('users', getUsers(user.room));
      }
    });
  });

  return io;
};

module.exports = { setup };
