const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Sender's user ID
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient's user ID
  content: { type: String, required: true }, // Message content
  college: { type: String, required: true }, // College name to validate sender and recipient
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);