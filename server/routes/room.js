const express = require('express');
const router = express.Router();

const { createCode, getRoom } = require('../rooms');

/* GET roomid and roomname from code */
router.get('/', function (req, res, next) {
  try {
    const { code } = req.body;
    const { roomname, roomid, error } = getRoom(code);

    // error handling
    if (error) return res.status(404).json({ error });

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

module.exports = router;
