class Room {
  // roomlimit
  // roomhost
  // roomname
  constructor(roomlimit, roomhost, roomname) {
    this.roomlimit = roomlimit;
    this.roomhost = roomhost;
    this.roomname = roomname;
    this.roomsize = 0;
  }

  isFull() {
    return this.roomsize >= this.roomlimit;
  }

  adduser() {
    this.roomsize++;
  }

  deleteuser() {
    this.roomsize--;
  }
}

/**
 * Key = code string
 * Value = pair of roomname and roomid
 */
const rooms = new Map();
rooms.set(0, new Room(1, 'dummyhost', 'dummyname'));

const codelen = 6;
const limit = 0.2; // if exceed the limit ratio of the rooms error

// reference vars
const codemax = 10 ** codelen;
const limitsize = Math.floor(codemax * limit);

/**
 * create room code and room id in the server
 * @param {*} roomname name of the room
 * @returns code and roomid if success, error if fail
 */
const createCode = (roomlimit, roomhost, roomname) => {
  if (rooms.size > limitsize) return { error: 'Too Much Room!' };

  // random number from 0 to 999999 (10^6 - 1)
  let code = Math.floor(Math.random() * codemax);
  let exist = rooms.has(code);

  // brute force check repetition
  while (exist) {
    code = Math.floor(Math.random() * codemax);
    exist = rooms.has(code);
  }

  const newRoom = new Room(roomlimit, roomhost, roomname);
  rooms.set(code, newRoom);
  const roomid = getid(code);

  return { code, roomid };
};

/**
 * Generate an unique id for the room from socket.io
 * @param {int} code input code, assume it is in the map
 * @returns the id string
 */
const getid = (code) => {
  return rooms.get(code).roomname + ' - ' + code;
};

/**
 * Get the room info for the code provided
 * @param {*} code input code
 * @returns roomname and roomid if success, error if fail
 */
const getRoom = (code) => {
  if (!rooms.has(code)) return { error: "Room Code don't exist" };

  const reqroom = rooms.get(code);

  if (reqroom.isFull()) return { error: 'Room is full' };

  reqroom.adduser();

  return { roomname: reqroom.roomname, roomid: getid(code) };
};

/**
 * Delete a room from existance
 * @param {*} io socket host io server
 * @param {*} code roomcode
 * @param {*} roomid roomid
 * @param {*} host hostid
 * @returns code and roomid
 */
const deleteRoom = (io, code, roomid, host) => {
  if (!rooms.has(code)) return { error: "Room Code don't exist" };

  if (!io) return { error: 'IO initiation failed' };

  if (!host || rooms.get(code).host != host) return { error: 'Wrong host' };

  io.socketsLeave(roomid);

  rooms.delete(code);

  return { code, roomid };
  // delete room
};

/**
 * Remove a user from the room
 * @param {*} code roomcode
 * @returns error if error, nothing if succeed
 */
const removeUser = (code) => {
  if (!rooms.has(code)) return { error: "Room Code don't exist" };

  rooms.get(code).deleteuser();
};

/**
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 *
 * @param {*} str string to be hashed
 * @param {*} seed seed
 * @returns hashed string
 */
const cyrb53 = function (str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

module.exports = { createCode, getRoom, deleteRoom, removeUser };
