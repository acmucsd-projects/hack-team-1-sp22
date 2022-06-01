const express = require('express');
const { route } = require('express/lib/router');
const router = express.Router();

const { createCode, getRoom, deleteRoom, removeUser } = require('../rooms');

/* POST code and get roomid and roomname */
router.post('/', function (req, res, next) {
  try {
    const { code } = req.body;
    const { roomname, roomid, error } = getRoom(code);

    // error handling
    if (error) {
      console.log(error);
      return res.status(404).json({ error });
    }

    res.status(200).json({ roomname, roomid });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT newroom */
router.put('/', function (req, res, next) {
  try {
    const { roomlimit, roomhost, roomname } = req.body;
    const { code, roomid, error } = createCode(roomlimit, roomhost, roomname);
    console.log(roomname, roomlimit, roomhost);
    // error handling
    if (error) return res.status(501).json({ error });

    res.status(200).json({ code, roomid });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* POST userleave */
router.post('/', function (req, res, next) {
  try {
    const { code } = req.body;
    const { error } = removeUser(code);

    // error handling
    if (error) return res.status(501).json({ error });

    console.log("post success")
    res.status(200).json({ code });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT newroom */
router.put('/delete', function (req, res, next) {
  try {
    const { code, roomid, roomhost } = req.body;

    console.log(code, roomid, roomhost);
    const { error } = deleteRoom(router.io, code, roomid, roomhost);

    // error handling
    if (error) return res.status(501).json({ error });

    res.status(200).json({ code, roomid });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
