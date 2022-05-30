/**
 * Key = code string
 * Value = pair of roomname and roomid
 */
const rooms = new Map();
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
const createCode = (roomname) => {
  if (rooms.size > limitsize) return { error: 'Too Much Room!' };

  // random number from 0 to 999999 (10^6 - 1)
  let code = Math.floor(Math.random() * codemax);
  let exist = rooms.has(code);

  // brute force check repetition
  while (exist) {
    code = Math.floor(Math.random() * codemax);
    exist = rooms.has(code);
  }

  rooms.set(code, roomname);
  const roomid = getid(code);

  return { code, roomid };
};

/**
 * Generate an unique id for the room from socket.io
 * @param {*} code input code, assume it is in the map
 * @returns the id string
 */
const getid = (code) => {
  return rooms.get(code) + ' - ' + code;
};

/**
 * Get the room info for the code provided
 * @param {*} code input code
 * @returns roomname and roomid if success, error if fail
 */
const getRoom = (code) => {
  if (!rooms.has(code)) return { error: "Room Code don't exist" };
  return { roomname: rooms.get(code), roomid: getid(code) };
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

module.exports = { createCode, getRoom };
