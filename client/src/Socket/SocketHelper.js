import { io } from 'socket.io-client';

let socket;
export const initiateSocketConnection = (token) => {
  socket = io("http://localhost:5000", {
		auth: {
			token
		},
    transports: [ "websocket" ]
	});
	console.log(`Connecting socket...`);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
	socket.emit('my message', 'Hello there from React.');
  if (!socket) return(true);
  socket.on('my broadcast', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

// Handle message receive event
export const subscribeToMessages = (cb) => {
  if (!socket) return(true);
  socket.on('message', msg => {
    console.log('Room event received!');
    return cb(null, msg);
  });
}

export const joinRoom = (roomName) => {
	socket.emit('join', roomName);
}

export const sendQuestion = ({message, roomName}, cb) => {
  if (socket) socket.emit('question', { message, roomName }, cb);
}