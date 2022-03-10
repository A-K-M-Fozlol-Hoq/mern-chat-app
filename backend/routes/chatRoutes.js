const express = require('express');

const protect = require('../middleware/authMiddleware');
const router = express.router();

// router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route('/group').post(protect,createGroup);
// router.route('/rename').put(protect,renameGroup);
// router.route('/groupremove').put(protect,removeFromGroup);
// router.route('/addremove').put(protect,addToGroup);

module.exports = router;
