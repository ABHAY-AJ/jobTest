const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tpoJob',
    default: null,
  },
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'tpoInternship', default: null },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'tpoEvent', default: null },
  hrEmail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  tpoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // TPO who invited the HR
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Invitation', invitationSchema);