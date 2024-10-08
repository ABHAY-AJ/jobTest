const Chat = require('../models/Chat');

// Create a new message
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user._id; // assuming authentication middleware provides this
    const college = req.user.college;

    const newMessage = new Chat({
      sender: senderId,
      recipient: recipientId,
      message,
      college,
    });

    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch chat history between student and TPO
exports.getChatHistory = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const senderId = req.user._id;
    const college = req.user.college;

    const chats = await Chat.find({
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId }
      ],
      college,
    }).sort({ timestamps: 1 });

    res.status(200).json({ success: true, data: chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
