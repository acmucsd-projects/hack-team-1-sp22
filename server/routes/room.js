const express = require('express');
const router = express.Router();

const { createCode, getRoom, deleteRoom } = require('../rooms');

/* POST code and get roomid and roomname */
router.post('/', function (req, res, next) {
  try {
    const { code } = req.body;
    const { roomname, roomid, error } = getRoom(code);

    // error handling
    if (error) {
      console.log(error);
      return res.status(404).json({ error })
    };

    res.status(200).json({ roomname, roomid });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT newroom */
router.put('/', function (req, res, next) {

  try {
    const { roomname } = req.body;
    const { code, roomid, error } = createCode(roomname);

    // error handling
    if (error) return res.status(501).json({ error });

    res.status(200).json({ code, roomid });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT newroom */
router.delete('/', function (req, res, next) {
  try {
    const { code, roomid } = req.body;
    const { error } = deleteRoom(router.io, code, roomid);

    // error handling
    if (error) return res.status(501).json({ error });

    res.status(200).json({ code, roomid });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
