const asyncHandler = require('express-async-handler');
import Chat from '../Models/chatModel';
import User from '../Models/userModel';
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log('userid param not sent with request');
    return res.sentStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $eleMatch: { $eq: req.user._id } } },
      { users: { $eleMatch: { $eq: req.userId } } },
    ],
  })
    .populate('Users', '-password')
    .populate('latestMessage');

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'Users',
        '-password'
      );
      res.status(200).send(fullChat);
    } catch (e) {
      res.status(400);
      throw new Error(e.message);
    }
  }
});

module.exports = { accessChat };
